import FlightModel from "../models/flightModel";
import { flightInterface } from "../types";
import { HydratedDocument } from "mongoose";

const createNewFlight = async (requestedNewFlight: flightInterface) => {
  const newFlight: HydratedDocument<flightInterface> = new FlightModel(
    requestedNewFlight
  );
  const addedFlight = await newFlight.save();
  return addedFlight;
};

export default createNewFlight;
