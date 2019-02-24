require('dotenv').config();

const HDWalletProvider = require('truffle-hdwallet-provider');
const rinkebyUri = 'https://rinkeby.infura.io/v3/' + process.env.APIKEY;

module.exports = {
  contracts_build_directory: "./src/build/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          rinkebyUri
        );
      },
      network_id: 4
    }
  }
};