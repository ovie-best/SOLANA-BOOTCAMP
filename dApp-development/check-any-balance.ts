import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}

const connectDevnet = new Connection(
  "https://api.devnet.solana.com",
  "confirmed"
);

const publicKey = new PublicKey(suppliedPublicKey);
const validPublicKey = PublicKey.isOnCurve(suppliedPublicKey);
const balanceInLamports = await connectDevnet.getBalance(publicKey);
const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

if (validPublicKey !== true) {
  throw new Error("You entered  an Invalid Wallet Address");
} else
  console.log(
    `✅ The balance for the wallet address ${publicKey} is ${balanceInSol} SOL`
  );
