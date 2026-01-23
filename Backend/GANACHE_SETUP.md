# 🔗 Ganache Blockchain Setup Guide

## Prerequisites
- ✅ Node.js installed
- ✅ Ganache installed (download from https://trufflesuite.com/ganache/)
- ✅ Truffle framework

## Step-by-Step Setup

### **Step 1: Install Ganache**
1. Download Ganache from: https://trufflesuite.com/ganache/
2. Install the application
3. Open Ganache
4. Click "**Quickstart**" to create a new workspace
5. Note the **RPC Server** (default: `http://127.0.0.1:7545`)

### **Step 2: Install Dependencies**
Open PowerShell in the Backend folder and run:
```powershell
cd Backend
npm install
npm install -g truffle
```

### **Step 3: Compile Smart Contract**
```powershell
truffle compile
```

This will:
- Compile `contracts/RationSupplyChain.sol`
- Create artifacts in `build/contracts/`

### **Step 4: Deploy to Ganache**
Make sure Ganache is running, then:
```powershell
truffle migrate --network development
```

Expected output:
```
Compiling your contracts...
===========================
> Compiling ./contracts/RationSupplyChain.sol

   Deploying 'RationSupplyChain'
   -----------------------------
   > transaction hash:    0x...
   > contract address:    0x...
   > block number:        1
   > gas used:            xxxxx
   ✅ Deployment successful!
```

### **Step 5: Start Your Server**
```powershell
npm start
```

Expected console output:
```
✅ Connected to Ganache
📍 Using account: 0x...
✅ Smart Contract loaded at: 0x...
🚀 Server running at http://localhost:3000
🔗 Blockchain status: ✅ Connected
```

## Verification Steps

### **1. Check Ganache Connection**
Open http://localhost:3000/api/health
- Should return: `{"status":"API Running"}`

### **2. Test Blockchain Recording**
1. Go to http://localhost:3000
2. Add stock to a location
3. Check the console for:
   ```
   ✅ Transaction recorded on blockchain
   📦 Block number: X
   🔗 Transaction hash: 0x...
   ```

### **3. View in Ganache**
1. Open Ganache
2. Click "**Transactions**" tab
3. You should see your transactions listed

## File Structure
```
Backend/
├── contracts/
│   └── RationSupplyChain.sol    # Smart contract
├── migrations/
│   └── 1_deploy_contracts.js    # Deployment script
├── build/                        # Compiled contracts (auto-generated)
│   └── contracts/
│       └── RationSupplyChain.json
├── blockchain.js                 # Blockchain service
├── server.js                     # Updated with blockchain
├── truffle-config.js            # Truffle configuration
└── package.json                 # Updated dependencies
```

## How It Works

### Transaction Flow with Blockchain
```
User Action (Add Stock/Dispatch)
    ↓
Backend API receives request
    ↓
Update Firebase (Database)
    ↓
Record on Blockchain (Ganache) ← NEW!
    ↓
Store transaction hash in Firebase
    ↓
Return response with blockchain hash
```

### Example: Adding Stock
1. User adds 100kg of Rice to Central Godown
2. Firebase updates the stock count
3. Smart contract records the transaction on blockchain
4. Transaction hash is returned: `0x1a2b3c4d...`
5. This hash is stored in Firebase for verification

## Blockchain Features

### What Gets Recorded on Blockchain?
- ✅ Transaction timestamp
- ✅ From location
- ✅ To location
- ✅ Grain type
- ✅ Quantity
- ✅ Transaction type (transfer/distribution)
- ✅ Unique hash

### Benefits
- 🔒 **Immutable**: Records cannot be altered
- 📜 **Transparent**: All transactions are traceable
- ✅ **Verifiable**: Anyone can verify transaction authenticity
- 🔐 **Secure**: Cryptographically signed

## API Endpoints Updated

### POST /api/add-stock
**Before:**
```json
{
  "message": "Stock added successfully"
}
```

**After:**
```json
{
  "message": "Stock added successfully",
  "blockchainHash": "0x1a2b3c4d5e6f..."
}
```

### POST /api/dispatch
**Before:**
```json
{
  "message": "Consignment dispatched"
}
```

**After:**
```json
{
  "message": "Consignment dispatched",
  "blockchainHash": "0x7g8h9i0j1k2l..."
}
```

## Troubleshooting

### ❌ "Contract not deployed"
**Solution:**
```powershell
truffle migrate --reset --network development
```

### ❌ "Cannot connect to Ganache"
**Solution:**
1. Make sure Ganache is running
2. Check the RPC Server in Ganache (should be `http://127.0.0.1:7545`)
3. Update `truffle-config.js` if port is different

### ❌ "Blockchain initialization failed"
**Solution:**
1. Restart Ganache
2. Run `truffle migrate --reset`
3. Restart your server: `npm start`

### ⚠️ "Contract not initialized, skipping blockchain record"
**This is OK!** 
- Firebase still works
- Blockchain is optional
- To enable: Deploy the contract with `truffle migrate`

## Testing Commands

### Check if Truffle is installed
```powershell
truffle version
```

### Check Ganache connection
```powershell
truffle console --network development
```
Then inside console:
```javascript
web3.eth.getAccounts()
web3.eth.getBlockNumber()
```

### View deployed contracts
```powershell
truffle networks
```

## Advanced: Viewing Blockchain Data

### Add API endpoint to view blockchain transactions
Add this to `server.js`:

```javascript
app.get("/api/blockchain-stats", async (req, res) => {
  const count = await blockchain.getTransactionCount();
  const transactions = [];
  
  for (let i = 0; i < Math.min(count, 10); i++) {
    const tx = await blockchain.getTransaction(i);
    transactions.push(tx);
  }
  
  res.json({
    totalTransactions: count,
    recentTransactions: transactions
  });
});
```

Then visit: http://localhost:3000/api/blockchain-stats

## Next Steps

1. ✅ Follow setup steps above
2. ✅ Test adding stock and dispatching
3. ✅ Verify transactions in Ganache
4. 🎯 Optional: Add blockchain verification UI
5. 🎯 Optional: Export blockchain data for auditing

## Summary

Your application now has **dual-layer storage**:
- **Firebase**: Fast, real-time database for application data
- **Ganache Blockchain**: Immutable audit trail for transactions

This provides both performance AND transparency! 🎉
