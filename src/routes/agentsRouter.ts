import * as express from "express";
import AgentModel from "../models/agentModel.js";
import { addAllAeroAgents } from "../utils/devUtils/addAllAeroAgents.js";

const agentsRouter = express.Router();

agentsRouter.get("/deleteAll", async (req, res) => {
  res.send("deleted");
});

agentsRouter.get("/getAll", async (req, res) => {
  await addAllAeroAgents();
  const allAgents = await AgentModel.find();
  res.json(allAgents);
});

export default agentsRouter;
