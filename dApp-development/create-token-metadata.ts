// import {
//   getExplorerLink,
//   getKeypairFromEnvironment,
// } from "@solana-developers/helpers";
import { clusterApiUrl, PublicKey, Transaction } from "@solana/web3.js";
import { Connection } from "@solana/web3.js";
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";
import { sendAndConfirmTransaction } from "@solana/web3.js";

const dotenv = require("dotenv/config");
const solHelper = require("@solana-developers/helpers");
// const solanaWeb3 = require("@solana/web3.js");
// const mplTokenmetadata = require("@metaplex-foundation/mpl-token-metadata");

const user = solHelper.getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"));

console.log(
  `🔑 We've loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

const tokenMintAccount = new PublicKey(
  "GsGaM2HuecahRYtTpKAgiJdkCBe7L211swUXNGqsARdx"
);

const metadataData = {
  name: "OvieDev Solana Bootcamp Token",
  symbol: "ODSBT",
  uri: "https://arweave.net/1234",
  sellerFeeBasisPoints: 0,
  creators: null,
  collection: null,
  uses: null,
};

const metadataPDAAndBump = PublicKey.findProgramAddressSync(
  [
    Buffer.from("metadata"),
    TOKEN_METADATA_PROGRAM_ID.toBuffer(),
    tokenMintAccount.toBuffer(),
  ],
  TOKEN_METADATA_PROGRAM_ID
);

const metadataPDA = metadataPDAAndBump[0];

const transaction = new Transaction();
const createMetadataAccountInstruction =
  createCreateMetadataAccountV3Instruction(
    {
      metadata: metadataPDA,
      mint: tokenMintAccount,
      mintAuthority: user.publicKey,
      payer: user.publicKey,
      updateAuthority: user.publicKey,
    },
    {
      createMetadataAccountArgsV3: {
        collectionDetails: null,
        data: metadataData,
        isMutable: true,
      },
    }
  );

transaction.add(createMetadataAccountInstruction);

const transactionSignature = await sendAndConfirmTransaction(
  connection,
  transaction,
  [user]
);

const transactionLink = solHelper.getExplorerLink(
  "transaction",
  transactionSignature,
  "devnet"
);

console.log(`✅ Transaction confirmed, explorer link is: ${transactionLink}!`);
// https://explorer.solana.com/tx/2ji3SNRcWcoTzwgHpuuU5u7RixPYuWB3m2sWbFVqjYQcXQYrFFa57NBvGNYJMLNNojn5PxMBocoimLXMVYoLAgLj?cluster=devnet!

const tokenMintLink = solHelper.getExplorerLink(
  "address",
  tokenMintAccount.toString(),
  "devnet"
);

console.log(`✅ Look at the token mint again: ${tokenMintLink}!`);
// https://explorer.solana.com/address/GsGaM2HuecahRYtTpKAgiJdkCBe7L211swUXNGqsARdx?cluster=devnet!
