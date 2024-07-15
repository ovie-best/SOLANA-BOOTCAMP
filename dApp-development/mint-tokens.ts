import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import { Connection } from "@solana/web3.js";
const splToken = require("@solana/spl-token");
const solHelper = require("@solana-developers/helpers");
const dotenv = require("dotenv/config");

const connection = new Connection(clusterApiUrl("devnet"));

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const user = solHelper.getKeypairFromEnvironment("SECRET_KEY");
const tokenMintAccount = new PublicKey(
  "GsGaM2HuecahRYtTpKAgiJdkCBe7L211swUXNGqsARdx"
);
const receipientAssociatedTokenAccount = new PublicKey(
  "J7BMncPLRjznqPScqpvmo9Dx58GtHWvQYJrK57RA6KxM"
);

const transactionSignature = await splToken.mintTo(
  connection,
  user,
  tokenMintAccount,
  receipientAssociatedTokenAccount,
  user,
  10 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = solHelper.getExplorerLink(
  "transaction",
  transactionSignature,
  "devnet"
);
console.log(`✅ Success! Mint Token Transaction: ${link}`);
// https://explorer.solana.com/tx/3xaJ1LpSRyCedNkVwVZy1FaWAL7xeWnaBM2Wffvx7ph9RzGRM4LEGzjjj2bimCWiqbwCL8G88PV7RLheeAgTzBJY?cluster=devnet
