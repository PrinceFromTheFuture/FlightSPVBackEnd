import FlightModel from "../models/flightModel.js";
import { flightSchemaInterface, tlvFlightInterface } from "../types.js";
import AirportModel from "../models/airportModel.js";
import dayjs from "dayjs";
import { getPopulatedFlightById } from "./getPopulatedFlights.js";
import { nanoid } from "@reduxjs/toolkit";
import mongoose from "mongoose";

const createNewFlightFromTLVFlight = async (tlvFlight: tlvFlightInterface) => {
  const { city, counters, dateString, flightNumber, localApplicationId } =
    tlvFlight;

  const date = dayjs(dateString, 'DD/MM/YYYY HH:mm"');

  const desteneationAirportDocument = await AirportModel.findOne({
    name: city,
  });
  const destenationDocumentId = desteneationAirportDocument
    ? desteneationAirportDocument._id
    : "66108109118a7c0269b21599";

  const cityID = new mongoose.Types.ObjectId("6614504f440d441fc5a1e461");
  const agentID = new mongoose.Types.ObjectId("66103cbfb04bb4beb3cab22b");

  const newFlight = new FlightModel({
    counters: counters || "",
    crew: {
      agents: [{ agent: agentID, notes: "cant work late" }],
      SPV: { agent: agentID },
      rampAgent: { agent: agentID },
    },
    destenation: cityID,
    origin: cityID,
    flightId: nanoid(),
    flightNumber: flightNumber,
    flightTime: "houres",
    gate: "houres",
    keyMoments: {
      actual: {
        countersOpening: "houres",
        countersClosing: "houres",
        bordingEnd: "houres",
        bordingStart: "houres",
        offBlock: "houres",
        openningBoardingPagia: "houres",
      },
      planned: {
        shiftStarts: dayjs(date).subtract(210, "minutes").toISOString(),
        countersOpening: dayjs(date).subtract(180, "minutes").toISOString(),
        countersClosing: dayjs(date).subtract(60, "minutes").toISOString(),
        bording: dayjs(date).subtract(45, "minutes").toISOString(),
        departure: dayjs(date).toISOString(),
      },
    },
    PAGIAAgent: "houres",
    totalPassangers: 0,
    totalSuitcases: 0,
    totalStrollers: 0,
    personalRole: "SPV",
    localApplicationId: localApplicationId,
  });
  const savedFlight = await newFlight.save();
  const populatedFlight = getPopulatedFlightById(savedFlight._id);

  return populatedFlight;
};

export default createNewFlightFromTLVFlight;
