import { Schema, model } from "mongoose";
import { agentType } from "../types";

const agentSchema = new Schema<agentType>({
  agentId: { type: String },
  workerID: { type: String },
  name: { type: String },
  role: { type: String },
  email: { type: String },
  phone: { type: String },
});

const AgentModel = model("Agent", agentSchema);

export default AgentModel;
