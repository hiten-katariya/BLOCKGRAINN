const {
  locationsRef,
  beneficiariesRef,
  grainsRef,
  transactionsRef
} = require("./firebase");

async function init(){

/* ================= CENTRAL GODOWNS (Major Storage Centers) ================= */

// Punjab - Major wheat producing state
await locationsRef.doc("fci-punjab-ludhiana").set({
  name:"FCI Central Godown - Ludhiana",
  type:"godown",
  state:"Punjab",
  city:"",
  stock:{ Wheat:50000, Rice:30000, Sugar:10000 },
  demand:{}
});

// Haryana - Major grain storage
await locationsRef.doc("fci-haryana-karnal").set({
  name:"FCI Central Godown - Karnal",
  type:"godown",
  state:"Haryana",
  city:"",
  stock:{ Wheat:45000, Rice:25000, Sugar:8000 },
  demand:{}
});

// West Bengal - Major rice producing state
await locationsRef.doc("fci-westbengal-kolkata").set({
  name:"FCI Central Godown - Kolkata",
  type:"godown",
  state:"West Bengal",
  city:"",
  stock:{ Wheat:20000, Rice:60000, Sugar:12000 },
  demand:{}
});

// Uttar Pradesh - Largest population
await locationsRef.doc("fci-uttarpradesh-kanpur").set({
  name:"FCI Central Godown - Kanpur",
  type:"godown",
  state:"Uttar Pradesh",
  city:"",
  stock:{ Wheat:55000, Rice:40000, Sugar:15000 },
  demand:{}
});

/* ================= STATE WAREHOUSES ================= */

// Punjab
await locationsRef.doc("warehouse-punjab").set({
  name:"Punjab State Warehouse",
  type:"warehouse",
  state:"Punjab",
  city:"",
  stock:{},
  demand:{}
});

// Haryana
await locationsRef.doc("warehouse-haryana").set({
  name:"Haryana State Warehouse",
  type:"warehouse",
  state:"Haryana",
  city:"",
  stock:{},
  demand:{}
});

// Delhi
await locationsRef.doc("warehouse-delhi").set({
  name:"Delhi State Warehouse",
  type:"warehouse",
  state:"Delhi",
  city:"",
  stock:{},
  demand:{}
});

// Uttar Pradesh
await locationsRef.doc("warehouse-uttarpradesh").set({
  name:"Uttar Pradesh State Warehouse",
  type:"warehouse",
  state:"Uttar Pradesh",
  city:"",
  stock:{},
  demand:{}
});

// Rajasthan
await locationsRef.doc("warehouse-rajasthan").set({
  name:"Rajasthan State Warehouse",
  type:"warehouse",
  state:"Rajasthan",
  city:"",
  stock:{},
  demand:{}
});

// Maharashtra
await locationsRef.doc("warehouse-maharashtra").set({
  name:"Maharashtra State Warehouse",
  type:"warehouse",
  state:"Maharashtra",
  city:"",
  stock:{},
  demand:{}
});

// West Bengal
await locationsRef.doc("warehouse-westbengal").set({
  name:"West Bengal State Warehouse",
  type:"warehouse",
  state:"West Bengal",
  city:"",
  stock:{},
  demand:{}
});

// Gujarat
await locationsRef.doc("warehouse-gujarat").set({
  name:"Gujarat State Warehouse",
  type:"warehouse",
  state:"Gujarat",
  city:"",
  stock:{},
  demand:{}
});

/* ================= CITY HUBS ================= */

// Punjab Cities
await locationsRef.doc("hub-punjab-amritsar").set({
  name:"Amritsar City Hub",
  type:"city-hub",
  state:"Punjab",
  city:"Amritsar",
  stock:{},
  demand:{}
});

await locationsRef.doc("hub-punjab-ludhiana").set({
  name:"Ludhiana City Hub",
  type:"city-hub",
  state:"Punjab",
  city:"Ludhiana",
  stock:{},
  demand:{}
});

// Haryana Cities
await locationsRef.doc("hub-haryana-gurugram").set({
  name:"Gurugram City Hub",
  type:"city-hub",
  state:"Haryana",
  city:"Gurugram",
  stock:{},
  demand:{}
});

await locationsRef.doc("hub-haryana-faridabad").set({
  name:"Faridabad City Hub",
  type:"city-hub",
  state:"Haryana",
  city:"Faridabad",
  stock:{},
  demand:{}
});

// Delhi
await locationsRef.doc("hub-delhi-central").set({
  name:"Central Delhi Hub",
  type:"city-hub",
  state:"Delhi",
  city:"Delhi",
  stock:{},
  demand:{}
});

await locationsRef.doc("hub-delhi-south").set({
  name:"South Delhi Hub",
  type:"city-hub",
  state:"Delhi",
  city:"Delhi",
  stock:{},
  demand:{}
});

// Uttar Pradesh Cities
await locationsRef.doc("hub-up-lucknow").set({
  name:"Lucknow City Hub",
  type:"city-hub",
  state:"Uttar Pradesh",
  city:"Lucknow",
  stock:{},
  demand:{}
});

await locationsRef.doc("hub-up-kanpur").set({
  name:"Kanpur City Hub",
  type:"city-hub",
  state:"Uttar Pradesh",
  city:"Kanpur",
  stock:{},
  demand:{}
});

await locationsRef.doc("hub-up-agra").set({
  name:"Agra City Hub",
  type:"city-hub",
  state:"Uttar Pradesh",
  city:"Agra",
  stock:{},
  demand:{}
});

// Rajasthan Cities
await locationsRef.doc("hub-rajasthan-jaipur").set({
  name:"Jaipur City Hub",
  type:"city-hub",
  state:"Rajasthan",
  city:"Jaipur",
  stock:{},
  demand:{}
});

await locationsRef.doc("hub-rajasthan-jodhpur").set({
  name:"Jodhpur City Hub",
  type:"city-hub",
  state:"Rajasthan",
  city:"Jodhpur",
  stock:{},
  demand:{}
});

// Maharashtra Cities
await locationsRef.doc("hub-maharashtra-mumbai").set({
  name:"Mumbai City Hub",
  type:"city-hub",
  state:"Maharashtra",
  city:"Mumbai",
  stock:{},
  demand:{}
});

await locationsRef.doc("hub-maharashtra-pune").set({
  name:"Pune City Hub",
  type:"city-hub",
  state:"Maharashtra",
  city:"Pune",
  stock:{},
  demand:{}
});

// West Bengal Cities
await locationsRef.doc("hub-wb-kolkata").set({
  name:"Kolkata City Hub",
  type:"city-hub",
  state:"West Bengal",
  city:"Kolkata",
  stock:{},
  demand:{}
});

await locationsRef.doc("hub-wb-howrah").set({
  name:"Howrah City Hub",
  type:"city-hub",
  state:"West Bengal",
  city:"Howrah",
  stock:{},
  demand:{}
});

// Gujarat Cities
await locationsRef.doc("hub-gujarat-ahmedabad").set({
  name:"Ahmedabad City Hub",
  type:"city-hub",
  state:"Gujarat",
  city:"Ahmedabad",
  stock:{},
  demand:{}
});

await locationsRef.doc("hub-gujarat-surat").set({
  name:"Surat City Hub",
  type:"city-hub",
  state:"Gujarat",
  city:"Surat",
  stock:{},
  demand:{}
});

/* ================= FAIR PRICE SHOPS (FPS) ================= */

// Punjab FPS
await locationsRef.doc("fps-punjab-amritsar-golden").set({
  name:"Golden Temple Area FPS",
  type:"fps",
  state:"Punjab",
  city:"Amritsar",
  stock:{},
  demand:{ Wheat:500, Rice:300, Sugar:100 }
});

await locationsRef.doc("fps-punjab-ludhiana-civil").set({
  name:"Civil Lines FPS Ludhiana",
  type:"fps",
  state:"Punjab",
  city:"Ludhiana",
  stock:{},
  demand:{ Wheat:600, Rice:400, Sugar:120 }
});

// Haryana FPS
await locationsRef.doc("fps-haryana-gurugram-sector").set({
  name:"Sector 14 FPS Gurugram",
  type:"fps",
  state:"Haryana",
  city:"Gurugram",
  stock:{},
  demand:{ Wheat:450, Rice:350, Sugar:90 }
});

await locationsRef.doc("fps-haryana-faridabad-nehru").set({
  name:"Nehru Ground FPS Faridabad",
  type:"fps",
  state:"Haryana",
  city:"Faridabad",
  stock:{},
  demand:{ Wheat:400, Rice:320, Sugar:85 }
});

// Delhi FPS
await locationsRef.doc("fps-delhi-central-cp").set({
  name:"Connaught Place FPS",
  type:"fps",
  state:"Delhi",
  city:"Delhi",
  stock:{},
  demand:{ Wheat:800, Rice:600, Sugar:200 }
});

await locationsRef.doc("fps-delhi-south-hauz").set({
  name:"Hauz Khas FPS",
  type:"fps",
  state:"Delhi",
  city:"Delhi",
  stock:{},
  demand:{ Wheat:700, Rice:550, Sugar:180 }
});

// Uttar Pradesh FPS
await locationsRef.doc("fps-up-lucknow-hazrat").set({
  name:"Hazratganj FPS Lucknow",
  type:"fps",
  state:"Uttar Pradesh",
  city:"Lucknow",
  stock:{},
  demand:{ Wheat:900, Rice:700, Sugar:220 }
});

await locationsRef.doc("fps-up-kanpur-kidwai").set({
  name:"Kidwai Nagar FPS Kanpur",
  type:"fps",
  state:"Uttar Pradesh",
  city:"Kanpur",
  stock:{},
  demand:{ Wheat:850, Rice:650, Sugar:210 }
});

await locationsRef.doc("fps-up-agra-taj").set({
  name:"Taj Ganj FPS Agra",
  type:"fps",
  state:"Uttar Pradesh",
  city:"Agra",
  stock:{},
  demand:{ Wheat:600, Rice:450, Sugar:150 }
});

// Rajasthan FPS
await locationsRef.doc("fps-rajasthan-jaipur-pink").set({
  name:"Pink City FPS Jaipur",
  type:"fps",
  state:"Rajasthan",
  city:"Jaipur",
  stock:{},
  demand:{ Wheat:700, Rice:500, Sugar:180 }
});

await locationsRef.doc("fps-rajasthan-jodhpur-clock").set({
  name:"Clock Tower FPS Jodhpur",
  type:"fps",
  state:"Rajasthan",
  city:"Jodhpur",
  stock:{},
  demand:{ Wheat:550, Rice:400, Sugar:140 }
});

// Maharashtra FPS
await locationsRef.doc("fps-maharashtra-mumbai-dadar").set({
  name:"Dadar FPS Mumbai",
  type:"fps",
  state:"Maharashtra",
  city:"Mumbai",
  stock:{},
  demand:{ Wheat:1000, Rice:800, Sugar:250 }
});

await locationsRef.doc("fps-maharashtra-pune-shivaji").set({
  name:"Shivaji Nagar FPS Pune",
  type:"fps",
  state:"Maharashtra",
  city:"Pune",
  stock:{},
  demand:{ Wheat:750, Rice:600, Sugar:200 }
});

// West Bengal FPS
await locationsRef.doc("fps-wb-kolkata-park").set({
  name:"Park Street FPS Kolkata",
  type:"fps",
  state:"West Bengal",
  city:"Kolkata",
  stock:{},
  demand:{ Wheat:500, Rice:900, Sugar:180 }
});

await locationsRef.doc("fps-wb-howrah-station").set({
  name:"Howrah Station FPS",
  type:"fps",
  state:"West Bengal",
  city:"Howrah",
  stock:{},
  demand:{ Wheat:450, Rice:850, Sugar:160 }
});

// Gujarat FPS
await locationsRef.doc("fps-gujarat-ahmedabad-ellis").set({
  name:"Ellis Bridge FPS Ahmedabad",
  type:"fps",
  state:"Gujarat",
  city:"Ahmedabad",
  stock:{},
  demand:{ Wheat:650, Rice:500, Sugar:170 }
});

await locationsRef.doc("fps-gujarat-surat-ring").set({
  name:"Ring Road FPS Surat",
  type:"fps",
  state:"Gujarat",
  city:"Surat",
  stock:{},
  demand:{ Wheat:700, Rice:550, Sugar:190 }
});

/* ================= BENEFICIARIES ================= */

await beneficiariesRef.doc("PB2026001").set({
  name:"Gurpreet Singh",
  rationCardId:"PB2026001",
  fpsId:"fps-punjab-amritsar-golden",
  entitlement:{ Wheat:100, Rice:100, Sugar:100 }
});

await beneficiariesRef.doc("HR2026001").set({
  name:"Rajesh Kumar",
  rationCardId:"HR2026001",
  fpsId:"fps-haryana-gurugram-sector",
  entitlement:{ Wheat:100, Rice:100, Sugar:100 }
});

await beneficiariesRef.doc("DL2026001").set({
  name:"Amit Sharma",
  rationCardId:"DL2026001",
  fpsId:"fps-delhi-central-cp",
  entitlement:{ Wheat:100, Rice:100, Sugar:100 }
});

await beneficiariesRef.doc("UP2026001").set({
  name:"Priya Verma",
  rationCardId:"UP2026001",
  fpsId:"fps-up-lucknow-hazrat",
  entitlement:{ Wheat:100, Rice:100, Sugar:100 }
});

await beneficiariesRef.doc("RJ2026001").set({
  name:"Manish Rathore",
  rationCardId:"RJ2026001",
  fpsId:"fps-rajasthan-jaipur-pink",
  entitlement:{ Wheat:100, Rice:100, Sugar:100 }
});

await beneficiariesRef.doc("MH2026001").set({
  name:"Sneha Patil",
  rationCardId:"MH2026001",
  fpsId:"fps-maharashtra-mumbai-dadar",
  entitlement:{ Wheat:100, Rice:100, Sugar:100 }
});

await beneficiariesRef.doc("WB2026001").set({
  name:"Soumya Chatterjee",
  rationCardId:"WB2026001",
  fpsId:"fps-wb-kolkata-park",
  entitlement:{ Wheat:100, Rice:100, Sugar:100 }
});

await beneficiariesRef.doc("GJ2026001").set({
  name:"Kiran Patel",
  rationCardId:"GJ2026001",
  fpsId:"fps-gujarat-ahmedabad-ellis",
  entitlement:{ Wheat:100, Rice:100, Sugar:100 }
});

/* ================= GRAINS ================= */

const grains = ["Wheat","Rice","Sugar"];
for(const g of grains){
  await grainsRef.doc(g.toLowerCase()).set({name:g, createdAt: new Date().toLocaleString()});
}

/* ================= TRANSACTIONS ================= */

await transactionsRef.add({
  hash:"0x" + Date.now() + "init1",
  timestamp:new Date().toLocaleString(),
  from:"Govt Procurement",
  to:"FCI Central Godown - Ludhiana",
  items:{Wheat:50000},
  type:"transfer"
});

await transactionsRef.add({
  hash:"0x" + Date.now() + "init2",
  timestamp:new Date().toLocaleString(),
  from:"Govt Procurement",
  to:"FCI Central Godown - Kolkata",
  items:{Rice:60000},
  type:"transfer"
});

await transactionsRef.add({
  hash:"0x" + Date.now() + "admin1",
  timestamp:new Date().toLocaleString(),
  from:"System Admin",
  to:"Initialize Database",
  items:"India PDS System Initialized with 8 States",
  type:"admin"
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
