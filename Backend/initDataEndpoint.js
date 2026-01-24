// Add this to server.js to allow database initialization via API endpoint
// This is useful for cloud deployments like Render.com

/* INITIALIZE DATABASE ENDPOINT (For Deployment) */
app.post("/api/init-database", async (req, res) => {
  try {
    const {
      locationsRef,
      beneficiariesRef,
      grainsRef,
      transactionsRef
    } = require("./firebase");

    console.log("🔄 Starting database initialization...");

    /* ================= CENTRAL GODOWNS ================= */
    await locationsRef.doc("godown-punjab-ludhiana").set({
      name: "Punjab Central Godown (Ludhiana)",
      type: "godown",
      state: "Punjab",
      city: "Ludhiana",
      stock: { Wheat: 500000, Rice: 300000, Sugar: 100000 },
      demand: {},
      createdAt: new Date().toLocaleString()
    });

    await locationsRef.doc("godown-haryana-karnal").set({
      name: "Haryana Central Godown (Karnal)",
      type: "godown",
      state: "Haryana",
      city: "Karnal",
      stock: { Wheat: 450000, Rice: 250000, Sugar: 90000 },
      demand: {},
      createdAt: new Date().toLocaleString()
    });

    await locationsRef.doc("godown-wb-kolkata").set({
      name: "West Bengal Central Godown (Kolkata)",
      type: "godown",
      state: "West Bengal",
      city: "Kolkata",
      stock: { Wheat: 200000, Rice: 400000, Sugar: 80000 },
      demand: {},
      createdAt: new Date().toLocaleString()
    });

    await locationsRef.doc("godown-up-kanpur").set({
      name: "UP Central Godown (Kanpur)",
      type: "godown",
      state: "Uttar Pradesh",
      city: "Kanpur",
      stock: { Wheat: 550000, Rice: 350000, Sugar: 120000 },
      demand: {},
      createdAt: new Date().toLocaleString()
    });

    /* ================= STATE WAREHOUSES ================= */
    const warehouses = [
      { id: "warehouse-punjab", name: "Punjab State Warehouse", state: "Punjab" },
      { id: "warehouse-haryana", name: "Haryana State Warehouse", state: "Haryana" },
      { id: "warehouse-delhi", name: "Delhi State Warehouse", state: "Delhi" },
      { id: "warehouse-up", name: "Uttar Pradesh State Warehouse", state: "Uttar Pradesh" },
      { id: "warehouse-rajasthan", name: "Rajasthan State Warehouse", state: "Rajasthan" },
      { id: "warehouse-maharashtra", name: "Maharashtra State Warehouse", state: "Maharashtra" },
      { id: "warehouse-wb", name: "West Bengal State Warehouse", state: "West Bengal" },
      { id: "warehouse-gujarat", name: "Gujarat State Warehouse", state: "Gujarat" }
    ];

    for (const wh of warehouses) {
      await locationsRef.doc(wh.id).set({
        name: wh.name,
        type: "warehouse",
        state: wh.state,
        city: "",
        stock: {},
        demand: { Wheat: 50000, Rice: 30000, Sugar: 10000 },
        createdAt: new Date().toLocaleString()
      });
    }

    /* ================= CITY HUBS ================= */
    const cityHubs = [
      { id: "cityhub-punjab-amritsar", name: "Amritsar City Hub", state: "Punjab", city: "Amritsar" },
      { id: "cityhub-punjab-ludhiana", name: "Ludhiana City Hub", state: "Punjab", city: "Ludhiana" },
      { id: "cityhub-haryana-gurugram", name: "Gurugram City Hub", state: "Haryana", city: "Gurugram" },
      { id: "cityhub-haryana-faridabad", name: "Faridabad City Hub", state: "Haryana", city: "Faridabad" },
      { id: "cityhub-delhi-central", name: "Delhi Central City Hub", state: "Delhi", city: "Delhi Central" },
      { id: "cityhub-delhi-south", name: "Delhi South City Hub", state: "Delhi", city: "Delhi South" },
      { id: "cityhub-up-lucknow", name: "Lucknow City Hub", state: "Uttar Pradesh", city: "Lucknow" },
      { id: "cityhub-up-kanpur", name: "Kanpur City Hub", state: "Uttar Pradesh", city: "Kanpur" },
      { id: "cityhub-up-agra", name: "Agra City Hub", state: "Uttar Pradesh", city: "Agra" },
      { id: "cityhub-rajasthan-jaipur", name: "Jaipur City Hub", state: "Rajasthan", city: "Jaipur" },
      { id: "cityhub-rajasthan-jodhpur", name: "Jodhpur City Hub", state: "Rajasthan", city: "Jodhpur" },
      { id: "cityhub-maharashtra-mumbai", name: "Mumbai City Hub", state: "Maharashtra", city: "Mumbai" },
      { id: "cityhub-maharashtra-pune", name: "Pune City Hub", state: "Maharashtra", city: "Pune" },
      { id: "cityhub-wb-kolkata", name: "Kolkata City Hub", state: "West Bengal", city: "Kolkata" },
      { id: "cityhub-wb-howrah", name: "Howrah City Hub", state: "West Bengal", city: "Howrah" },
      { id: "cityhub-gujarat-ahmedabad", name: "Ahmedabad City Hub", state: "Gujarat", city: "Ahmedabad" },
      { id: "cityhub-gujarat-surat", name: "Surat City Hub", state: "Gujarat", city: "Surat" }
    ];

    for (const hub of cityHubs) {
      await locationsRef.doc(hub.id).set({
        name: hub.name,
        type: "cityhub",
        state: hub.state,
        city: hub.city,
        stock: {},
        demand: { Wheat: 20000, Rice: 15000, Sugar: 5000 },
        createdAt: new Date().toLocaleString()
      });
    }

    /* ================= FAIR PRICE SHOPS (FPS) ================= */
    const fpsShops = [
      { id: "fps-punjab-amritsar-golden", name: "Golden Temple Area FPS", state: "Punjab", city: "Amritsar" },
      { id: "fps-punjab-ludhiana-civil", name: "Civil Lines FPS Ludhiana", state: "Punjab", city: "Ludhiana" },
      { id: "fps-haryana-gurugram-sector", name: "Sector 14 FPS Gurugram", state: "Haryana", city: "Gurugram" },
      { id: "fps-haryana-faridabad-nh", name: "NH-2 FPS Faridabad", state: "Haryana", city: "Faridabad" },
      { id: "fps-delhi-central-cp", name: "Connaught Place FPS", state: "Delhi", city: "Delhi Central" },
      { id: "fps-delhi-south-def", name: "Defence Colony FPS", state: "Delhi", city: "Delhi South" },
      { id: "fps-up-lucknow-hazrat", name: "Hazratganj FPS Lucknow", state: "Uttar Pradesh", city: "Lucknow" },
      { id: "fps-up-kanpur-civil", name: "Civil Lines FPS Kanpur", state: "Uttar Pradesh", city: "Kanpur" },
      { id: "fps-up-agra-taj", name: "Taj Ganj FPS Agra", state: "Uttar Pradesh", city: "Agra" },
      { id: "fps-rajasthan-jaipur-pink", name: "Pink City FPS Jaipur", state: "Rajasthan", city: "Jaipur" },
      { id: "fps-rajasthan-jodhpur-clock", name: "Clock Tower FPS Jodhpur", state: "Rajasthan", city: "Jodhpur" },
      { id: "fps-maharashtra-mumbai-dadar", name: "Dadar FPS Mumbai", state: "Maharashtra", city: "Mumbai" },
      { id: "fps-maharashtra-pune-koregaon", name: "Koregaon Park FPS Pune", state: "Maharashtra", city: "Pune" },
      { id: "fps-wb-kolkata-park", name: "Park Street FPS Kolkata", state: "West Bengal", city: "Kolkata" },
      { id: "fps-wb-howrah-station", name: "Howrah Station FPS", state: "West Bengal", city: "Howrah" },
      { id: "fps-gujarat-ahmedabad-ellis", name: "Ellis Bridge FPS Ahmedabad", state: "Gujarat", city: "Ahmedabad" },
      { id: "fps-gujarat-surat-ring", name: "Ring Road FPS Surat", state: "Gujarat", city: "Surat" }
    ];

    for (const fps of fpsShops) {
      await locationsRef.doc(fps.id).set({
        name: fps.name,
        type: "fps",
        state: fps.state,
        city: fps.city,
        stock: {},
        demand: { Wheat: 5000, Rice: 4000, Sugar: 1000 },
        createdAt: new Date().toLocaleString()
      });
    }

    /* ================= BENEFICIARIES ================= */
    await beneficiariesRef.doc("PB2026001").set({
      name: "Gurpreet Singh",
      rationCardId: "PB2026001",
      fpsId: "fps-punjab-amritsar-golden",
      entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
    });

    await beneficiariesRef.doc("HR2026001").set({
      name: "Rajesh Kumar",
      rationCardId: "HR2026001",
      fpsId: "fps-haryana-gurugram-sector",
      entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
    });

    await beneficiariesRef.doc("DL2026001").set({
      name: "Amit Sharma",
      rationCardId: "DL2026001",
      fpsId: "fps-delhi-central-cp",
      entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
    });

    await beneficiariesRef.doc("UP2026001").set({
      name: "Priya Verma",
      rationCardId: "UP2026001",
      fpsId: "fps-up-lucknow-hazrat",
      entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
    });

    await beneficiariesRef.doc("RJ2026001").set({
      name: "Manish Rathore",
      rationCardId: "RJ2026001",
      fpsId: "fps-rajasthan-jaipur-pink",
      entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
    });

    await beneficiariesRef.doc("MH2026001").set({
      name: "Sneha Patil",
      rationCardId: "MH2026001",
      fpsId: "fps-maharashtra-mumbai-dadar",
      entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
    });

    await beneficiariesRef.doc("WB2026001").set({
      name: "Soumya Chatterjee",
      rationCardId: "WB2026001",
      fpsId: "fps-wb-kolkata-park",
      entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
    });

    await beneficiariesRef.doc("GJ2026001").set({
      name: "Kiran Patel",
      rationCardId: "GJ2026001",
      fpsId: "fps-gujarat-ahmedabad-ellis",
      entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
    });

    /* ================= GRAINS ================= */
    const grains = ["Wheat", "Rice", "Sugar"];
    for (const g of grains) {
      await grainsRef.doc(g).set({ name: g });
    }

    console.log("✅ ALL DATABASE STRUCTURE INITIALIZED");
    res.json({
      success: true,
      message: "Database initialized successfully",
      created: {
        godowns: 4,
        warehouses: 8,
        cityHubs: 17,
        fpsShops: 17,
        beneficiaries: 8,
        grains: 3
      }
    });

  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
