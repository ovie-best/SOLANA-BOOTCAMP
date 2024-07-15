import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import { Connection } from "@solana/web3.js";

const dotenv = require("dotenv/config");
const solHelper = require("@solana-developers/helpers");
const splToken = require("@solana/spl-token");

const connection = new Connection(clusterApiUrl("devnet"));
const sender = solHelper.getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `🔑 Loaded our keypair securely, using an env file! Our public key is: ${sender.publicKey.toBase58()}`
);

const recipient = new PublicKey("GkBZU1rshgZSUeUNbxfsXA1wLAtqxaLHDyrJiDgzNDUq");

const tokenMintAccount = new PublicKey(
  "GsGaM2HuecahRYtTpKAgiJdkCBe7L211swUXNGqsARdx"
);

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);
console.log(
  `💸 Attempting to send 27 ODST tokens to ${recipient.toBase58()}...`
);

const sourceTokenAccount = await splToken.getOrCreateAssociatedTokenAccount(
  connection,
  sender,
  tokenMintAccount,
  sender.publicKey
);

const destinationTokenAccount =
  await splToken.getOrCreateAssociatedTokenAccount(
    connection,
    recipient,
    tokenMintAccount,
    recipient
  );

const signature = await splToken.transfer(
  connection,
  sender,
  sourceTokenAccount.address,
  destinationTokenAccount.address,
  sender,
  27 * MINOR_UNITS_PER_MAJOR_UNITS
);

const explorerLink = solHelper.getExplorerLink(
  "transaction",
  signature,
  "devnet"
);
console.log(`✅ Transaction confirmed, explorer link is: ${explorerLink}!`);
//  https://explorer.solana.com/tx/rfG2hGVprBr4SXJjmhTct2xbWC4hQLSn5gJ6p6qZzj22KJsptpX7BjxrsXeFXXDDnV7a13DVTQNfqKGba1AupGF?cluster=devnet!
