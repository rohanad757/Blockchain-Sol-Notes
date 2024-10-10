import { PublicKey, Keypair } from '@solana/web3.js';

// Convert the string to a PublicKey object
// const publicKeyObject = new PublicKey("GokppTzVZi2LT1MSTWoEprM4YLDPy7wQ478Rm3r77yEw");

// console.log(publicKeyObject);

// _____________________________________________________________________________________________________
const keypair = Keypair.generate();
console.log("Public Key:", keypair.publicKey.toBase58());