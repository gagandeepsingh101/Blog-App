import { config } from "dotenv";
import app from "./app.js";
import { connectDB } from "./db/connectDB.db.js";
config();
connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})