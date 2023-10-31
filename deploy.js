const ethers = require("ethers");
const fs = require("fs-extra");
async function main() {
  let provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");

  const wallet = new ethers.Wallet(
    "0x91ee00225ac6c137ad02d95e8f86a3556df646a5992e96f8c5f8f2b71f73587c",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const bin = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf-8");

  const deployContract = new ethers.ContractFactory(abi, bin, wallet);
  console.log("contract is deploying, please wait you moron.....");
  const contract = await deployContract.deploy();
  await contract.deploymentTransaction.wait(1);

  const currentFavoriteNumber = await contract.retrieve();
  console.log(
    `current favorite number is : ${currentFavoriteNumber.toString()}`
  );
  const trasactionResponse = await contract.store("10");
  const trasactionReceipt = await trasactionResponse.wait(1);
  const newFavoriteNumber = await contract.retrieve();
  console.log(
    `new and updated favorite number is : ${newFavoriteNumber.toString()}`
  );
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
