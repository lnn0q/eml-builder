import TemplateName from "../model/TemplateName.js";
import Mail from "../model/Mail.js";

const getMailTemplateNames = (req, res) => {
  res.json(templateNames);
};

const getMailTemplate = (req, res) => {
  const messageId = Number(req.params.id);
  const messageIndex = mailData.findIndex(
    (message) => message.id === messageId
  );
  res.json(mailData[messageIndex]);
};

// const addMailTemplate = async (req, res) => {
//   mailData.push(req.body);
//   res.status(200).send("Template added successfully");
// };

const addMailTemplate = async (req, res) => {
  try {
    await TemplateName.create({
      name: req.body.name,
    });
    await Mail.create(req.body);
    req.status(200).send("Template added successfully");
  } catch (error) {
    res.status(500).send("Error adding template: " + error.message);
  }
};

const updateMailTemplate = (req, res) => {
  const messageId = parseInt(req.body.id);
  const messageIndex = mailData.findIndex(
    (message) => message.id === messageId
  );
  if (messageIndex !== -1) {
    mailData[messageIndex] = { ...mailData[messageIndex], ...req.body };
    res.status(200).send("Template updated successfully");
  } else {
    res.status(404).send("Template not found");
  }
};

const deleteMailTemplate = (req, res) => {
  const messageId = parseInt(req.body.id);
  const messageIndex = mailData.findIndex(
    (message) => message.id === messageId
  );
  if (messageIndex !== -1) {
    mailData.splice(messageIndex, 1);
    res.status(200).send("Template deleted successfully");
  } else {
    res.status(404).send("Template not found");
  }
};

export default {
  getMailTemplateNames,
  getMailTemplate,
  addMailTemplate,
  updateMailTemplate,
  deleteMailTemplate,
};
