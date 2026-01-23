const {
  locationsRef,
  beneficiariesRef,
  grainsRef,
  transactionsRef
} = require("./firebase");

async function init(){

/* ================= LOCATIONS ================= */

await locationsRef.doc("fci-delhi").set({
  name:"FCI Central Godown (Delhi)",
  type:"godown",
  state:"Delhi",
  city:"",
  stock:{
    Wheat:5000,
    Rice:3000,
    Sugar:1000
  },
  demand:{}
});

await locationsRef.doc("warehouse-delhi").set({
  name:"Delhi State Warehouse",
  type:"warehouse",
  state:"Delhi",
  city:"",
  stock:{},
  demand:{}
});

await locationsRef.doc("hub-delhi").set({
  name:"Delhi City Hub",
  type:"city-hub",
  state:"Delhi",
  city:"Delhi",
  stock:{},
  demand:{}
});

await locationsRef.doc("fps-delhi").set({
  name:"FPS Delhi",
  type:"fps",
  state:"Delhi",
  city:"Delhi",
  stock:{},
  demand:{
    Wheat:100,
    Rice:80,
    Sugar:30
  }
});

/* ================= BENEFICIARIES ================= */

await beneficiariesRef.doc("RJ20241234").set({
  name:"Ram Kumar",
  rationCardId:"RJ20241234",
  fpsId:"fps-delhi",
  entitlement:{
    Wheat:15,
    Rice:10,
    Sugar:2
  }
});

/* ================= GRAINS ================= */

const grains = ["Wheat","Rice","Sugar"];
for(const g of grains){
  await grainsRef.doc(g).set({name:g});
}

/* ================= TRANSACTIONS ================= */

await transactionsRef.add({
  hash:"0xabc123",
  timestamp:new Date().toLocaleString(),
  from:"Govt Procurement",
  to:"FCI Central Godown (Delhi)",
  items:{Wheat:500},
  type:"transfer"
});

await transactionsRef.add({
  hash:"0xadmin1",
  timestamp:new Date().toLocaleString(),
  from:"System Admin",
  to:"Create FPS",
  items:"FPS Delhi Created",
  type:"admin"
});

console.log("✅ ALL DATABASE STRUCTURE INITIALIZED");
}

init();
