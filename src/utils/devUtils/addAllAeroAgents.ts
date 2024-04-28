import { nanoid } from "nanoid";
import { allAgentsJSON } from "./AeroAgents.js";
import AgentModel from "../../models/agentModel.js";

export const addAllAeroAgents = async () => {
  let count: number = 0;
  const allCurrentAgents = await AgentModel.find();

  const unknownAgents = allAgentsJSON.map((DBAgent) => {
    const currentAgent = allCurrentAgents.find(
      (agent) => agent.workerID === DBAgent.workerId
    );
    if (!currentAgent) {
      return DBAgent;
    } else {
      return;
    }
  });

  for (const agent of unknownAgents) {
    if (!agent) {
      return;
    }
    const { workerId, name, email, mobilePhone, jobDescription } = agent;

    const saveNewAgent = async (role: string) => {
      const newAgent = new AgentModel({
        agentId: nanoid(),
        email: email,
        phone: mobilePhone,
        workerID: workerId,
        name: name,
        role: role,
      });
      count++;
      return await newAgent.save();
    };

    if (jobDescription === "Flight Supervisor") {
      const newAgent = await saveNewAgent("SPV");
      console.log(newAgent);
    } else if (jobDescription === "Check-in Agent") {
      const newAgent = await saveNewAgent("Agent");
      console.log(newAgent);
    } else if (jobDescription === "GA ramp agent") {
      const newAgent = await saveNewAgent("Ramp Agent");
      console.log(newAgent);
    }
  }
  console.log(count);
};
