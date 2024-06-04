import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const convertToEml = async (req, res) => {
  try {
    const mailData = req.body;
    const fileName = "template" + ".eml";
    // const fileName = mailData.name + ".eml";
    const filePath = path.join(__dirname, "..", "..", "..", "public", fileName);

    console.log(mailData.name);

    const headerData = `From: ${mailData.Sender}\nTo: ${mailData.Recipient}\nSubject: ${mailData.Subject}\nContent-Type: text/html; charset=utf-8\nContent-Disposition: inline\n\n`;

    await fs.writeFile(filePath, headerData);
    await fs.appendFile(filePath, "<!DOCTYPE html>\n<html>\n<head></head>\n");
    await fs.appendFile(
      filePath,
      `<body style="background-color: ${mailData.bodyColor}">`
    );

    await mailData.template.forEach(async (element) => {
      let elementData;
      let tempStylePadding = "";
      let tempStyleBgColor = "";
      if (element.type === "text") {
        elementData = `\n<div style="color: ${element.color}">${element.text}</div>`;
      } else if (element.type === "img") {
        elementData = `\n<img alt="${element.alt}" width="${element.width}" height="${element.height}" src="${element.img}"/>`;
      } else if (element.type === "link") {
        element.padding
          ? (tempStylePadding = `padding: ${element.padding}px`)
          : null;
        element.bgColor
          ? (tempStyleBgColor = `background-color: ${element.bgColor}`)
          : null;
        elementData = `\n<div><a href="${element.link}" style="display: inline-block; ${tempStylePadding} color: ${element.color}; ${tempStyleBgColor}">${element.text}</a></div>`;
      } else throw Error(`Invalid element type - ${element.type}`);

      await fs.appendFile(filePath, elementData);
    });
    await fs.appendFile(filePath, "\n</body>\n</html>");

    // res.sendFile(filePath);
    res.download(filePath, fileName);
  } catch (err) {
    res.status(500).send({ message: "Internal error occured." });
  }
};

export default { convertToEml };
