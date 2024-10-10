import { Connection, Keypair, Transaction, SystemProgram, PublicKey } from '@solana/web3.js';

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

const senderSecretKey = new Uint8Array([49, 156, 233, 145, 134, 117, 107, 38, 240, 253, 72, 72, 104, 219, 149, 174, 254, 207, 155, 129, 174, 72, 32, 192, 29, 172, 222, 4, 232, 24, 56, 125, 89, 125, 80, 70, 36, 172, 77, 8, 14, 229, 48, 109, 132, 108, 21, 137, 208, 118, 66, 194, 238, 141, 164, 118, 252, 99, 185, 237, 144, 159, 108, 16]);

const senderKeypair = Keypair.fromSecretKey(senderSecretKey);

const recipientPublicKey = new PublicKey("CBsBwZPu3dj7eMFToeAnkmori6f5TVQtc9aaNDkRLF2Q");

const transaction = new Transaction().add(
    SystemProgram.transfer({
        fromPubkey: senderKeypair.publicKey,
        toPubkey: recipientPublicKey,
        lamports: 1000000000, // Amount to send (1 billion lamports)
    })
);

async function sendTransaction() {
    try {
        console.log("Connecting to Solana...");
        const { blockhash } = await connection.getLatestBlockhash(); // Use getLatestBlockhash

        transaction.recentBlockhash = blockhash;
        transaction.feePayer = senderKeypair.publicKey;

        await transaction.sign(senderKeypair);

        const signature = await connection.sendTransaction(transaction, [senderKeypair]);
        console.log('Transaction signature:', signature);

        const confirmation = await connection.confirmTransaction(signature);
        if (confirmation.value.err) {
            console.error('Transaction confirmation failed:', confirmation.value.err);
        } else {
            console.log("Transaction Confirmed:", signature);
        }
    } catch (error) {
        console.error('Transaction failed:', error);
    }
}

sendTransaction();
