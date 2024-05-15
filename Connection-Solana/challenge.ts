// Challenge
// Modify the script as follows:

// Add instructions to handle invalid wallet addresses.
// Modify the script to connect to mainNet and look up some famous Solana wallets. Try toly.sol, shaq.sol or mccann.sol.

import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];

if (!suppliedPublicKey) {
  throw new Error(
    "Please provide a public key to check your wallet adress balance 💰"
  );
}

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

/////// connecting to mainNet
// const connection = new Connection(
//   "https://api.mainnet-beta.solana.com",
//   "confirmed"
// );

const publicKey = new PublicKey(suppliedPublicKey);
const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

/////// Instructions to handle invalid wallet addresses.
function handleInvalidAddress() {
  if (!PublicKey.isOnCurve(publicKey)) {
    console.log("⚡INVALID WALLET ADDRESS");
  } else {
    console.log(
      `✅Sucessful! 🎇:: The balance of your wallet address ${publicKey} is ◎ ${balanceInSol}`
    );
  }
}

handleInvalidAddress();
