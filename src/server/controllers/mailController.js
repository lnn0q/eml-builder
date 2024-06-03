import TemplateName from "../model/TemplateName.js";
import Mail from "../model/Mail.js";

const getMailTemplateNames = async (req, res) => {
  // const templates = await TemplateName.find();
  const templates = await Mail.find();
  if (!templates)
    return res.status(204).json({ message: "No templates found" });
  res.json(templates);
};

const getMailTemplate = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "ID is required" });
  const template = await Mail.findOne({ _id: req.params.id }).exec();
  if (!template) {
    return res
      .status(204)
      .json({ message: `No template matches ID ${req.params.id}` });
  }
  res.json(template);
};

// const addMailTemplate = async (req, res) => {
//   mailData.push(req.body);
//   res.status(200).send("Template added successfully");
// };

const addMailTemplate = async (req, res) => {
  //add err handling
  if (!req?.body) {
    return res.satus(400).json({ message: "Props are required" });
  }
  try {
    // await TemplateName.create({
    //   name: req.body.name,
    // });
    const result = await Mail.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

// const updateMailTemplate = (req, res) => {
//   const messageId = parseInt(req.body.id);
//   const messageIndex = mailData.findIndex(
//     (message) => message.id === messageId
//   );
//   if (messageIndex !== -1) {
//     mailData[messageIndex] = { ...mailData[messageIndex], ...req.body };
//     res.status(200).send("Template updated successfully");
//   } else {
//     res.status(404).send("Template not found");
//   }
// };

const updateMailTemplate = async (req, res) => {
  console.log("check1");
  if (!req?.body?._id) {
    return res.status(400).json({ message: "ID paramater is required." });
  }
  try {
    const template = await Mail.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    if (!template) {
      return res
        .status(204)
        .json({ message: `No template matches ID ${req.body._id}` });
    }
    console.log("check-suc");
    res.status(200).json(template);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteMailTemplate = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "ID parameter is require" });
  const template = await Mail.findOne({ _id: req.body.id }).exec();

  if (!template) {
    return res
      .status(204)
      .json({ message: `No templated matches ID ${req.body.id}` });
  }
  const result = await Mail.deleteOne({ _id: req.body.id });
  res.json(result);
};

export default {
  getMailTemplateNames,
  getMailTemplate,
  addMailTemplate,
  updateMailTemplate,
  deleteMailTemplate,
};
