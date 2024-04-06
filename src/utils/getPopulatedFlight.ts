import monogoose from "mongoose";
import FlightModel from "../models/flightModel.js";

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
