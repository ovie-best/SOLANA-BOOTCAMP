const dotevn = require("dotenv/config");
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const keypair = getKeypairFromEnvironment("SECRET_KEY");
const publicKey = keypair.publicKey;

console.log(
  `✅ Finished! We've loaded our secret key securely, using an env file! \n
   PublicKey: ${publicKey}`
);
