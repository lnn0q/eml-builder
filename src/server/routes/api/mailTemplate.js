import express from "express";
const router = express.Router();
import mailController from "../../controllers/mailController.js";

router
  .route("/")
  .get(mailController.getMailTemplateNames)
  .post(mailController.addMailTemplate)
  .put(mailController.updateMailTemplate)
  .delete(mailController.deleteMailTemplate);

router.route("/:id").get(mailController.getMailTemplate);

export default router;
