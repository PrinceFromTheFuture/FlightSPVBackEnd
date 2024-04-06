import monogoose from "mongoose";
import { flightInterface, flightSchemaInterface } from "../types";
import FlightModel from "../models/flightModel";

const getPopulatedFlight = async (flightId: monogoose.Types.ObjectId) => {
  const populatedFlight = await FlightModel.findById(flightId)
    .populate("destenation")
    .populate("origin")
    .populate("crew.agents.agent")
    .populate("crew.SPV.agent")
    .populate("crew.rampAgent.agent")
    .exec();
  return populatedFlight;
};

export default getPopulatedFlight;
