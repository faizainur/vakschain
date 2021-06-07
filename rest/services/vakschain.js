"use strict";

const { Gateway, Wallets, Wallet } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");
const path = require("path");
const {
  buildCAClient,
  registerAndEnrollUser,
  enrollAdmin,
} = require("../../test-application/javascript/CAUtil.js");
const {
  buildCCPOrg1,
  buildWallet,
} = require("../../test-application/javascript/AppUtil.js");
const { resolve } = require("path");

const channelName = "default";
const chaincodeName = "vakschain";
const mspOrg1 = "Org1MSP";
const walletPath = path.join(__dirname, "..", "..", "wallet");
const org1UserId = "vakschainUser";

var ccp;
var caClient;
var wallet;

exports.initCc = async () => {
  try {
    ccp = buildCCPOrg1();
    caClient = buildCAClient(FabricCAServices, ccp, "ca.org1.example.com");
    wallet = await buildWallet(Wallets, walletPath);

    await enrollAdmin(caClient, wallet, mspOrg1);
    await registerAndEnrollUser(
      caClient,
      wallet,
      mspOrg1,
      org1UserId,
      "org1.department1"
    );
  } catch (error) {
    console.error(`ERROR vakschain chaincode initialization : ${error}`);
  }
};

exports.getAllAssets = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const gateway = new Gateway();

      try {
        await gateway.connect(ccp, {
          wallet,
          identity: org1UserId,
          discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
        });

        // Build a network instance based on the channel where the smart contract is deployed
        const network = await gateway.getNetwork(channelName);

        // Get the contract from the network.
        const contract = network.getContract(chaincodeName);

        // console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
        var result = await contract.evaluateTransaction("GetAllAssets");
        // console.log(`*** Result: ${prettyJSONString(result3.toString())}`);

        if (result.length > 0) {
          resolve(JSON.parse(result));
        } else {
          resolve("[]");
        }
      } finally {
        gateway.disconnect();
      }
    } catch (error) {
      console.error(`ERROR vakschain chaincode getAllAssets : ${error}`);
      reject(error);
    }
  });
};

exports.createAsset = async (record) => {
  return new Promise(async (resolve, reject) => {
    try {
      const gateway = new Gateway();

      try {
        await gateway.connect(ccp, {
          wallet,
          identity: org1UserId,
          discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
        });

        // Build a network instance based on the channel where the smart contract is deployed
        const network = await gateway.getNetwork(channelName);

        // Get the contract from the network.
        const contract = network.getContract(chaincodeName);

        // console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
        var result = await contract.submitTransaction(
          "CreateAsset",
          record.nik,
          record.date,
          record.gender,
          record.age,
          record.location,
          record.healthRecord,
          record.status
        );
        // console.log(`*** Result: ${prettyJSONString(result3.toString())}`);

        resolve(result);
      } finally {
        gateway.disconnect();
      }
    } catch (error) {
      console.error(`ERROR vakschain chaincode createAsset : ${error}`);
      reject(error.message);
    }
  });
};

exports.updateAsset = async (record) => {
  return new Promise(async (resolve, reject) => {
    try {
      const gateway = new Gateway();

      try {
        await gateway.connect(ccp, {
          wallet,
          identity: org1UserId,
          discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
        });

        // Build a network instance based on the channel where the smart contract is deployed
        const network = await gateway.getNetwork(channelName);

        // Get the contract from the network.
        const contract = network.getContract(chaincodeName);

        // console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
        var result = await contract.submitTransaction(
          "UpdateAsset",
          record.nik,
          record.date,
          record.gender,
          record.age,
          record.location,
          record.healthRecord,
          record.status
        );
        // console.log(`*** Result: ${prettyJSONString(result3.toString())}`);

        resolve(result);
      } finally {
        gateway.disconnect();
      }
    } catch (error) {
      console.error(`ERROR vakschain chaincode createAsset : ${error}`);
      reject(error.message);
    }
  });
};

exports.readAsset = (nik) => {
  return new Promise(async (resolve, reject) => {
    try {
      const gateway = new Gateway();

      try {
        await gateway.connect(ccp, {
          wallet,
          identity: org1UserId,
          discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
        });

        // Build a network instance based on the channel where the smart contract is deployed
        const network = await gateway.getNetwork(channelName);

        // Get the contract from the network.
        const contract = network.getContract(chaincodeName);

        var result = await contract.evaluateTransaction("ReadAsset", nik);
        resolve(JSON.parse(result));
      } finally {
        gateway.disconnect();
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.deleteAsset = (nik) => {
  return new Promise(async (resolve, reject) => {
    try {
      const gateway = new Gateway();

      try {
        await gateway.connect(ccp, {
          wallet,
          identity: org1UserId,
          discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
        });

        // Build a network instance based on the channel where the smart contract is deployed
        const network = await gateway.getNetwork(channelName);

        // Get the contract from the network.
        const contract = network.getContract(chaincodeName);

        // console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
        var result = await contract.submitTransaction("DeleteAsset", nik);
        // console.log(`*** Result: ${prettyJSONString(result3.toString())}`);

        resolve(result);
      } finally {
        gateway.disconnect();
      }
    } catch (error) {
      console.error(`ERROR imblock chaincode deleteAsset : ${error}`);
      reject(error.message);
    }
  });
};

exports.isExist = (nik) => {
  return new Promise(async (resolve, reject) => {
    try {
      const gateway = new Gateway();

      try {
        await gateway.connect(ccp, {
          wallet,
          identity: org1UserId,
          discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
        });

        // Build a network instance based on the channel where the smart contract is deployed
        const network = await gateway.getNetwork(channelName);

        // Get the contract from the network.
        const contract = network.getContract(chaincodeName);

        // console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
        var result = await contract.submitTransaction("AssetExists", nik);
        // console.log(`*** Result: ${prettyJSONString(result3.toString())}`);

        resolve(result);
      } finally {
        gateway.disconnect();
      }
    } catch (error) {
      console.error(`ERROR upcc chaincode assetExist : ${error}`);
      reject(error.message);
    }
  });
};
