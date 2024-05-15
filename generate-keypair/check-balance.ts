import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const publicKey = new PublicKey("EwaWvYHKfKuD8RFbf6P1vXeB8JP7ZoohNSRpvDkgX6dH");
// const connection = new Connection(clusterApiUrl("devnet"));

const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
  `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSol} SOL`
);
