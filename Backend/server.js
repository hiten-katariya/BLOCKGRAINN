const express = require("express");
const cors = require("cors");
const path = require("path");
require('dotenv').config();

const { supabase } = require("./supabase");
const blockchain = require("./blockchain");

const app = express();

/* ============ MIDDLEWARE ============ */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ============ EJS SETUP ============ */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* ============ STATIC FILES ============ */
app.use(express.static(path.join(__dirname, "public")));

/* ============ FRONTEND ROUTES ============ */
app.get("/test", (req, res) => {
  res.render("test"); // views/test.ejs
});

app.get("/init", (req, res) => {
  res.render("init"); // views/init.ejs - Database initialization page
});

app.get("/login", (req, res) => {
  res.render("login"); // views/login.ejs
});

app.get("/", (req, res) => {
  res.render("index"); // views/index.ejs
});

/* ============ API ROUTES ============ */

/* HEALTH CHECK */
app.get("/api/health", (req, res) => {
  res.json({ status: "API Running" });
});

/* GET ALL DATA */
app.get("/api/db", async (req, res) => {
  try {
    const { data: locations, error: locErr } = await supabase
      .from('locations')
      .select('*');
    if (locErr) throw locErr;

    const { data: beneficiaries, error: benErr } = await supabase
      .from('beneficiaries')
      .select('*');
    if (benErr) throw benErr;

    const { data: grains, error: grainErr } = await supabase
      .from('grains')
      .select('*');
    if (grainErr) throw grainErr;

    const { data: transactions, error: txErr } = await supabase
      .from('transactions')
      .select('*')
      .order('timestamp', { ascending: false });
    if (txErr) throw txErr;

    res.json({
      locations: locations.map(d => ({ id: d.id, ...d })),
      beneficiaries: beneficiaries.map(d => ({ id: d.id, ...d })),
      grains: grains.map(d => d.name || d.id),
      transactions: transactions
    });
  } catch (error) {
    console.error('Error fetching data from Supabase:', error.message);
    res.status(500).json({ 
      error: true, 
      message: 'Failed to fetch data from database',
      details: error.message 
    });
  }
});

/* ADD STOCK */
app.post("/api/add-stock", async (req, res) => {
  const { godownId, grain, quantity } = req.body;

  if (!godownId || !grain || !quantity) {
    return res.status(400).json({ message: "Missing required fields", error: true });
  }
  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ message: "Invalid quantity", error: true });
  }

  const { data: doc, error: fetchErr } = await supabase
    .from('locations')
    .select('*')
    .eq('id', godownId)
    .single();

  if (fetchErr || !doc) {
    return res.status(404).json({ message: "Godown not found", error: true });
  }

  const stock = doc.stock || {};
  stock[grain] = (stock[grain] || 0) + quantity;

  const { error: updateErr } = await supabase
    .from('locations')
    .update({ stock })
    .eq('id', godownId);

  if (updateErr) {
    return res.status(500).json({ message: "Failed to update stock", error: true });
  }

  // Record on blockchain
  const blockchainHash = await blockchain.recordTransaction(
    "Govt Procurement",
    doc.name,
    grain,
    quantity,
    "transfer"
  );

  const { error: txErr } = await supabase
    .from('transactions')
    .insert({
      hash: blockchainHash || "0x" + Date.now(),
      timestamp: new Date().toLocaleString(),
      from_entity: "Govt Procurement",
      to_entity: doc.name,
      items: { [grain]: quantity },
      type: "transfer"
    });

  if (txErr) console.error("Error recording transaction:", txErr.message);

  res.json({ 
    message: "Stock added successfully",
    blockchainHash: blockchainHash
  });
  console.log("Stock added successfully" + (blockchainHash ? " (Blockchain: " + blockchainHash + ")" : ""));
});

/* DISPATCH */
app.post("/api/dispatch", async (req, res) => {
  const { fromId, toId, grain, quantity } = req.body;

  if (!fromId || !toId || !grain || !quantity) {
    return res.status(400).json({ message: "Missing required fields", error: true });
  }
  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ message: "Invalid quantity", error: true });
  }

  const { data: fromDoc, error: fromErr } = await supabase
    .from('locations')
    .select('*')
    .eq('id', fromId)
    .single();

  const { data: toDoc, error: toErr } = await supabase
    .from('locations')
    .select('*')
    .eq('id', toId)
    .single();
  
  if (fromErr || !fromDoc || toErr || !toDoc) {
    return res.status(404).json({ message: "Source or destination not found", error: true });
  }

  const fromStock = fromDoc.stock || {};
  const toStock = toDoc.stock || {};

  if ((fromStock[grain] || 0) < quantity)
    return res.status(400).json({ message: "Not enough stock", error: true });

  fromStock[grain] -= quantity;
  toStock[grain] = (toStock[grain] || 0) + quantity;

  const { error: updateFromErr } = await supabase
    .from('locations')
    .update({ stock: fromStock })
    .eq('id', fromId);

  const { error: updateToErr } = await supabase
    .from('locations')
    .update({ stock: toStock })
    .eq('id', toId);

  if (updateFromErr || updateToErr) {
    return res.status(500).json({ message: "Failed to update stock", error: true });
  }

  // Record on blockchain
  const blockchainHash = await blockchain.recordTransaction(
    fromDoc.name,
    toDoc.name,
    grain,
    quantity,
    "transfer"
  );

  await supabase
    .from('transactions')
    .insert({
      hash: blockchainHash || "0x" + Date.now(),
      timestamp: new Date().toLocaleString(),
      from_entity: fromDoc.name,
      to_entity: toDoc.name,
      items: { [grain]: quantity },
      type: "transfer"
    });

  res.json({ 
    message: "Consignment dispatched",
    blockchainHash: blockchainHash
  });
});

/* ADD BENEFICIARY */
app.post("/api/add-beneficiary", async (req, res) => {
  const { name, rationCardId, fpsId } = req.body;

  if (!name || !rationCardId || !fpsId) {
    return res.status(400).json({ message: "Missing required fields", error: true });
  }
  if (name.trim().length === 0 || rationCardId.trim().length === 0) {
    return res.status(400).json({ message: "Name and Ration Card ID cannot be empty", error: true });
  }

  const { data: existing } = await supabase
    .from('beneficiaries')
    .select('id')
    .eq('id', rationCardId)
    .single();

  if (existing) {
    return res.status(400).json({ message: "Ration Card ID already exists", error: true });
  }

  const { error: insertErr } = await supabase
    .from('beneficiaries')
    .insert({
      id: rationCardId,
      name,
      ration_card_id: rationCardId,
      fps_id: fpsId,
      entitlement: { Wheat: 15, Rice: 10, Sugar: 2 }
    });

  if (insertErr) {
    return res.status(500).json({ message: "Failed to add beneficiary", error: true });
  }

  await supabase
    .from('transactions')
    .insert({
      hash: "0x" + Date.now(),
      timestamp: new Date().toLocaleString(),
      from_entity: "System Admin",
      to_entity: "Create Beneficiary",
      items: `${name} (${rationCardId})`,
      type: "admin"
    });

  res.json({ message: "Beneficiary registered" });
});

/* DISTRIBUTE */
app.post("/api/distribute", async (req, res) => {
  const { fpsId, beneficiaryId, grain, quantity } = req.body;

  if (!fpsId || !beneficiaryId || !grain || !quantity) {
    return res.status(400).json({ message: "Missing required fields", error: true });
  }
  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ message: "Invalid quantity", error: true });
  }

  const { data: fpsDoc, error: fpsErr } = await supabase
    .from('locations')
    .select('*')
    .eq('id', fpsId)
    .single();

  const { data: benDoc, error: benErr } = await supabase
    .from('beneficiaries')
    .select('*')
    .eq('id', beneficiaryId)
    .single();
  
  if (fpsErr || !fpsDoc || benErr || !benDoc) {
    return res.status(404).json({ message: "FPS or beneficiary not found", error: true });
  }

  const fpsStock = fpsDoc.stock || {};

  if ((fpsStock[grain] || 0) < quantity)
    return res.status(400).json({ message: "Not enough stock", error: true });

  fpsStock[grain] -= quantity;

  const { error: updateErr } = await supabase
    .from('locations')
    .update({ stock: fpsStock })
    .eq('id', fpsId);

  if (updateErr) {
    return res.status(500).json({ message: "Failed to update stock", error: true });
  }

  // Record on blockchain
  const blockchainHash = await blockchain.recordTransaction(
    fpsDoc.name,
    `Beneficiary: ${benDoc.name}`,
    grain,
    quantity,
    "transfer"
  );

  await supabase
    .from('transactions')
    .insert({
      hash: blockchainHash || "0x" + Date.now(),
      timestamp: new Date().toLocaleString(),
      from_entity: fpsDoc.name,
      to_entity: `Beneficiary: ${benDoc.name}`,
      items: { [grain]: quantity },
      type: "transfer"
    });

  res.json({ 
    message: "Ration distributed",
    blockchainHash: blockchainHash
  });
});

/* ADD GRAIN */
app.post("/api/add-grain", async (req, res) => {
  const { grainName } = req.body;
  
  if (!grainName) {
    return res.status(400).json({ message: "Grain name required", error: true });
  }
  if (grainName.trim().length === 0) {
    return res.status(400).json({ message: "Grain name cannot be empty", error: true });
  }
  
  const grainKey = grainName.toLowerCase();

  const { data: existing } = await supabase
    .from('grains')
    .select('id')
    .eq('id', grainKey)
    .single();

  if (existing) {
    return res.status(400).json({ message: "Grain already exists", error: true });
  }
  
  const { error: insertErr } = await supabase
    .from('grains')
    .insert({
      id: grainKey,
      name: grainName,
      created_at: new Date().toISOString()
    });

  if (insertErr) {
    return res.status(500).json({ message: "Failed to add grain", error: true });
  }
  
  await supabase
    .from('transactions')
    .insert({
      hash: "0x" + Date.now(),
      timestamp: new Date().toLocaleString(),
      from_entity: "System Admin",
      to_entity: "Add Grain Type",
      items: grainName,
      type: "admin"
    });
  
  res.json({ message: "Grain added successfully" });
});

/* REMOVE GRAIN */
app.post("/api/remove-grain", async (req, res) => {
  const { grainName } = req.body;
  
  if (!grainName) {
    return res.status(400).json({ message: "Grain name required", error: true });
  }
  if (grainName.trim().length === 0) {
    return res.status(400).json({ message: "Grain name cannot be empty", error: true });
  }
  
  const grainKey = grainName.toLowerCase();

  const { data: existing } = await supabase
    .from('grains')
    .select('id')
    .eq('id', grainKey)
    .single();

  if (!existing) {
    return res.status(404).json({ message: "Grain not found", error: true });
  }
  
  const { error: deleteErr } = await supabase
    .from('grains')
    .delete()
    .eq('id', grainKey);

  if (deleteErr) {
    return res.status(500).json({ message: "Failed to remove grain", error: true });
  }
  
  await supabase
    .from('transactions')
    .insert({
      hash: "0x" + Date.now(),
      timestamp: new Date().toLocaleString(),
      from_entity: "System Admin",
      to_entity: "Remove Grain Type",
      items: grainName,
      type: "admin"
    });
  
  res.json({ message: "Grain removed successfully" });
});

/* ADD LOCATION (Godown, Warehouse, Hub, FPS) */
app.post("/api/add-location", async (req, res) => {
  const { locId, name, type, state, city, demand } = req.body;
  
  if (!locId || !name || !type) {
    return res.status(400).json({ message: "Missing required fields", error: true });
  }
  if (locId.trim().length === 0 || name.trim().length === 0 || type.trim().length === 0) {
    return res.status(400).json({ message: "Location ID, name, and type cannot be empty", error: true });
  }
  
  const { data: existing } = await supabase
    .from('locations')
    .select('id')
    .eq('id', locId)
    .single();

  if (existing) {
    return res.status(400).json({ message: "Location ID already exists", error: true });
  }
  
  // Initialize demand with all grains for FPS locations
  let demandStructure = demand || {};
  if (type && type.toLowerCase() === 'fps') {
    const { data: grainsList } = await supabase
      .from('grains')
      .select('*');
    
    demandStructure = {};
    if (grainsList) {
      grainsList.forEach(g => {
        const grainName = g.name || g.id;
        demandStructure[grainName] = {
          stock: 0,
          demand: 0
        };
      });
    }
  }
  
  const locationData = {
    id: locId,
    name,
    type,
    state: state || "",
    city: city || "",
    stock: {},
    demand: demandStructure,
    created_at: new Date().toISOString()
  };
  
  const { error: insertErr } = await supabase
    .from('locations')
    .insert(locationData);

  if (insertErr) {
    return res.status(500).json({ message: "Failed to create location", error: true });
  }
  
  await supabase
    .from('transactions')
    .insert({
      hash: "0x" + Date.now(),
      timestamp: new Date().toLocaleString(),
      from_entity: "System Admin",
      to_entity: "Create Location",
      items: `${name} [${type}]`,
      type: "admin"
    });
  
  res.json({ message: "Location created successfully" });
});

/* DELETE LOCATION */
app.post("/api/delete-location", async (req, res) => {
  const { locId } = req.body;
  
  if (!locId) {
    return res.status(400).json({ message: "Location ID required", error: true });
  }
  if (locId.trim().length === 0) {
    return res.status(400).json({ message: "Location ID cannot be empty", error: true });
  }
  
  const { data: locData, error: fetchErr } = await supabase
    .from('locations')
    .select('*')
    .eq('id', locId)
    .single();
  
  if (fetchErr || !locData) {
    return res.status(404).json({ message: "Location not found", error: true });
  }
  
  const locName = locData.name;

  const { error: deleteErr } = await supabase
    .from('locations')
    .delete()
    .eq('id', locId);

  if (deleteErr) {
    return res.status(500).json({ message: "Failed to delete location", error: true });
  }
  
  await supabase
    .from('transactions')
    .insert({
      hash: "0x" + Date.now(),
      timestamp: new Date().toLocaleString(),
      from_entity: "System Admin",
      to_entity: "Delete Location",
      items: locName,
      type: "admin"
    });
  
  res.json({ message: "Location deleted successfully" });
});

/* INITIALIZE DATABASE - For Render.com deployment */
app.post("/api/init-database", async (req, res) => {
  try {
    console.log("🔄 Starting database initialization...");
    
    // Run the initialization script
    const { exec } = require('child_process');
    exec('node initData.js', { cwd: __dirname }, (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Init error:", error);
        return res.status(500).json({ success: false, error: error.message });
      }
      console.log(stdout);
      res.json({ 
        success: true, 
        message: "Database initialized successfully",
        output: stdout
      });
    });
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/* ============ START SERVER ============ */
async function startServer() {
  // Initialize blockchain connection
  await blockchain.initialize();
  
  const PORT = process.env.PORT || 3000;
  const HOST = process.env.HOST || '0.0.0.0'; // Listen on all network interfaces
  
  app.listen(PORT, HOST, () => {
    const os = require('os');
    const networkInterfaces = os.networkInterfaces();
    
    console.log("🚀 Server running on:");
    console.log(`   Local:   http://localhost:${PORT}`);
    
    // Display all network IP addresses
    Object.keys(networkInterfaces).forEach((interfaceName) => {
      networkInterfaces[interfaceName].forEach((iface) => {
        if (iface.family === 'IPv4' && !iface.internal) {
          console.log(`   Network: http://${iface.address}:${PORT}`);
        }
      });
    });
    
    console.log("🔗 Blockchain status:", blockchain.isConnected() ? "✅ Connected" : "⚠️ Disabled");
    console.log("🌍 Environment:", process.env.NODE_ENV || "development");
  });
}

startServer();
