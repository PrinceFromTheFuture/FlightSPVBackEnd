import { nanoid } from "@reduxjs/toolkit";
import FlightModel from "../models/flightModel";
import {
  flightInterface,
  flightSchemaInterface,
  tlvFlightInterface,
} from "../types";
import { HydratedDocument, Schema } from "mongoose";
import AirportModel from "../models/airportModel";
import * as dayjs from "dayjs";

const createNewFlightFromTLVFlight = async (tlvFlight: tlvFlightInterface) => {
  const { city, counters, dateString, flightNumber, localApplicationId } =
    tlvFlight;

  const desteneationAirportDocument = await AirportModel.findOne({
    name: city,
  });
  const destenationDocumentId = desteneationAirportDocument
    ? desteneationAirportDocument._id
    : "66108109118a7c0269b21599";

  const newFlight = new FlightModel<flightSchemaInterface>({
    counters: counters,
    crew: {
      agents: ["66103cbeb04bb4beb3cab227", "66103cbeb04bb4beb3cab227"],
      rampAgent: "66103cbeb04bb4beb3cab227",
      SPV: "66103cbeb04bb4beb3cab227",
    },
    destenation: String(destenationDocumentId),
    origin: "6610837e118a7c0269b2159a",
    flightId: nanoid(),
    flightNumber: flightNumber,
    flightTime: "",
    gate: "",
    keyMoments: {
      actual: {
        countersOpening: "",
        countersClosing: "",
        bordingEnd: "",
        bordingStart: "",
        offBlock: "",
        openningBoardingPagia: "",
      },
      planned: {
        shiftStarts: dayjs(dateString).subtract(210, "minutes").toISOString(),
        countersOpening: dayjs(dateString)
          .subtract(180, "minutes")
          .toISOString(),
        countersClosing: dayjs(dateString)
          .subtract(60, "minutes")
          .toISOString(),
        bording: dayjs(dateString).subtract(45, "minutes").toISOString(),
        departure: dayjs(dateString).toISOString(),
      },
    },
    PAGIAAgent: "",
    totalPassangers: 0,
    totalSuitcases: 0,
    totalStrollers: 0,
    personalRole: "SPV",
    localApplicationId: localApplicationId,
  });
  const savedFlight = await newFlight.save();
  return savedFlight;
};

export default createNewFlightFromTLVFlight;
