# 🌾 JustRation - Blockchain-Based Public Distribution System

> A transparent, secure, and efficient supply chain management system for India's Public Distribution System (PDS) powered by blockchain technology.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange.svg)](https://firebase.google.com/)
[![Ganache](https://img.shields.io/badge/Ganache-Blockchain-purple.svg)](https://trufflesuite.com/ganache/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [User Roles](#user-roles)
- [Supply Chain Flow](#supply-chain-flow)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**JustRation** is a comprehensive blockchain-based supply chain management system designed specifically for India's Public Distribution System (PDS). It ensures transparency, accountability, and efficiency in the distribution of essential commodities like rice, wheat, and sugar from central godowns to Fair Price Shops (FPS) and ultimately to beneficiaries.

### Key Highlights

- 🔐 **Secure Authentication** - Role-based access control with 5 user types
- ⛓️ **Dual-Layer Storage** - Firebase for real-time data + Ganache blockchain for immutable audit trail
- 🗺️ **Real India PDS Data** - Authentic state, city, and location hierarchy
- 📊 **Complete Traceability** - Track every grain from procurement to distribution
- 🚀 **Modern UI/UX** - Responsive design with Tailwind CSS

---

## ✨ Features

### 🔒 Authentication & Authorization
- **5 User Roles** with granular permissions:
  - 👑 Admin - Full system access
  - 🏛️ Central Officer - Full operational access
  - 🏭 Warehouse Manager - Dispatch & distribution
  - 🏙️ City Hub Officer - City-level operations
  - 🏪 FPS Operator - Final distribution to beneficiaries
- Session-based authentication with localStorage
- Auto-redirect for unauthorized access

### 📦 Supply Chain Management
- **4-Tier Distribution Hierarchy:**
  1. Central Godown → State Warehouse
  2. State Warehouse → City Hub
  3. City Hub → Fair Price Shop (FPS)
  4. FPS → Beneficiary
- Dedicated page for each transfer stage
- Real-time stock tracking at all levels
- Automatic destination filtering based on location hierarchy

### ⛓️ Blockchain Integration
- Ethereum smart contracts (Solidity 0.8.0)
- Ganache local blockchain for development
- Web3.js v4 for blockchain interaction
- Immutable transaction records with unique hashes
- Complete audit trail for all stock movements

### 🗺️ Real India PDS Data
- **8 States** with authentic state warehouses
- **16 City Hubs** covering major Indian cities
- **16 Fair Price Shops** with local area names
- **4 Central Godowns** in Punjab, Haryana, UP, West Bengal
- Realistic stock quantities and grain types

### 📊 Dashboard & Analytics
- Real-time stock overview across all locations
- Beneficiary registration statistics
- Transaction history with blockchain verification
- Stock distribution charts (Chart.js)
- Quick action buttons for common tasks

### 🔄 Complete CRUD Operations
- ✅ Add stock to central godowns
- ✅ Transfer stock through supply chain
- ✅ Register beneficiaries with ration cards
- ✅ Distribute rations with entitlement validation
- ✅ Manage grain types (add/remove)
- ✅ Create/delete locations
- ✅ View complete transaction ledger

---

## 🛠️ Tech Stack

### Frontend
- **HTML5 / EJS** - Server-side templating
- **Tailwind CSS** - Modern utility-first CSS framework
- **JavaScript (ES6+)** - Vanilla JS for client-side logic
- **Chart.js** - Data visualization
- **Font Awesome** - Icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Firebase Admin SDK** - Firestore database
- **Web3.js v4** - Ethereum blockchain interaction
- **Truffle** - Smart contract development framework

### Blockchain
- **Ganache** - Local Ethereum blockchain
- **Solidity 0.8.0** - Smart contract language
- **RationSupplyChain.sol** - Custom smart contract for transaction recording

### Database
- **Firebase Firestore** - Primary NoSQL database
- **Collections:**
  - `locations` - All distribution points
  - `beneficiaries` - Ration card holders
  - `grains` - Grain types
  - `transactions` - All stock movements

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ Login UI │  │Dashboard │  │ Dispatch │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│              EXPRESS.JS SERVER (Node.js)                │
│  ┌──────────────┐  ┌──────────────┐                    │
│  │ REST API     │  │ EJS Renderer │                    │
│  └──────────────┘  └──────────────┘                    │
└─────────────────────────────────────────────────────────┘
           │                          │
           ▼                          ▼
┌──────────────────┐      ┌──────────────────────┐
│ FIREBASE         │      │ GANACHE BLOCKCHAIN   │
│ (Firestore)      │      │ (Local Ethereum)     │
│                  │      │                      │
│ - Locations      │      │ - Smart Contract     │
│ - Beneficiaries  │      │ - Transactions       │
│ - Grains         │      │ - Immutable Ledger   │
│ - Transactions   │      │                      │
└──────────────────┘      └──────────────────────┘
```

---

## 📥 Installation

### Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **Ganache** v7+ ([Download](https://trufflesuite.com/ganache/))
- **Firebase Account** ([Sign up](https://firebase.google.com/))
- **Git** ([Download](https://git-scm.com/))

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/justration.git
cd justration/Backend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Setup Firebase

1. Create a new Firebase project
2. Enable Firestore Database
3. Download service account key JSON
4. Save as `firebase-key.json` in `Backend/` folder

### Step 4: Setup Ganache

1. Launch Ganache
2. Create a new Ethereum workspace
3. Note the RPC Server URL (default: `http://127.0.0.1:7545`)

### Step 5: Deploy Smart Contract

```bash
truffle migrate --reset
```

Copy the deployed contract address and update `blockchain.js` if needed.

### Step 6: Initialize Database

```bash
node initData.js
```

This creates:
- 4 Central Godowns with initial stock
- 8 State Warehouses
- 16 City Hubs
- 16 Fair Price Shops
- 8 Sample Beneficiaries
- 3 Grain Types (Rice, Wheat, Sugar)

### Step 7: Start Server

```bash
npm start
```

Server runs at **http://localhost:3000**

---

## 🚀 Usage

### 1. Access Login Page

Navigate to: **http://localhost:3000/login**

### 2. Login with Demo Credentials

| Role | User ID | Password | Access Level |
|------|---------|----------|--------------|
| Admin | `admin` | `admin123` | Full Access (All 8 pages) |
| Central Officer | `central001` | `central123` | Full Access (All 8 pages) |
| Warehouse Manager | `warehouse001` | `warehouse123` | 4 pages (Dispatch & Distribution) |
| City Hub Officer | `cityhub001` | `cityhub123` | 3 pages (City→FPS, Distribution, Ledger) |
| FPS Operator | `fps001` | `fps123` | 2 pages (Distribution, Ledger) |

### 3. Navigate System

After login, you'll see:
- **Dashboard** - Overview and statistics (Admin/Central only)
- **Central Stock** - Add stock to godowns (Admin/Central only)
- **Godown→Warehouse** - Transfer to state level (Admin/Central only)
- **Warehouse→City** - Transfer to city hubs (Admin/Central/Warehouse)
- **City→FPS** - Transfer to Fair Price Shops (Admin/Central/Warehouse/CityHub)
- **Distribution** - Beneficiary management & ration distribution (All roles)
- **Ledger** - Complete transaction history (All roles)
- **Administration** - System settings (Admin/Central only)

### 4. Complete Supply Chain Flow

**Example: Wheat Distribution**

1. **Login as Admin** (`admin` / `admin123`)
2. **Add Stock**: Central Stock → Punjab Godown → Add 50,000 Kgs Wheat
3. **Transfer to State**: Godown→Warehouse → Punjab Godown → Punjab State Warehouse → 10,000 Kgs
4. **Transfer to City**: Warehouse→City → Punjab Warehouse → Amritsar City Hub → 5,000 Kgs
5. **Transfer to FPS**: City→FPS → Amritsar Hub → Golden Temple Area FPS → 2,000 Kgs
6. **Distribute to Beneficiary**: Distribution → Select FPS → Select Beneficiary → Distribute 25 Kgs
7. **View Ledger**: All transactions recorded with blockchain hash

---

## 👥 User Roles

### 👑 Admin
- **Permissions**: Complete system control
- **Access**: All 8 pages
- **Use Case**: System administrators, IT staff

### 🏛️ Central Officer
- **Permissions**: Full operational access
- **Access**: All 8 pages
- **Use Case**: Central government PDS officials

### 🏭 Warehouse Manager
- **Permissions**: Dispatch & distribution
- **Access**: 4 pages (Warehouse→City, City→FPS, Distribution, Ledger)
- **Use Case**: State warehouse managers

### 🏙️ City Hub Officer
- **Permissions**: City-level operations
- **Access**: 3 pages (City→FPS, Distribution, Ledger)
- **Use Case**: City distribution center staff

### 🏪 FPS Operator
- **Permissions**: Final distribution only
- **Access**: 2 pages (Distribution, Ledger)
- **Use Case**: Fair Price Shop owners/operators

---

## 🔄 Supply Chain Flow

```
┌─────────────────────────────────────────────────────────┐
│                  PROCUREMENT (Govt)                     │
│          Add stock to Central Godowns                   │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│     STAGE 1: Central Godown → State Warehouse          │
│     • Any godown → Any warehouse                       │
│     • Page: Godown→Warehouse                           │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│     STAGE 2: State Warehouse → City Hub                │
│     • Same state only                                  │
│     • Page: Warehouse→City                             │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│     STAGE 3: City Hub → Fair Price Shop                │
│     • Same city only                                   │
│     • Page: City→FPS                                   │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│     STAGE 4: FPS → Beneficiary                         │
│     • Based on entitlement                             │
│     • Page: Distribution                               │
└─────────────────────────────────────────────────────────┘
```

**Hierarchy Rules:**
- ✅ Godown can transfer to **ANY** warehouse
- ✅ Warehouse can transfer **ONLY** to city hubs in the **SAME STATE**
- ✅ City Hub can transfer **ONLY** to FPS in the **SAME CITY**
- ✅ FPS can distribute **ONLY** to registered beneficiaries

---

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### Get All Data
```http
GET /api/db
```
Returns all locations, beneficiaries, grains, and transactions.

#### Add Stock
```http
POST /api/add-stock
Content-Type: application/json

{
  "godownId": "string",
  "grain": "string",
  "quantity": number
}
```

#### Dispatch Stock
```http
POST /api/dispatch
Content-Type: application/json

{
  "fromId": "string",
  "toId": "string",
  "grain": "string",
  "quantity": number
}
```

#### Register Beneficiary
```http
POST /api/add-beneficiary
Content-Type: application/json

{
  "name": "string",
  "rationCardId": "string",
  "fpsId": "string"
}
```

#### Distribute Ration
```http
POST /api/distribute
Content-Type: application/json

{
  "fpsId": "string",
  "beneficiaryId": "string",
  "grain": "string",
  "quantity": number
}
```

#### Manage Grains
```http
POST /api/add-grain
Content-Type: application/json

{
  "grainName": "string"
}
```

```http
POST /api/remove-grain
Content-Type: application/json

{
  "grainName": "string"
}
```

#### Manage Locations
```http
POST /api/add-location
Content-Type: application/json

{
  "locId": "string",
  "name": "string",
  "type": "string",
  "state": "string",
  "city": "string",
  "demand": object
}
```

```http
POST /api/delete-location
Content-Type: application/json

{
  "locId": "string"
}
```

---

## 📂 Project Structure

```
justration/
├── Backend/
│   ├── contracts/                 # Smart contracts
│   │   └── RationSupplyChain.sol
│   ├── migrations/                # Truffle migrations
│   │   └── 1_deploy_contracts.js
│   ├── public/                    # Static files
│   │   └── script.js              # Client-side API calls
│   ├── views/                     # EJS templates
│   │   ├── index.ejs              # Main application
│   │   ├── login.ejs              # Login page
│   │   └── test.ejs               # Testing page
│   ├── blockchain.js              # Web3 blockchain service
│   ├── firebase.js                # Firebase configuration
│   ├── server.js                  # Express server
│   ├── initData.js                # Database initialization
│   ├── firebase-key.json          # Firebase credentials (gitignored)
│   ├── truffle-config.js          # Truffle configuration
│   ├── package.json               # Dependencies
│   ├── ARCHITECTURE.md            # Architecture documentation
│   ├── LOGIN_GUIDE.md             # Login system guide
│   └── SUPPLY_CHAIN_GUIDE.md      # Supply chain flow guide
└── README.md                      # This file
```

---

## 🔐 Security Notes

⚠️ **Important**: This is a demonstration/educational project with the following security considerations:

1. **Authentication**: Currently frontend-only with localStorage. For production, implement:
   - Server-side session management
   - JWT tokens
   - Password hashing (bcrypt)
   - HTTPS only

2. **Firebase**: Service account key (`firebase-key.json`) should be:
   - Never committed to git (add to `.gitignore`)
   - Stored as environment variable in production
   - Rotated regularly

3. **Blockchain**: Ganache is for development only. For production:
   - Use Ethereum testnet (Goerli, Sepolia)
   - Or private consortium blockchain
   - Implement proper gas management

4. **Input Validation**: Add server-side validation for all API inputs

---

## 🧪 Testing

### Manual Testing

Use the test page: **http://localhost:3000/test**

Features:
- ✅ One-click login for all user roles
- ✅ API connection testing
- ✅ Session management
- ✅ Error debugging

### Test Scenarios

**Scenario 1: Admin Full Flow**
1. Login as Admin
2. Add 100,000 Kgs Rice to Punjab Godown
3. Transfer 20,000 Kgs to Punjab Warehouse
4. Transfer 10,000 Kgs to Amritsar City Hub
5. Transfer 5,000 Kgs to Golden Temple FPS
6. Distribute 50 Kgs to beneficiary
7. Verify in Ledger

**Scenario 2: FPS Operator Limited Access**
1. Login as FPS Operator
2. Verify only 2 pages visible (Distribution, Ledger)
3. Register new beneficiary
4. Distribute rations
5. View transaction history

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Firebase** - Real-time database
- **Truffle Suite** - Blockchain development tools
- **Ganache** - Local Ethereum blockchain
- **Tailwind CSS** - UI framework
- **Chart.js** - Data visualization

---

## 📞 Support

For issues, questions, or suggestions:
- 📧 Email: support@justration.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/justration/issues)
- 📖 Docs: See `/Backend/*.md` files

---

## 🗺️ Roadmap

- [ ] Production authentication with JWT
- [ ] Mobile application (React Native)
- [ ] SMS notifications for beneficiaries
- [ ] QR code-based ration distribution
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (Hindi, Telugu, Tamil, etc.)
- [ ] Offline mode with sync
- [ ] Export reports (PDF/Excel)
- [ ] Integration with Aadhaar API
- [ ] Deployment to Ethereum testnet

---

**Made with ❤️ for India's Public Distribution System**

🌾 **JustRation** - Transparent. Secure. Efficient.
