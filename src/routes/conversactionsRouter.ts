import express from "express";
import { Message } from "../types.js";
import FlightConversationModel from "../models/conversationModel.js";
import FlightModel from "../models/flightModel.js";

const conversationsRouter = express.Router();

conversationsRouter.post("/", async (req, res) => {
  const { flightId, message }: { flightId: string; message: Message } =
    req.body;

  const flight = await FlightModel.findOne({ flightId: flightId });
  const exsistingFlightConversation = await FlightConversationModel.findOne({
    flight: flight!._id,
  });
  if (exsistingFlightConversation) {
    exsistingFlightConversation.messages.push({
      author: message.author,
      content: message.content,
      messageType: message.messageType,
    });
    await exsistingFlightConversation.save();
    res.json(exsistingFlightConversation);
  } else {
    const newFlightConversationSchema = new FlightConversationModel({
      flight: flight!._id,
      messages: [
        {
          author: message.author,
          content: message.content,
          messageType: message.messageType,
        },
      ],
    });
    const flightConversation = await newFlightConversationSchema.save();
    res.json(flightConversation);
  }
});

conversationsRouter.get("/:flightId", async (req, res) => {
  const flightId = req.params.flightId;
  const flight = await FlightModel.findOne({ flightId });
  const conversation = await FlightConversationModel.findOne({
    flight: flight!._id,
  }).populate("messages.author");

  res.json(conversation);
});

export default conversationsRouter;
