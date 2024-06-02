import express from "express";
import ViteExpress from "vite-express";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const templates = [
  {
    name: "Template 1",
    id: 1,
  },
];

app.get("/api/get-templates", (req, res) => {
  res.json(templates);
});

app.get("/api/template/:id", (req, res) => {});

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}...`)
);
