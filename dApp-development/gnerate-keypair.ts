const solanaWeb3 = require("@solana/web3.js");
import base58 from "bs58";

const keypair = solanaWeb3.Keypair.generate();
const publicKey = keypair.publicKey.toBase58();
const secretKey = base58.encode(keypair.secretKey);

console.log(`The public key is ${publicKey} `);
console.log(`The secret key is ${secretKey} `);

/// Generated PublicKey: 2F6XaDTAw2AhKZqFkF2m5Fwf2kYiybVRRTjCyU2jWCiz
