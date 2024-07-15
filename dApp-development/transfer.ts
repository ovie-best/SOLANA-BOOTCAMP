// import {
//   airdropIfRequired,
//   getKeypairFromEnvironment,
// } from "@solana-developers/helpers";
import { LAMPORTS_PER_SOL, sendAndConfirmTransaction } from "@solana/web3.js";
// import {
//   Connection,
//   LAMPORTS_PER_SOL,
//   PublicKey,
//   SystemProgram,
//   Transaction,
// } from "@solana/web3.js";
const solHelper = require("@solana-developers/helpers");
const solanaWeb3 = require("@solana/web3.js");
const dotenv = require("dotenv/config");

const receiverPublicKey = process.argv[2] || null;

if (!receiverPublicKey) {
  console.log(`Please provide a public key to send to`);
  process.exit(1);
}

const senderKeypair = solHelper.getKeypairFromEnvironment("SECRET_KEY");
console.log(`Receiver PublicKey: ${receiverPublicKey}`);

const toPubkey = new solanaWeb3.PublicKey(receiverPublicKey);
const connectDevnet = new solanaWeb3.Connection(
  "https://api.devnet.solana.com",
  "confirmed"
);

console.log(
  `✅ Loaded our own keypair, the destination public key, and connected to Solana`
);

const transaction = new solanaWeb3.Transaction();

// const LAMPORTS_TO_SEND = solanaWeb3.LAMPORTS_PER_SOL * 2; // try to send 2 sol with original keypair
const LAMPORTS_TO_SEND = 5000; // testing an empty account and airdroping if required

const transferSol = solanaWeb3.SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey,
  lamports: LAMPORTS_TO_SEND,
});

await solHelper.airdropIfRequired(
  connectDevnet,
  senderKeypair.publicKey,
  1 * LAMPORTS_PER_SOL,
  0.5 * LAMPORTS_PER_SOL
);

transaction.add(transferSol);

const signature = await sendAndConfirmTransaction(connectDevnet, transaction, [
  senderKeypair,
]);

console.log(`
    💸 Finished! Sent ${
      LAMPORTS_TO_SEND / LAMPORTS_PER_SOL
    } SOL to the address ${toPubkey}
    `);
console.log(`Transaction signature is ${signature}!`);

// CHALLENGE ANSWERS

// 1. The transfer took 0.000005 SOL (5000 lamports) and it is equivalent to 0.000763 USD (NGN 1.24)
// at this time of checking 1SOL = $152.55 and $1 = NGN1619.84

// 2. Yes
