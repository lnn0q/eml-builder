import express from "express";
import ViteExpress from "vite-express";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const templates = [
  {
    name: "PugTemplate",
    id: 1,
  },
];

const mailData = [
  {
    id: 1,
    Sender: "johndoe@test.com",
    Recipient: "jamesjohnson@test.com",
    Subject: "Test Subject",
    Date: "Thu, 3 Mar 2024 12:00:00 +0100",
    bodyColor: "#ffffff",
    template: [
      {
        type: "text",
        text: "Test",
        color: "#000fff",
        id: 1,
      },
      {
        type: "text",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        color: "#000000",
        id: 2,
      },
      {
        type: "img",
        alt: "img",
        width: "250px",
        height: "250px",
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.xn--perrosrazapequea-lub.com%2Fwp-content%2Fuploads%2F2018%2F05%2Fpug-2048x1398.jpg&f=1&nofb=1&ipt=2a85679831aec9a8cf93ee897cd5ea6810323781b89c5655a5cfacf43fbf1ed7&ipo=images",
        id: 3,
      },
      {
        type: "link",
        text: "Redirect",
        color: "#000000",
        link: "#",
        id: 4,
      },
    ],
  },
];

app.get("/api/get-templates", (req, res) => {
  try {
    res.json(templates);
  } catch (err) {
    res.status(500).message(err.message);
  }
});

app.get("/api/template/:id", (req, res) => {
  try {
    res.json(mailData[req.params.id - 1]);
  } catch (err) {
    res.status(500).message(err.message);
  }
});

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}...`)
);
