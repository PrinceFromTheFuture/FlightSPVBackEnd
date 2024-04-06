import AgentModel from "../models/agentModel";

export const deleteAllAgents = async () => {
  await AgentModel.deleteMany();
};
