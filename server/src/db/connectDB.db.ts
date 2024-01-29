import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

export const connectDB = async (): Promise<void> => {
    try {
        const connectionString: string | undefined = process.env.MONGODB_URL;

        if (!connectionString) {
            console.log("No connection string specified");
            return;
        }

        const connectInstance = await mongoose.connect(connectionString + "/" + DB_NAME);

        console.log("Connected to Mongo database");
    } catch (error: any) {
        const errorMessage = error.message;
        console.error("Error connecting to MongoDB:", errorMessage);
    }
};
