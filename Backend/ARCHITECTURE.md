# System Architecture Diagram

## 🏗️ **Overall Application Architecture**

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER BROWSER (Client Side)                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   JustRation Dashboard                   │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │  │  │
│  │  │  │  Dashboard   │  │ Add Stock    │  │ Dispatch │ │  │  │
│  │  │  └──────────────┘  └──────────────┘  └──────────┘ │  │  │
│  │  │  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │  │  │
│  │  │  │ Beneficiary  │  │ Distribution │  │  Ledger  │ │  │  │
│  │  │  └──────────────┘  └──────────────┘  └──────────┘ │  │  │
│  │  │  ┌──────────────┐                                  │  │  │
│  │  │  │System Admin  │                                  │  │  │
│  │  │  └──────────────┘                                  │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                     (index.ejs + CSS)                     │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────┬──────────────────────────────────────────┘
                      │
                      │ HTTPS/API Calls
                      │
┌─────────────────────▼──────────────────────────────────────────┐
│               NODE.JS EXPRESS SERVER (Backend)                 │
│  ┌────────────────────────────────────────────────────────┐   │
│  │             API Route Handlers (server.js)             │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │  GET /                    → Render Dashboard     │  │   │
│  │  │  GET /api/health          → Health Check        │  │   │
│  │  │  GET /api/db              → Fetch All Data      │  │   │
│  │  │  POST /api/add-stock      → Add Stock           │  │   │
│  │  │  POST /api/dispatch       → Dispatch Goods      │  │   │
│  │  │  POST /api/add-beneficiary→ Register Beneficiary│  │   │
│  │  │  POST /api/distribute     → Distribute Ration   │  │   │
│  │  │  POST /api/add-grain      → Add Grain           │  │   │
│  │  │  POST /api/remove-grain   → Remove Grain        │  │   │
│  │  │  POST /api/add-location   → Create Location     │  │   │
│  │  │  POST /api/delete-location→ Delete Location     │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  └────────────────────────────────────────────────────────┘   │
│  ┌────────────────────────────────────────────────────────┐   │
│  │        Firebase Admin SDK (firebase.js)               │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │  db = admin.firestore()                          │  │   │
│  │  │  locationsRef = db.collection('locations')       │  │   │
│  │  │  beneficiariesRef = db.collection('beneficiaries')│  │   │
│  │  │  grainsRef = db.collection('grains')             │  │   │
│  │  │  transactionsRef = db.collection('transactions') │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  └────────────────────────────────────────────────────────┘   │
│  Port: 3000                                                    │
└─────────────────────┬──────────────────────────────────────────┘
                      │
                      │ Firestore SDK
                      │ (Authenticated)
┌─────────────────────▼──────────────────────────────────────────┐
│           FIREBASE FIRESTORE (Cloud Database)                  │
│  ┌────────────────────────────────────────────────────────┐   │
│  │              Collections & Documents                   │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │ 📍 locations (Central, Warehouses, Hubs, FPS)   │  │   │
│  │  │    ├─ fci-delhi                                 │  │   │
│  │  │    │  ├─ name: "FCI Central Godown"            │  │   │
│  │  │    │  ├─ type: "godown"                        │  │   │
│  │  │    │  ├─ stock: {Wheat: 5000, Rice: 3000}      │  │   │
│  │  │    │  └─ demand: {}                            │  │   │
│  │  │    ├─ warehouse-delhi                           │  │   │
│  │  │    └─ hub-delhi                                │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │ 👤 beneficiaries (Ration Card Holders)          │  │   │
│  │  │    ├─ RJ20241234                                │  │   │
│  │  │    │  ├─ name: "Ram Kumar"                      │  │   │
│  │  │    │  ├─ rationCardId: "RJ20241234"             │  │   │
│  │  │    │  ├─ fpsId: "fps-delhi"                     │  │   │
│  │  │    │  └─ entitlement: {Wheat: 15, Rice: 10}     │  │   │
│  │  │    └─ RJ20241235                                │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │ 🌾 grains (Grain Types)                         │  │   │
│  │  │    ├─ wheat: {name: "Wheat"}                    │  │   │
│  │  │    ├─ rice: {name: "Rice"}                      │  │   │
│  │  │    └─ sugar: {name: "Sugar"}                    │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │ 📝 transactions (Audit Trail)                   │  │   │
│  │  │    ├─ doc1                                      │  │   │
│  │  │    │  ├─ hash: "0x1234567890"                  │  │   │
│  │  │    │  ├─ timestamp: "23/01/2026 10:30"         │  │   │
│  │  │    │  ├─ from: "Govt. Procurement"             │  │   │
│  │  │    │  ├─ to: "FCI Central Godown"              │  │   │
│  │  │    │  ├─ items: {Wheat: 5000}                  │  │   │
│  │  │    │  └─ type: "transfer"                      │  │   │
│  │  │    └─ doc2                                      │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  └────────────────────────────────────────────────────────┘   │
│  Managed by: Google Cloud                                      │
│  Backup: Automatic & Encrypted                                │
│  Replication: Multi-region                                    │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🔄 **Request-Response Flow Example: Adding Stock**

```
┌─────────────────────────────────────────────────────────────────┐
│ Step 1: USER INTERACTION                                        │
├─────────────────────────────────────────────────────────────────┤
│ User fills form:                                                │
│  • Select Godown: "FCI Central Godown (Delhi)"                │
│  • Select Grain: "Wheat"                                       │
│  • Enter Quantity: "1000"                                      │
│ Clicks: "Add Stock & Record"                                   │
└────────────────────┬────────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────────┐
│ Step 2: FRONTEND (index.ejs)                                    │
├─────────────────────────────────────────────────────────────────┤
│ Function called: addStock()                                     │
│  {                                                              │
│    godownId: "fci-delhi"                                       │
│    grain: "Wheat"                                              │
│    quantity: 1000                                              │
│  }                                                              │
│                                                                 │
│ Calls API function: addStockToFirebase()                        │
└────────────────────┬────────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────────┐
│ Step 3: API WRAPPER (public/script.js)                          │
├─────────────────────────────────────────────────────────────────┤
│ Function: addStockToFirebase(godownId, grain, quantity)        │
│                                                                 │
│ Creates HTTP POST request:                                     │
│  POST /api/add-stock                                           │
│  Content-Type: application/json                                │
│  Body: {                                                        │
│    "godownId": "fci-delhi",                                    │
│    "grain": "Wheat",                                           │
│    "quantity": 1000                                            │
│  }                                                              │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     │ HTTP Request
                     │ (over network)
                     │
┌────────────────────▼────────────────────────────────────────────┐
│ Step 4: BACKEND API (server.js)                                 │
├─────────────────────────────────────────────────────────────────┤
│ Route Handler: app.post("/api/add-stock", ...)                 │
│                                                                 │
│ 1. Receive request body                                        │
│ 2. Extract: godownId, grain, quantity                          │
│ 3. Get reference: locationsRef.doc(godownId)                   │
│ 4. Fetch current data                                          │
│ 5. Update stock: stock[grain] += quantity                      │
│ 6. Save to Firebase: await ref.update({stock})                 │
│ 7. Record transaction                                          │
│ 8. Return response                                             │
└────────────────────┬────────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────────┐
│ Step 5: FIREBASE SDK (firebase.js)                              │
├─────────────────────────────────────────────────────────────────┤
│ Firebase Admin SDK processes:                                   │
│  1. Authenticate using credentials                            │
│  2. Connect to Firestore database                             │
│  3. Update document in 'locations' collection                 │
│  4. Add document to 'transactions' collection                 │
│  5. Confirm write operations                                  │
└────────────────────┬────────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────────┐
│ Step 6: FIREBASE FIRESTORE (Cloud Database)                     │
├─────────────────────────────────────────────────────────────────┤
│ Collections Updated:                                            │
│                                                                 │
│ 📍 locations:                                                   │
│    fci-delhi:                                                   │
│      stock: {                                                   │
│        Wheat: 6000,  ← UPDATED from 5000                       │
│        Rice: 3000                                              │
│      }                                                          │
│                                                                 │
│ 📝 transactions:                                                │
│    new_transaction_id:                                          │
│      hash: "0x1234567890"                                      │
│      timestamp: "23/01/2026 10:35"                             │
│      from: "Govt. Procurement"                                 │
│      to: "FCI Central Godown (Delhi)"                          │
│      items: {Wheat: 1000}                                      │
│      type: "transfer"                                          │
│                                                                 │
│ ✅ Data PERSISTED in Firebase                                   │
│ ✅ Backup created automatically                                 │
│ ✅ Transaction logged for audit trail                           │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     │ HTTP Response
                     │ JSON: {message: "Stock added successfully"}
                     │
┌────────────────────▼────────────────────────────────────────────┐
│ Step 7: FRONTEND UPDATES (index.ejs)                            │
├─────────────────────────────────────────────────────────────────┤
│ Response received in addStock():                                │
│                                                                 │
│ 1. Check response status                                       │
│ 2. Clear input field                                           │
│ 3. Show success toast: "1000 Kgs of Wheat added!"             │
│ 4. Call renderCentralAdminView()                               │
│ 5. Call loadDBFromFirebase() to refresh data                   │
│                                                                 │
│ ✅ UI Updated                                                   │
│ ✅ New data from Firebase displayed                             │
│ ✅ Confirmation shown to user                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📡 **Component Interaction Diagram**

```
                    Frontend Components
                          │
        ┌──────────┬───────┼───────┬──────────┐
        │          │       │       │          │
    Dashboard  Admin    Dispatch Beneficiary Ledger
        │          │       │       │          │
        └──────────┴───────┼───────┴──────────┘
                          │
                    index.ejs (HTML/CSS)
                          │
                    Event Handlers
                    (addStock, etc)
                          │
                    script.js Functions
                    (API Wrapper Layer)
                          │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
    Fetch API (HTTP)      │                  │
        │                  │                  │
        └──────────────────┼──────────────────┘
                          │
                    server.js API Routes
                          │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
    Validation        Business Logic      Error Handling
        │                  │                  │
        └──────────────────┼──────────────────┘
                          │
                    firebase.js
                    (Admin SDK)
                          │
                    Firestore SDK
                          │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
    Create          Read/Update          Delete
        │                  │                  │
        └──────────────────┼──────────────────┘
                          │
                  Firebase Firestore
                (Google Cloud Database)
                          │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   Collections:    Documents:         Fields:
   - locations     - location_id      - name
   - beneficiaries - user_id          - stock
   - grains        - transaction_id   - timestamp
   - transactions  - grain_id         - items
```

---

## 🔐 **Security Flow**

```
User Browser                    Backend Server              Firebase
     │                               │                          │
     │ No Firebase credentials       │                          │
     │ No direct API access          │                          │
     │ Only JSON data                │                          │
     │                               │                          │
     ├──────HTTP POST────────────────┤ Firebase Credentials     │
     │   /api/add-stock              │ (firebase-key.json)      │
     │   {data}                      │ Secured on backend       │
     │                               │                          │
     │                               ├──Firestore SDK Auth──────┤
     │                               │   Admin privileges       │
     │                               │                          │
     │                               │   ├─Update Document      │
     │                               │   ├─Add Transaction      │
     │                               │   └─Verify Rules         │
     │                               │                          │
     │◄──────JSON Response───────────┤◄─Confirm & Return────────┤
     │   {message: "Success"}        │   Changes Applied        │
     │                               │   Backup Created         │
     │   Update UI                   │   Encrypted Storage      │
     │   Show Toast                  │
     │
```

---

## ✅ **Data Persistence Guarantee**

```
User Interaction
    ↓
HTTP Request to Backend
    ↓
Validation Check
    ↓
Firebase Write Operation
    ↓
✅ Data Confirmed in Cloud
    ├─ Primary Replica
    ├─ Regional Backups
    └─ Disaster Recovery Copies
    ↓
✅ Immutable Transaction Record
    ├─ Timestamp Logged
    ├─ Changes Tracked
    └─ Audit Trail Created
    ↓
✅ User Notification
    ├─ Success Toast
    ├─ Data Refresh
    └─ UI Update
```

---

**This architecture ensures:**
- ✅ Secure credential management
- ✅ Scalable database backend
- ✅ Complete audit trail
- ✅ Reliable data persistence
- ✅ Real-time synchronization
