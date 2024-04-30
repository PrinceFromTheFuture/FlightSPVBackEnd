import { Schema, model } from "mongoose";
import { flightSchemaInterface } from "../types.js";
import AgentModel from "./agentModel.js"; // Import the AgentModel
import AirportModel from "./airportModel.js";

// Schema definition for FlightModel

const flightSchema = new Schema<flightSchemaInterface>({
  personalRole: { type: String, required: true },
  counters: { type: String, required: false, default: "---" },
  crew: {
    agents: [
      {
        agent: {
          type: Schema.Types.ObjectId,
          ref: AgentModel.modelName,
        },
        notes: { type: String },
        _id: false,
      },
    ],
    SPV: {
      agent: {
        type: Schema.Types.ObjectId || null,
        ref: AgentModel.modelName,
      },
      notes: { type: String },
    },
    rampAgent: {
      agent: {
        type: Schema.Types.ObjectId || null,
        ref: AgentModel.modelName,
      },
      notes: { type: String },
    },
  },
  destenation: {
    type: Schema.Types.ObjectId,
    ref: AirportModel.modelName,
    required: true,
  },
  origin: {
    type: Schema.Types.ObjectId,
    ref: AirportModel.modelName,
    required: true,
  },
  flightNumber: { type: String, required: true },
  gate: { type: String, required: true },
  flightId: { type: String, required: true },
  keyMoments: {
    planned: {
      shiftStarts: { type: String, required: true },
      countersOpening: { type: String, required: true },
      countersClosing: { type: String, required: true },
      bording: { type: String, required: true },
      departure: { type: String, required: true },
    },
    actual: {
      countersOpening: { type: String },
      countersClosing: { type: String },
      arrivedToGate: { type: String },

      bordingEnd: { type: String },
      bordingStart: { type: String },
      offBlock: { type: String },
      openningBoardingPagia: { type: String },
    },
  },
  flightTime: { type: String, required: true },
  PAGIAAgent: {
    type: String,
  },
  totalPassangers: { type: Number, required: true },
  totalStrollers: { type: Number, required: true },
  totalSuitcases: { type: Number, required: true },
  localApplicationId: { type: Number, required: true },
});
const FlightModel = model("Flight", flightSchema);

export default FlightModel;
