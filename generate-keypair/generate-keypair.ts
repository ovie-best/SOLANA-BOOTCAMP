import { Keypair, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import base58 from "bs58";
// import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const dotenv = require("dotenv/config");
// TASK 1
// const keypair = Keypair.generate();
// const SecretKey = base58.encode(keypair.secretKey);
// // const SecretKey = keypair.secretKey

// console.log(`The public key is: `, keypair.publicKey.toBase58());
// console.log(`The secret key is: `, SecretKey);

getKeypairFromEnvironment("SECRET_KEY");
console.log(
  `✅ Finished! We've loaded our secret key securely, using an env file!`
);
