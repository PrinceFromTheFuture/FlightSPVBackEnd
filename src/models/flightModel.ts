import { Schema, model } from "mongoose";
import { flightInterface, flightSchemaInterface } from "../types";
import AgentModel from "./agentModel";
import AirportModel from "./airportModel";

const flightSchema = new Schema<flightSchemaInterface>({
  personalRole: { type: String, required: true },
  counters: { type: String, required: true },
  crew: {
    agents: [
      {
        type: Schema.Types.ObjectId,
        ref: AgentModel,
      },
    ],
    SPV: {
      type: Schema.Types.ObjectId,
      ref: AgentModel,
    },
    rampAgent: {
      type: Schema.Types.ObjectId,
      ref: AgentModel,
    },
  },
  destenation: {
    type: Schema.Types.ObjectId,
    ref: AirportModel,
  },
  origin: {
    type: Schema.Types.ObjectId,
    ref: AirportModel,
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
      countersOpening: { type: String, required: true },
      countersClosing: { type: String, required: true },
      bordingEnd: { type: String, required: true },
      bordingStart: { type: String, required: true },
      offBlock: { type: String, required: true },
      openningBoardingPagia: { type: String, required: true },
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
