import monogoose from "mongoose";
import FlightModel from "../models/flightModel.js";
import { flightInterface } from "../types.js";

export const getPopulatedFlightById = async (
  flightId: monogoose.Types.ObjectId
) => {
  const populatedFlight = (await FlightModel.findById(flightId)
    .populate("destenation")
    .populate("origin")
    .populate("crew.agents.agent")
    .populate("crew.SPV.agent")
    .populate("crew.rampAgent.agent")
    .exec()) as
    | (monogoose.Document<unknown, {}, flightInterface> &
        flightInterface & {
          _id: monogoose.Types.ObjectId;
        })
    | null;
  return populatedFlight;
};

export const getAllPopulatedFlights = async () => {
  const populatedFlight = await FlightModel.find()
    .populate("crew.agents.agent")
    .populate("crew.SPV.agent")
    .populate("crew.rampAgent.agent")
    .populate("destenation")
    .populate("origin")
    .exec();
  return populatedFlight;
};
