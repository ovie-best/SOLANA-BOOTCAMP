import { createMint } from "@solana/spl-token";
const dotenv = require("dotenv/config");
const solHelper = require("@solana-developers/helpers");
// import {
//   getKeypairFromEnvironment,
//   getExplorerLink,
// } from "@solana-developers/helpers";

import { Connection, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const user = solHelper.getKeypairFromEnvironment("SECRET_KEY");
console.log(
  `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);
//////////// Generated PublicKey: 2F6XaDTAw2AhKZqFkF2m5Fwf2kYiybVRRTjCyU2jWCiz

// This is a shortcut that runs:
// SystemProgram.createAccount
// token.createInitializeMintInstruction
const tokenMint = await createMint(connection, user, user.publicKey, null, 2);
const link = solHelper.getExplorerLink(
  "address",
  tokenMint.toString(),
  "devnet"
);

console.log(`✅ Finished! Created token mint: ${link}`);
///// Generated Link: https://explorer.solana.com/address/GsGaM2HuecahRYtTpKAgiJdkCBe7L211swUXNGqsARdx?cluster=devnet
///// TokenMint Address: GsGaM2HuecahRYtTpKAgiJdkCBe7L211swUXNGqsARdx
