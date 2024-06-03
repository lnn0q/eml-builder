import "dotenv/config";

import express from "express";
import ViteExpress from "vite-express";

import mailTemplateRouter from "./routes/api/mailTemplate.js";
import emlExportRouter from "./routes/api/emlExport.js";

import mongoose from "mongoose";
import connectDB from "./configs/dbConn.js";

connectDB();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/api/template", mailTemplateRouter);
app.use("/api/export-eml", emlExportRouter);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  ViteExpress.listen(app, PORT, () =>
    console.log(`Server is listening on port ${PORT}...`)
  );
});
