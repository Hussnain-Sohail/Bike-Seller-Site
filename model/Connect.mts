import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
async function Connect(): Promise<void> {
    try {
        const URL = process.env.MONGODB_URI;
        if (!URL) {
            console.log('Not connected to mogno');
            return;
        }
        mongoose.connect(URL);
        console.log('Connected to mogno');
    }
    catch (error) {
        console.error(error);
    }
}

export default Connect;