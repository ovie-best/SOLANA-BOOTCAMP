// READING DATA FROM THE SOLOANA BLOCKCHAIN

import {
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

// connecting to the DEVNET cluster Network
const connection = new Connection(clusterApiUrl("devnet"));

//Reading from the network
const address = new PublicKey("CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN");
const balance = await connection.getBalance(address);
const balanceInSol = balance / LAMPORTS_PER_SOL;

console.log(`The balance of the account at ${address} is ${balance}`);
// console.log(connection);
console.log(`✅ connected`);

console.log(`The balance of the account at ${address} is ${balanceInSol} SOL`);
console.log(`✅ Finished!`);
