import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const publicKey = new PublicKey("2F6XaDTAw2AhKZqFkF2m5Fwf2kYiybVRRTjCyU2jWCiz");

const connectDevnet = new Connection(
  "https://api.devnet.solana.com",
  "confirmed"
);

const balanceInLamports = await connectDevnet.getBalance(publicKey);
const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

console.log(`
    💰 Finished! The balance for the wallet address ${publicKey} is ${balanceInSol} SOL
    `);
