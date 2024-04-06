import mongoose, { Schema } from "mongoose";
import { agentType } from "../types.js";

const agentSchema = new Schema<agentType>({
  agentId: String,
  workerID: String,
  name: String,
  role: String,
  email: String,
  phone: String,
});

const AgentModel = mongoose.model("Agent", agentSchema);

export default AgentModel;
