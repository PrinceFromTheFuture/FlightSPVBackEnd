import * as express from "express";
import AgentModel from "../models/agentModel";
import { agentsJS } from "../utils/devUtils/AeroAgents";
import { nanoid } from "@reduxjs/toolkit";

const agentsRouter = express.Router();

agentsRouter.get("/deleteAll", async (req, res) => {
  res.send("deleted");
});

export default agentsRouter;
