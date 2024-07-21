import express, { json } from "express";
import cors from "cors";
import { connectToMongoDb } from "./config/dbconfig.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// connect to MongoDB database
connectToMongoDb();

// Routes

// Run the server
app.listen(PORT, (error) => {
  error ? console.log("Error", error) : console.log("Server is running at port", PORT);
});
