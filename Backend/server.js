const express = require("express");
const cors = require("cors");
const path = require("path");
require('dotenv').config();

const {
  locationsRef,
  beneficiariesRef,
  grainsRef,
  transactionsRef
} = require("./firebase");

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
    const locations = await locationsRef.get();
    const beneficiaries = await beneficiariesRef.get();
    const grains = await grainsRef.get();
    const transactions = await transactionsRef
      .orderBy("timestamp", "desc")
      .get();

    res.json({
      locations: locations.docs.map(d => ({ id: d.id, ...d.data() })),
      beneficiaries: beneficiaries.docs.map(d => ({ id: d.id, ...d.data() })),
      grains: grains.docs.map(d => {
        const data = d.data();
        return data.name || d.id;
      }),
      transactions: transactions.docs.map(d => d.data())
    });
  } catch (error) {
    console.error('Error fetching data from Firebase:', error.message);
    res.status(500).json({ 
      error: true, 
      message: 'Failed to fetch data from Firebase',
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

  const ref = locationsRef.doc(godownId);
  const doc = await ref.get();
  if (!doc.exists) {
    return res.status(404).json({ message: "Godown not found", error: true });
  }
  let data = doc.data();

  data.stock[grain] = (data.stock[grain] || 0) + quantity;
  await ref.update({ stock: data.stock });

  // Record on blockchain
  const blockchainHash = await blockchain.recordTransaction(
    "Govt Procurement",
    data.name,
    grain,
    quantity,
    "transfer"
  );

  await transactionsRef.add({
    hash: blockchainHash || "0x" + Date.now(),
    timestamp: new Date().toLocaleString(),
    from: "Govt Procurement",
    to: data.name,
    items: { [grain]: quantity },
    type: "transfer"
  });

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

  const fromRef = locationsRef.doc(fromId);
  const toRef = locationsRef.doc(toId);

  const fromDoc = await fromRef.get();
  const toDoc = await toRef.get();
  
  if (!fromDoc.exists || !toDoc.exists) {
    return res.status(404).json({ message: "Source or destination not found", error: true });
  }

  const from = fromDoc.data();
  const to = toDoc.data();

  if ((from.stock[grain] || 0) < quantity)
    return res.status(400).json({ message: "Not enough stock", error: true });

  from.stock[grain] -= quantity;
  to.stock[grain] = (to.stock[grain] || 0) + quantity;

  await fromRef.update({ stock: from.stock });
  await toRef.update({ stock: to.stock });

  // Record on blockchain
  const blockchainHash = await blockchain.recordTransaction(
    from.name,
    to.name,
    grain,
    quantity,
    "transfer"
  );

  await transactionsRef.add({
    hash: blockchainHash || "0x" + Date.now(),
    timestamp: new Date().toLocaleString(),
    from: from.name,
    to: to.name,
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

  const existingBen = await beneficiariesRef.doc(rationCardId).get();
  if (existingBen.exists) {
    return res.status(400).json({ message: "Ration Card ID already exists", error: true });
  }

  await beneficiariesRef.doc(rationCardId).set({
    name,
    rationCardId,
    fpsId,
    entitlement: { Wheat: 15, Rice: 10, Sugar: 2 }
  });

  await transactionsRef.add({
    hash: "0x" + Date.now(),
    timestamp: new Date().toLocaleString(),
    from: "System Admin",
    to: "Create Beneficiary",
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

  const fpsRef = locationsRef.doc(fpsId);
  const benRef = beneficiariesRef.doc(beneficiaryId);

  const fpsDoc = await fpsRef.get();
  const benDoc = await benRef.get();
  
  if (!fpsDoc.exists || !benDoc.exists) {
    return res.status(404).json({ message: "FPS or beneficiary not found", error: true });
  }

  const fps = fpsDoc.data();
  const ben = benDoc.data();

  if ((fps.stock[grain] || 0) < quantity)
    return res.status(400).json({ message: "Not enough stock", error: true });

  fps.stock[grain] -= quantity;
  await fpsRef.update({ stock: fps.stock });

  // Record on blockchain
  const blockchainHash = await blockchain.recordTransaction(
    fps.name,
    `Beneficiary: ${ben.name}`,
    grain,
    quantity,
    "transfer"
  );

  await transactionsRef.add({
    hash: blockchainHash || "0x" + Date.now(),
    timestamp: new Date().toLocaleString(),
    from: fps.name,
    to: `Beneficiary: ${ben.name}`,
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
  const existingGrain = await grainsRef.doc(grainKey).get();
  if (existingGrain.exists) {
    return res.status(400).json({ message: "Grain already exists", error: true });
  }
  
  const newGrain = {
    name: grainName,
    createdAt: new Date().toLocaleString()
  };
  
  await grainsRef.doc(grainKey).set(newGrain);
  
  await transactionsRef.add({
    hash: "0x" + Date.now(),
    timestamp: new Date().toLocaleString(),
    from: "System Admin",
    to: "Add Grain Type",
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
  const grain = await grainsRef.doc(grainKey).get();
  if (!grain.exists) {
    return res.status(404).json({ message: "Grain not found", error: true });
  }
  
  await grainsRef.doc(grainKey).delete();
  
  await transactionsRef.add({
    hash: "0x" + Date.now(),
    timestamp: new Date().toLocaleString(),
    from: "System Admin",
    to: "Remove Grain Type",
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
  
  const existingLoc = await locationsRef.doc(locId).get();
  if (existingLoc.exists) {
    return res.status(400).json({ message: "Location ID already exists", error: true });
  }
  
  // Initialize demand with all grains for FPS locations
  let demandStructure = demand || {};
  if (type && type.toLowerCase() === 'fps') {
    const grainsSnapshot = await grainsRef.get();
    demandStructure = {};
    grainsSnapshot.docs.forEach(doc => {
      const grainName = doc.data().name || doc.id;
      demandStructure[grainName] = {
        stock: 0,
        demand: 0
      };
    });
  }
  
  const locationData = {
    id: locId,
    name,
    type,
    state: state || "",
    city: city || "",
    stock: {},
    demand: demandStructure,
    createdAt: new Date().toLocaleString()
  };
  
  await locationsRef.doc(locId).set(locationData);
  
  await transactionsRef.add({
    hash: "0x" + Date.now(),
    timestamp: new Date().toLocaleString(),
    from: "System Admin",
    to: "Create Location",
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
  
  const locRef = locationsRef.doc(locId);
  const locData = await locRef.get();
  
  if (!locData.exists) {
    return res.status(404).json({ message: "Location not found", error: true });
  }
  
  const locName = locData.data().name;
  await locRef.delete();
  
  await transactionsRef.add({
    hash: "0x" + Date.now(),
    timestamp: new Date().toLocaleString(),
    from: "System Admin",
    to: "Delete Location",
    items: locName,
    type: "admin"
  });
  
  res.json({ message: "Location deleted successfully" });
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
