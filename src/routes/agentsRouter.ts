import * as express from "express";

const agentsRouter = express.Router();

agentsRouter.get("/deleteAll", async (req, res) => {
  res.send("deleted");
});

export default agentsRouter;
