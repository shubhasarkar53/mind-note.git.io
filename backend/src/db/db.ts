import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectDb() {
    try {
        return await mongoose.connect(process.env.MONGODB_URI as string);
    } catch (error) {
        console.error('Failed to connect to the database', error);
        process.exit(1);
    }
}