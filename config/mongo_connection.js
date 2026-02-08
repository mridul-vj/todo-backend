import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/todo_app";

mongoose.connect(MONGO_URL).then(() => {
    console.log("MongoDB Connected Successfully!");
}).catch((err) => {
    console.log("MongoDB Connection Failed!", err);
});

export default mongoose.connection;