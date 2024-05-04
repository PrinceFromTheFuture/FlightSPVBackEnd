import { Schema, model } from "mongoose";
import { airportType } from "../types.js";

const airportSchema = new Schema<airportType>({
  code: String,
  name: String,
});

const AirportModel = model("Airport", airportSchema);

export default AirportModel;
