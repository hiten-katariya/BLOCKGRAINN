const { Web3 } = require('web3');
const fs = require('fs');
const path = require('path');

class BlockchainService {
  constructor() {
    // Connect to Ganache
    this.web3 = new Web3('http://127.0.0.1:7545');
    this.account = null;
    this.contract = null;
    this.contractAddress = null;
  }

  async initialize() {
    try {
      // Get accounts from Ganache
      const accounts = await this.web3.eth.getAccounts();
      this.account = accounts[0];
      console.log('✅ Connected to Ganache');
      console.log('📍 Using account:', this.account);

      // Load contract ABI and address
      const contractPath = path.join(__dirname, 'build/contracts/RationSupplyChain.json');
      
      if (fs.existsSync(contractPath)) {
        const contractJSON = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
        const networkId = await this.web3.eth.net.getId();
        
        if (contractJSON.networks[networkId]) {
          this.contractAddress = contractJSON.networks[networkId].address;
          this.contract = new this.web3.eth.Contract(
            contractJSON.abi,
            this.contractAddress
          );
          console.log('✅ Smart Contract loaded at:', this.contractAddress);
        } else {
          console.warn('⚠️ Contract not deployed. Run: truffle migrate --network development');
        }
      } else {
        console.warn('⚠️ Contract artifact not found. Run: truffle migrate --network development');
      }

      return true;
    } catch (error) {
      console.error('❌ Blockchain initialization failed:', error.message);
      return false;
    }
  }

  async recordTransaction(from, to, grain, quantity, txType) {
    if (!this.contract) {
      console.warn('⚠️ Contract not initialized, skipping blockchain record');
      return null;
    }

    try {
      const timestamp = new Date().toLocaleString();
      
      const receipt = await this.contract.methods
        .recordTransaction(timestamp, from, to, grain, quantity, txType)
        .send({ 
          from: this.account,
          gas: 500000
        });

      console.log('✅ Transaction recorded on blockchain');
      console.log('📦 Block number:', receipt.blockNumber);
      console.log('🔗 Transaction hash:', receipt.transactionHash);

      return receipt.transactionHash;
    } catch (error) {
      console.error('❌ Blockchain transaction failed:', error.message);
      return null;
    }
  }

  async getTransactionCount() {
    if (!this.contract) return 0;
    
    try {
      const count = await this.contract.methods.getTransactionCount().call();
      return parseInt(count);
    } catch (error) {
      console.error('❌ Failed to get transaction count:', error.message);
      return 0;
    }
  }

  async getTransaction(index) {
    if (!this.contract) return null;
    
    try {
      const tx = await this.contract.methods.getTransaction(index).call();
      return {
        hash: tx.txHash,
        timestamp: tx.timestamp,
        from: tx.from,
        to: tx.to,
        grain: tx.grain,
        quantity: tx.quantity,
        type: tx.txType
      };
    } catch (error) {
      console.error('❌ Failed to get transaction:', error.message);
      return null;
    }
  }

  isConnected() {
    return this.contract !== null;
  }
}

module.exports = new BlockchainService();
