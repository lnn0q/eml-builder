import express from "express";
const router = express.Router();
import toEmlController from "../../controllers/toEmlController.js";

router.route("/").post(toEmlController.convertToEml);

export default router;
