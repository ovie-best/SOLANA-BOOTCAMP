import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];

if (!suppliedPublicKey) {
  throw new Error("Pls Provide a public key to check your balance 💰");
}

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const publicKey = new PublicKey(suppliedPublicKey);
const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
  `✅ Finished! The balance of the wallet at address ${publicKey} is ${balanceInSol} SOL`
);
