// Add this to server.js to allow database initialization via API endpoint
// This is useful for cloud deployments like Render.com

/* INITIALIZE DATABASE ENDPOINT (For Deployment) */
app.post("/api/init-database", async (req, res) => {
  try {
    const { supabase } = require("./supabase");

    console.log("🔄 Starting database initialization...");

    /* ================= CENTRAL GODOWNS ================= */
    await supabase.from('locations').upsert({
      id: "godown-punjab-ludhiana",
      name: "Punjab Central Godown (Ludhiana)",
      type: "godown",
      state: "Punjab",
      city: "Ludhiana",
      stock: { Wheat: 500000, Rice: 300000, Sugar: 100000 },
      demand: {},
      created_at: new Date().toISOString()
    });

    await supabase.from('locations').upsert({
      id: "godown-haryana-karnal",
      name: "Haryana Central Godown (Karnal)",
      type: "godown",
      state: "Haryana",
      city: "Karnal",
      stock: { Wheat: 450000, Rice: 250000, Sugar: 90000 },
      demand: {},
      created_at: new Date().toISOString()
    });

    await supabase.from('locations').upsert({
      id: "godown-wb-kolkata",
      name: "West Bengal Central Godown (Kolkata)",
      type: "godown",
      state: "West Bengal",
      city: "Kolkata",
      stock: { Wheat: 200000, Rice: 400000, Sugar: 80000 },
      demand: {},
      created_at: new Date().toISOString()
    });

    await supabase.from('locations').upsert({
      id: "godown-up-kanpur",
      name: "UP Central Godown (Kanpur)",
      type: "godown",
      state: "Uttar Pradesh",
      city: "Kanpur",
      stock: { Wheat: 550000, Rice: 350000, Sugar: 120000 },
      demand: {},
      created_at: new Date().toISOString()
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
      await supabase.from('locations').upsert({
        id: wh.id,
        name: wh.name,
        type: "warehouse",
        state: wh.state,
        city: "",
        stock: {},
        demand: { Wheat: 50000, Rice: 30000, Sugar: 10000 },
        created_at: new Date().toISOString()
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
      await supabase.from('locations').upsert({
        id: hub.id,
        name: hub.name,
        type: "cityhub",
        state: hub.state,
        city: hub.city,
        stock: {},
        demand: { Wheat: 20000, Rice: 15000, Sugar: 5000 },
        created_at: new Date().toISOString()
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
      await supabase.from('locations').upsert({
        id: fps.id,
        name: fps.name,
        type: "fps",
        state: fps.state,
        city: fps.city,
        stock: {},
        demand: { Wheat: 5000, Rice: 4000, Sugar: 1000 },
        created_at: new Date().toISOString()
      });
    }

    /* ================= BENEFICIARIES ================= */
    await supabase.from('beneficiaries').upsert({
      id: "PB2026001",
      name: "Gurpreet Singh",
      ration_card_id: "PB2026001",
      fps_id: "fps-punjab-amritsar-golden",
      phone_number: "+919810000001",
      entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
    });

    await supabase.from('beneficiaries').upsert({
      id: "HR2026001",
      name: "Rajesh Kumar",
      ration_card_id: "HR2026001",
      fps_id: "fps-haryana-gurugram-sector",
      phone_number: "+919810000002",
      entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
    });

    await supabase.from('beneficiaries').upsert({
      id: "DL2026001",
      name: "Amit Sharma",
      ration_card_id: "DL2026001",
      fps_id: "fps-delhi-central-cp",
      phone_number: "+919810000003",
      entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
    });

    await supabase.from('beneficiaries').upsert({
      id: "UP2026001",
      name: "Priya Verma",
      ration_card_id: "UP2026001",
      fps_id: "fps-up-lucknow-hazrat",
      phone_number: "+919810000004",
      entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
    });

    await supabase.from('beneficiaries').upsert({
      id: "RJ2026001",
      name: "Manish Rathore",
      ration_card_id: "RJ2026001",
      fps_id: "fps-rajasthan-jaipur-pink",
      phone_number: "+919810000005",
      entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
    });

    await supabase.from('beneficiaries').upsert({
      id: "MH2026001",
      name: "Sneha Patil",
      ration_card_id: "MH2026001",
      fps_id: "fps-maharashtra-mumbai-dadar",
      phone_number: "+919810000006",
      entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
    });

    await supabase.from('beneficiaries').upsert({
      id: "WB2026001",
      name: "Soumya Chatterjee",
      ration_card_id: "WB2026001",
      fps_id: "fps-wb-kolkata-park",
      phone_number: "+919810000007",
      entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
    });

    await supabase.from('beneficiaries').upsert({
      id: "GJ2026001",
      name: "Kiran Patel",
      ration_card_id: "GJ2026001",
      fps_id: "fps-gujarat-ahmedabad-ellis",
      phone_number: "+919810000008",
      entitlement: { Wheat: 100, Rice: 100, Sugar: 100 }
    });

    /* ================= GRAINS ================= */
    const grains = ["Wheat", "Rice", "Sugar"];
    for (const g of grains) {
      await supabase.from('grains').upsert({
        id: g.toLowerCase(),
        name: g,
        created_at: new Date().toISOString()
      });
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
