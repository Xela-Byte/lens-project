const express = require("express");
const { resolve } = require("path");
const bodyParser = require("body-parser");

require("dotenv").config({ path: resolve(`${__dirname}`, `.env`) });
const { generate } = require("./generate-sitemap");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/", async (req, res) => {
  if (
    req.headers.authorization !== process.env.REACT_APP_PUBLIC_WEBHOOK_TOKEN
  ) {
    res.status(403).send({
      status: 403,
      message: "Please authenticate",
    });
  } else if (
    ["entry.create", "entry.update", "entry.delete"].includes(req.body.event) &&
    ["article", "category", "company"].includes(req.body.model)
  ) {
    generate(
      process.env.REACT_APP_PUBLIC_FRONTEND_HOST,
      "sitemaps",
      "./public",
      ["/api/", "/login"]
    )
      .then(() => {
        console.log("Sitemap successfully regenerated!");
      })
      .catch((err) => {
        console.log(`Generate sitemap error: ${err}`);
      });

    res.status(200).send({
      status: 200,
      message: "Successfully trigger regenerate sitemap...",
    });
  } else {
    console.log("error");
    res.status(200).send({
      status: 200,
      message: "Skip generate sitemap, invalid event or model",
      event: req.body.event,
      model: req.body.model,
    });
  }
});

app.listen(process.env.REACT_APP_PUBLIC_SITEMAP_PORT, () => {
  console.log(
    `Sitemap Generator at http://localhost:${process.env.REACT_APP_PUBLIC_SITEMAP_PORT}`
  );
});
