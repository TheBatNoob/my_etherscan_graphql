const { RESTDataSource } = require("apollo-datasource-rest"); // Importing RESTDataSource from apollo-datasource-rest module

// Vitalik's Ethereum Address
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"; // Storing Vitalik's Ethereum address

// Etherscan Data Source Class
class EtherDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.etherscan.io/api"; // Setting base URL for Etherscan API
  }

  async etherBalanceByAddress() {
    return this.get(
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    ); // Fetching ether balance by address from Etherscan API
  }

  async totalSupplyOfEther() {
    return this.get(
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
    ); // Fetching total supply of ether from Etherscan API
  }

  // New API Endpoints - Fetching latest Ethereum price and block confirmation time

  async getLatestEthereumPrice() {
    return this.get(
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
    ); // Fetching latest Ethereum price from Etherscan API
  }

  async getBlockConfirmationTime() {
    return this.get(
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    ); // Fetching block confirmation time from Etherscan API
  }
}

module.exports = EtherDataSource; // Exporting EtherDataSource module
