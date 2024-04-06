import { nanoid } from "nanoid";
import FlightModel from "../models/flightModel";
import { flightSchemaInterface, tlvFlightInterface } from "../types";
import AirportModel from "../models/airportModel";
import * as dayjs from "dayjs";
import getPopulatedFlight from "./getPopulatedFlight";

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
      agents: [],
      SPV: null,
      rampAgent: null,
    },
    destenation: String(destenationDocumentId),
    origin: "6610837e118a7c0269b2159a",
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
    PAGIAAgent: "houres",
    totalPassangers: 0,
    totalSuitcases: 0,
    totalStrollers: 0,
    personalRole: "SPV",
    localApplicationId: localApplicationId,
  });
  const savedFlight = await newFlight.save();
  const populatedFlight = getPopulatedFlight(savedFlight._id);

  return populatedFlight;
};

export default createNewFlightFromTLVFlight;
