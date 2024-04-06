import { Schema, model } from "mongoose";
import { flightInterface, flightSchemaInterface } from "../types";
import AgentModel from "./agentModel"; // Import the AgentModel
import AirportModel from "./airportModel";

// Schema definition for FlightModel

const flightSchema = new Schema<flightSchemaInterface>({
  personalRole: { type: String },
  counters: { type: String },
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
  },
  origin: {
    type: Schema.Types.ObjectId,
    ref: AirportModel.modelName,
  },
  flightNumber: { type: String },
  gate: { type: String },
  flightId: { type: String },
  keyMoments: {
    planned: {
      shiftStarts: { type: String },
      countersOpening: { type: String },
      countersClosing: { type: String },
      bording: { type: String },
      departure: { type: String },
    },
    actual: {
      countersOpening: { type: String },
      countersClosing: { type: String },
      bordingEnd: { type: String },
      bordingStart: { type: String },
      offBlock: { type: String },
      openningBoardingPagia: { type: String },
    },
  },
  flightTime: { type: String },
  PAGIAAgent: {
    type: String,
  },
  totalPassangers: { type: Number },
  totalStrollers: { type: Number },
  totalSuitcases: { type: Number },
  localApplicationId: { type: Number },
});
const FlightModel = model("Flight", flightSchema);

export default FlightModel;
