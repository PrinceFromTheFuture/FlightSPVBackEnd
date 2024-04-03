import * as express from "express";

import { ts1 } from "./test.js";

const app = express();

app.listen(3002, () => {
  console.log("listening");
});

app.get("/", (req, res) => {
  res.send(ts1.objet);
});
