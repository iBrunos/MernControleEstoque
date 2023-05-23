import express from "express";
import connectDatabase from "./src/database/db.js"
import dotenv from "dotenv"

import authRoute from "./src/routes/auth.routes.js"
import entryRoute from "./src/routes/entry.routes.js"
import exitRoute from "./src/routes/exit.routes.js"
import stockRoute from "./src/routes/stock.routes.js"
import productRoute from "./src/routes/product.routes.js"
import userRoute from "./src/routes/user.routes.js"
import cors from 'cors';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({
  origin: '*'
}));
connectDatabase();
//ROTAS
app.use(express.json())
app.use("/product", productRoute)
app.use("/user", userRoute)
app.use("/stock", stockRoute)

app.use("/auth", authRoute)
app.use("/entry", entryRoute)
app.use("/exit", exitRoute)

app.listen(3000, () => console.log(`Server running on port ${port}`));