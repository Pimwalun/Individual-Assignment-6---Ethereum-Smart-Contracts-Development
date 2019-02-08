// *******clip3***********
var Tx = require("ethereumjs-tx");
const Web3 = require("web3");
const web3 = new Web3(
  "https://ropsten.infura.io/v3/33bb9f9e382842faae1ecc237099d8b0"
);

const account1 = "0x6dAE991739e5Cec487AbE49C89D937304d0c73eD";
const account2 = "0x92EB83f32a8110cf7000011e1262E691fa802c69";

// console.log(web3.eth.accounts.create())

// console.log(process.env.PRIVATE_KEY_1)

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex');
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex');

web3.eth.getBalance(account1, (err, bal) => {
  console.log("account 1 balance: ", web3.utils.fromWei(bal, "ether"));
})

web3.eth.getBalance(account2, (err, bal) => {
  console.log("account 2 balance: ", web3.utils.fromWei(bal, "ether"));
})


web3.eth.getTransactionCount(account1, (err, txCount) => {
  // Build the transaction
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: account2,
    value: web3.utils.toHex(web3.utils.toHex("1", "ether")),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei"))
  }

  // console.log(txObject)

// Sign the transaction
  const tx = new Tx(txObject)
  tx.sign(privateKey1)

  const serializedTransaction = tx.serialize()
  const raw = "0x" + serializedTransaction.toString("hex")
//
//   // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("err",err,"txHash: ", txHash)
  })
})