import mongoose from "mongoose";
import { flightConversation } from "../types.js";
import AgentModel from "./agentModel.js";
import FlightModel from "./flightModel.js";

const conversationSchema: mongoose.Schema<flightConversation> =
  new mongoose.Schema({
    flight: { type: mongoose.Schema.ObjectId, ref: FlightModel },
    messages: [
      {
        author: { type: mongoose.Schema.ObjectId, ref: AgentModel },
        messageType: String,
        content: String,
      },
    ],
  });

const FlightConversationModel = mongoose.model(
  "conversation",
  conversationSchema
);

export default FlightConversationModel;
