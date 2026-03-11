const { supabase } = require("./supabase");

async function init(){

/* ================= CENTRAL GODOWNS (Major Storage Centers) ================= */

// Punjab - Major wheat producing state
await supabase.from('locations').upsert({
  id: "fci-punjab-ludhiana",
  name: "FCI Central Godown - Ludhiana",
  type: "godown",
  state: "Punjab",
  city: "",
  stock: { Wheat: 50000, Rice: 30000, Sugar: 10000 },
  demand: {}
});

// Haryana - Major grain storage
await supabase.from('locations').upsert({
  id: "fci-haryana-karnal",
  name: "FCI Central Godown - Karnal",
  type: "godown",
  state: "Haryana",
  city: "",
  stock: { Wheat: 45000, Rice: 25000, Sugar: 8000 },
  demand: {}
});

// West Bengal - Major rice producing state
await supabase.from('locations').upsert({
  id: "fci-westbengal-kolkata",
  name: "FCI Central Godown - Kolkata",
  type: "godown",
  state: "West Bengal",
  city: "",
  stock: { Wheat: 20000, Rice: 60000, Sugar: 12000 },
  demand: {}
});

// Uttar Pradesh - Largest population
await supabase.from('locations').upsert({
  id: "fci-uttarpradesh-kanpur",
  name: "FCI Central Godown - Kanpur",
  type: "godown",
  state: "Uttar Pradesh",
  city: "",
  stock: { Wheat: 55000, Rice: 40000, Sugar: 15000 },
  demand: {}
});

/* ================= STATE WAREHOUSES ================= */

// Punjab
await supabase.from('locations').upsert({
  id: "warehouse-punjab",
  name: "Punjab State Warehouse",
  type: "warehouse",
  state: "Punjab",
  city: "",
  stock: {},
  demand: {}
});

// Haryana
await supabase.from('locations').upsert({
  id: "warehouse-haryana",
  name: "Haryana State Warehouse",
  type: "warehouse",
  state: "Haryana",
  city: "",
  stock: {},
  demand: {}
});

// Delhi
await supabase.from('locations').upsert({
  id: "warehouse-delhi",
  name: "Delhi State Warehouse",
  type: "warehouse",
  state: "Delhi",
  city: "",
  stock: {},
  demand: {}
});

// Uttar Pradesh
await supabase.from('locations').upsert({
  id: "warehouse-uttarpradesh",
  name: "Uttar Pradesh State Warehouse",
  type: "warehouse",
  state: "Uttar Pradesh",
  city: "",
  stock: {},
  demand: {}
});

// Rajasthan
await supabase.from('locations').upsert({
  id: "warehouse-rajasthan",
  name: "Rajasthan State Warehouse",
  type: "warehouse",
  state: "Rajasthan",
  city: "",
  stock: {},
  demand: {}
});

// Maharashtra
await supabase.from('locations').upsert({
  id: "warehouse-maharashtra",
  name: "Maharashtra State Warehouse",
  type: "warehouse",
  state: "Maharashtra",
  city: "",
  stock: {},
  demand: {}
});

// West Bengal
await supabase.from('locations').upsert({
  id: "warehouse-westbengal",
  name: "West Bengal State Warehouse",
  type: "warehouse",
  state: "West Bengal",
  city: "",
  stock: {},
  demand: {}
});

// Gujarat
await supabase.from('locations').upsert({
  id: "warehouse-gujarat",
  name: "Gujarat State Warehouse",
  type: "warehouse",
  state: "Gujarat",
  city: "",
  stock: {},
  demand: {}
});

/* ================= CITY HUBS ================= */

// Punjab Cities
await supabase.from('locations').upsert({
  id: "hub-punjab-amritsar",
  name: "Amritsar City Hub",
  type: "city-hub",
  state: "Punjab",
  city: "Amritsar",
  stock: {},
  demand: {}
});

await supabase.from('locations').upsert({
  id: "hub-punjab-ludhiana",
  name: "Ludhiana City Hub",
  type: "city-hub",
  state: "Punjab",
  city: "Ludhiana",
  stock: {},
  demand: {}
});

// Haryana Cities
await supabase.from('locations').upsert({
  id: "hub-haryana-gurugram",
  name: "Gurugram City Hub",
  type: "city-hub",
  state: "Haryana",
  city: "Gurugram",
  stock: {},
  demand: {}
});

await supabase.from('locations').upsert({
  id: "hub-haryana-faridabad",
  name: "Faridabad City Hub",
  type: "city-hub",
  state: "Haryana",
  city: "Faridabad",
  stock: {},
  demand: {}
});

// Delhi
await supabase.from('locations').upsert({
  id: "hub-delhi-central",
  name: "Central Delhi Hub",
  type: "city-hub",
  state: "Delhi",
  city: "Delhi",
  stock: {},
  demand: {}
});

await supabase.from('locations').upsert({
  id: "hub-delhi-south",
  name: "South Delhi Hub",
  type: "city-hub",
  state: "Delhi",
  city: "Delhi",
  stock: {},
  demand: {}
});

// Uttar Pradesh Cities
await supabase.from('locations').upsert({
  id: "hub-up-lucknow",
  name: "Lucknow City Hub",
  type: "city-hub",
  state: "Uttar Pradesh",
  city: "Lucknow",
  stock: {},
  demand: {}
});

await supabase.from('locations').upsert({
  id: "hub-up-kanpur",
  name: "Kanpur City Hub",
  type: "city-hub",
  state: "Uttar Pradesh",
  city: "Kanpur",
  stock: {},
  demand: {}
});

await supabase.from('locations').upsert({
  id: "hub-up-agra",
  name: "Agra City Hub",
  type: "city-hub",
  state: "Uttar Pradesh",
  city: "Agra",
  stock: {},
  demand: {}
});

// Rajasthan Cities
await supabase.from('locations').upsert({
  id: "hub-rajasthan-jaipur",
  name: "Jaipur City Hub",
  type: "city-hub",
  state: "Rajasthan",
  city: "Jaipur",
  stock: {},
  demand: {}
});

await supabase.from('locations').upsert({
  id: "hub-rajasthan-jodhpur",
  name: "Jodhpur City Hub",
  type: "city-hub",
  state: "Rajasthan",
  city: "Jodhpur",
  stock: {},
  demand: {}
});

// Maharashtra Cities
await supabase.from('locations').upsert({
  id: "hub-maharashtra-mumbai",
  name: "Mumbai City Hub",
  type: "city-hub",
  state: "Maharashtra",
  city: "Mumbai",
  stock: {},
  demand: {}
});

await supabase.from('locations').upsert({
  id: "hub-maharashtra-pune",
  name: "Pune City Hub",
  type: "city-hub",
  state: "Maharashtra",
  city: "Pune",
  stock: {},
  demand: {}
});

// West Bengal Cities
await supabase.from('locations').upsert({
  id: "hub-wb-kolkata",
  name: "Kolkata City Hub",
  type: "city-hub",
  state: "West Bengal",
  city: "Kolkata",
  stock: {},
  demand: {}
});

await supabase.from('locations').upsert({
  id: "hub-wb-howrah",
  name: "Howrah City Hub",
  type: "city-hub",
  state: "West Bengal",
  city: "Howrah",
  stock: {},
  demand: {}
});

// Gujarat Cities
await supabase.from('locations').upsert({
  id: "hub-gujarat-ahmedabad",
  name: "Ahmedabad City Hub",
  type: "city-hub",
  state: "Gujarat",
  city: "Ahmedabad",
  stock: {},
  demand: {}
});

await supabase.from('locations').upsert({
  id: "hub-gujarat-surat",
  name: "Surat City Hub",
  type: "city-hub",
  state: "Gujarat",
  city: "Surat",
  stock: {},
  demand: {}
});

/* ================= FAIR PRICE SHOPS (FPS) ================= */

// Punjab FPS
await supabase.from('locations').upsert({
  id: "fps-punjab-amritsar-golden",
  name: "Golden Temple Area FPS",
  type: "fps",
  state: "Punjab",
  city: "Amritsar",
  stock: {},
  demand: { Wheat: 500, Rice: 300, Sugar: 100 }
});

await supabase.from('locations').upsert({
  id: "fps-punjab-ludhiana-civil",
  name: "Civil Lines FPS Ludhiana",
  type: "fps",
  state: "Punjab",
  city: "Ludhiana",
  stock: {},
  demand: { Wheat: 600, Rice: 400, Sugar: 120 }
});

// Haryana FPS
await supabase.from('locations').upsert({
  id: "fps-haryana-gurugram-sector",
  name: "Sector 14 FPS Gurugram",
  type: "fps",
  state: "Haryana",
  city: "Gurugram",
  stock: {},
  demand: { Wheat: 450, Rice: 350, Sugar: 90 }
});

await supabase.from('locations').upsert({
  id: "fps-haryana-faridabad-nehru",
  name: "Nehru Ground FPS Faridabad",
  type: "fps",
  state: "Haryana",
  city: "Faridabad",
  stock: {},
  demand: { Wheat: 400, Rice: 320, Sugar: 85 }
});

// Delhi FPS
await supabase.from('locations').upsert({
  id: "fps-delhi-central-cp",
  name: "Connaught Place FPS",
  type: "fps",
  state: "Delhi",
  city: "Delhi",
  stock: {},
  demand: { Wheat: 800, Rice: 600, Sugar: 200 }
});

await supabase.from('locations').upsert({
  id: "fps-delhi-south-hauz",
  name: "Hauz Khas FPS",
  type: "fps",
  state: "Delhi",
  city: "Delhi",
  stock: {},
  demand: { Wheat: 700, Rice: 550, Sugar: 180 }
});

// Uttar Pradesh FPS
await supabase.from('locations').upsert({
  id: "fps-up-lucknow-hazrat",
  name: "Hazratganj FPS Lucknow",
  type: "fps",
  state: "Uttar Pradesh",
  city: "Lucknow",
  stock: {},
  demand: { Wheat: 900, Rice: 700, Sugar: 220 }
});

await supabase.from('locations').upsert({
  id: "fps-up-kanpur-kidwai",
  name: "Kidwai Nagar FPS Kanpur",
  type: "fps",
  state: "Uttar Pradesh",
  city: "Kanpur",
  stock: {},
  demand: { Wheat: 850, Rice: 650, Sugar: 210 }
});

await supabase.from('locations').upsert({
  id: "fps-up-agra-taj",
  name: "Taj Ganj FPS Agra",
  type: "fps",
  state: "Uttar Pradesh",
  city: "Agra",
  stock: {},
  demand: { Wheat: 600, Rice: 450, Sugar: 150 }
});

// Rajasthan FPS
await supabase.from('locations').upsert({
  id: "fps-rajasthan-jaipur-pink",
  name: "Pink City FPS Jaipur",
  type: "fps",
  state: "Rajasthan",
  city: "Jaipur",
  stock: {},
  demand: { Wheat: 700, Rice: 500, Sugar: 180 }
});

await supabase.from('locations').upsert({
  id: "fps-rajasthan-jodhpur-clock",
  name: "Clock Tower FPS Jodhpur",
  type: "fps",
  state: "Rajasthan",
  city: "Jodhpur",
  stock: {},
  demand: { Wheat: 550, Rice: 400, Sugar: 140 }
});

// Maharashtra FPS
await supabase.from('locations').upsert({
  id: "fps-maharashtra-mumbai-dadar",
  name: "Dadar FPS Mumbai",
  type: "fps",
  state: "Maharashtra",
  city: "Mumbai",
  stock: {},
  demand: { Wheat: 1000, Rice: 800, Sugar: 250 }
});

await supabase.from('locations').upsert({
  id: "fps-maharashtra-pune-shivaji",
  name: "Shivaji Nagar FPS Pune",
  type: "fps",
  state: "Maharashtra",
  city: "Pune",
  stock: {},
  demand: { Wheat: 750, Rice: 600, Sugar: 200 }
});

// West Bengal FPS
await supabase.from('locations').upsert({
  id: "fps-wb-kolkata-park",
  name: "Park Street FPS Kolkata",
  type: "fps",
  state: "West Bengal",
  city: "Kolkata",
  stock: {},
  demand: { Wheat: 500, Rice: 900, Sugar: 180 }
});

await supabase.from('locations').upsert({
  id: "fps-wb-howrah-station",
  name: "Howrah Station FPS",
  type: "fps",
  state: "West Bengal",
  city: "Howrah",
  stock: {},
  demand: { Wheat: 450, Rice: 850, Sugar: 160 }
});

// Gujarat FPS
await supabase.from('locations').upsert({
  id: "fps-gujarat-ahmedabad-ellis",
  name: "Ellis Bridge FPS Ahmedabad",
  type: "fps",
  state: "Gujarat",
  city: "Ahmedabad",
  stock: {},
  demand: { Wheat: 650, Rice: 500, Sugar: 170 }
});

await supabase.from('locations').upsert({
  id: "fps-gujarat-surat-ring",
  name: "Ring Road FPS Surat",
  type: "fps",
  state: "Gujarat",
  city: "Surat",
  stock: {},
  demand: { Wheat: 700, Rice: 550, Sugar: 190 }
});

/* ================= BENEFICIARIES ================= */

await supabase.from('beneficiaries').upsert({
  id: "PB2026001",
  name: "Gurpreet Singh",
  ration_card_id: "PB2026001",
  fps_id: "fps-punjab-amritsar-golden",
  entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
});

await supabase.from('beneficiaries').upsert({
  id: "HR2026001",
  name: "Rajesh Kumar",
  ration_card_id: "HR2026001",
  fps_id: "fps-haryana-gurugram-sector",
  entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
});

await supabase.from('beneficiaries').upsert({
  id: "DL2026001",
  name: "Amit Sharma",
  ration_card_id: "DL2026001",
  fps_id: "fps-delhi-central-cp",
  entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
});

await supabase.from('beneficiaries').upsert({
  id: "UP2026001",
  name: "Priya Verma",
  ration_card_id: "UP2026001",
  fps_id: "fps-up-lucknow-hazrat",
  entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
});

await supabase.from('beneficiaries').upsert({
  id: "RJ2026001",
  name: "Manish Rathore",
  ration_card_id: "RJ2026001",
  fps_id: "fps-rajasthan-jaipur-pink",
  entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
});

await supabase.from('beneficiaries').upsert({
  id: "MH2026001",
  name: "Sneha Patil",
  ration_card_id: "MH2026001",
  fps_id: "fps-maharashtra-mumbai-dadar",
  entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
});

await supabase.from('beneficiaries').upsert({
  id: "WB2026001",
  name: "Soumya Chatterjee",
  ration_card_id: "WB2026001",
  fps_id: "fps-wb-kolkata-park",
  entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
});

await supabase.from('beneficiaries').upsert({
  id: "GJ2026001",
  name: "Kiran Patel",
  ration_card_id: "GJ2026001",
  fps_id: "fps-gujarat-ahmedabad-ellis",
  entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
});

/* ================= GRAINS ================= */

const grains = ["Wheat","Rice","Sugar"];
for(const g of grains){
  await supabase.from('grains').upsert({
    id: g.toLowerCase(),
    name: g,
    created_at: new Date().toISOString()
  });
}

/* ================= TRANSACTIONS ================= */

await supabase.from('transactions').insert({
  hash: "0x" + Date.now() + "init1",
  timestamp: new Date().toLocaleString(),
  from_entity: "Govt Procurement",
  to_entity: "FCI Central Godown - Ludhiana",
  items: { Wheat: 50000 },
  type: "transfer"
});

await supabase.from('transactions').insert({
  hash: "0x" + Date.now() + "init2",
  timestamp: new Date().toLocaleString(),
  from_entity: "Govt Procurement",
  to_entity: "FCI Central Godown - Kolkata",
  items: { Rice: 60000 },
  type: "transfer"
});

await supabase.from('transactions').insert({
  hash: "0x" + Date.now() + "admin1",
  timestamp: new Date().toLocaleString(),
  from_entity: "System Admin",
  to_entity: "Initialize Database",
  items: "India PDS System Initialized with 8 States",
  type: "admin"
});

console.log("✅ ALL DATABASE STRUCTURE INITIALIZED");
console.log("📊 Created:");
console.log("   - 4 Central Godowns (Punjab, Haryana, West Bengal, UP)");
console.log("   - 8 State Warehouses");
console.log("   - 16 City Hubs");
console.log("   - 16 Fair Price Shops");
console.log("   - 8 Beneficiaries");
console.log("   - 3 Grain Types");
}

init();
