import express from "express";
import connectDatabase from "./src/database/db.js"
import userRoute from "./src/routes/user.route.js"
import dotenv from "dotenv"
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();


connectDatabase();
//ROTAS
app.use(express.json())
app.use("/user", userRoute)
app.listen(3000, () => console.log(`Server running on port ${port}`));