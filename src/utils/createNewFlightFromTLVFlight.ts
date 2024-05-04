import FlightModel from "../models/flightModel.js";
import { tlvFlightInterface } from "../types.js";
import dayjs from "dayjs";
import { getPopulatedFlightById } from "./getPopulatedFlights.js";
import { nanoid } from "@reduxjs/toolkit";
import mongoose from "mongoose";
import AirportModel from "../models/airportModel.js";

const createNewFlightFromTLVFlight = async (tlvFlight: tlvFlightInterface) => {
  let { counters, dateString, flightNumber, localApplicationId, city } =
    tlvFlight;

  const departureString = dayjs(dateString);

  const airportDestenationDocument = await AirportModel.findOne({ name: city });
  const cityId = new mongoose.Types.ObjectId(airportDestenationDocument!._id);
  const TLVAirportId = new mongoose.Types.ObjectId("6614504f440d441fc5a1e461");

  const agentID = new mongoose.Types.ObjectId("66103cbfb04bb4beb3cab22b");

  const newFlight = new FlightModel({
    counters: counters,
    crew: {
      agents: [],
      SPV: { agent: agentID },
      rampAgent: { agent: agentID },
    },
    destenation: cityId,
    origin: TLVAirportId,
    flightId: nanoid(),
    flightNumber: flightNumber,
    flightTime: "2 hours",
    gate: "E1A",
    keyMoments: {
      actual: {
        countersOpening: dayjs(departureString)
          .subtract(180, "minutes")
          .toISOString(),
        countersClosing: dayjs(departureString)
          .subtract(60, "minutes")
          .toISOString(),
        openningBoardingPagia: dayjs(departureString)
          .subtract(50, "minutes")
          .toISOString(),
        arrivedToGate: dayjs(departureString)
          .subtract(50, "minutes")
          .toISOString(),
        bordingStart: dayjs(departureString)
          .subtract(45, "minutes")
          .toISOString(),
        bordingEnd: dayjs(departureString)
          .subtract(15, "minutes")
          .toISOString(),
        offBlock: dayjs(departureString).subtract(10, "minutes").toISOString(),
      },
      planned: {
        shiftStarts: dayjs(departureString)
          .subtract(210, "minutes")
          .toISOString(),
        countersOpening: dayjs(departureString)
          .subtract(180, "minutes")
          .toISOString(),
        countersClosing: dayjs(departureString)
          .subtract(60, "minutes")
          .toISOString(),
        bording: dayjs(departureString).subtract(45, "minutes").toISOString(),
        departure: dayjs(departureString).toISOString(),
      },
    },
    PAGIAAgent: "Noa",
    totalPassangers: 0,
    totalSuitcases: 0,
    totalStrollers: 0,
    personalRole: "SPV",
    localApplicationId: localApplicationId,
  });
  const savedFlight = await newFlight.save();
  const populatedFlight = getPopulatedFlightById(savedFlight.flightId);

  return populatedFlight;
};

export default createNewFlightFromTLVFlight;
