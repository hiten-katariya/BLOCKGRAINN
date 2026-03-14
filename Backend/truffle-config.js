module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Ganache default host
      port: 7545,             // Ganache default port
      network_id: "*",        // Match any network id
      gas: 6721975,          // Ganache default gas limit
      gasPrice: 20000000000
    }
  },
  
  compilers: {
    solc: {
      version: "0.8.0",       // Match your contract version
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
