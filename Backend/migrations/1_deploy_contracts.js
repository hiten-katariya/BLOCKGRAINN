const RationSupplyChain = artifacts.require("RationSupplyChain");

module.exports = function(deployer) {
  deployer.deploy(RationSupplyChain);
};
