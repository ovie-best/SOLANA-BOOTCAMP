import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { clusterApiUrl } from "@solana/web3.js";
import { Connection, PublicKey } from "@solana/web3.js";

const solHelper = require("@solana-developers/helpers");
const dotenv = require("dotenv/config");

const connection = new Connection(clusterApiUrl("devnet"));
const user = solHelper.getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);

const tokenMintAccount = new PublicKey(
  "GsGaM2HuecahRYtTpKAgiJdkCBe7L211swUXNGqsARdx"
);

// Here we are making an associated token account for our own address, but we can
// make an ATA on any other wallet in devnet!
// const recipient = new PublicKey("SOMEONE_ELSES_DEVNET_ADDRESS");
const recipient = user.publicKey;

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAccount,
  recipient
);

console.log(`Token Account: ${tokenAccount.address.toBase58()}`);
// Token Account: J7BMncPLRjznqPScqpvmo9Dx58GtHWvQYJrK57RA6KxM

const link = solHelper.getExplorerLink(
  "address",
  tokenAccount.address.toBase58(),
  "devnet"
);

console.log(`✅ Created token Account: ${link}`);
// https://explorer.solana.com/address/J7BMncPLRjznqPScqpvmo9Dx58GtHWvQYJrK57RA6KxM?cluster=devnet
