import * as express from "express";
import AirportModel from "../models/airportModel";
import FlightModel from "../models/flightModel";
import { getTLVDepartures } from "../utils/getTLVDepartures";
import { tlvFlightInterface } from "../types";
import createNewFlightFromTLVFlight from "../utils/createNewFlightFromTLVFlight";

const flightsRouter = express.Router();

flightsRouter.get("/", async (req, res) => {
  const newAripoer = new AirportModel({ name: "32d", shortName: "d3as" });

  const newport = await newAripoer.save();

  const newFlight = new FlightModel({
    personalRole: "BOSS",
    flightNumber: "423",
    flightId: "d32",
    origin: newport._id,
    destenation: newport._id,
    flightTime: "234",
    counters: "d32",
    keyMoments: {
      planned: {
        shiftStarts: "d3",
        countersOpening: "d3",
        countersClosing: "d3",
        bording: "d3",
        departure: "d3",
      },
      actual: {
        countersOpening: "d3",
        countersClosing: "d3",
        bordingEnd: "d3",
        bordingStart: "d3",
        offBlock: "d3",
        openningBoardingPagia: "d3",
      },
    },
    crew: {
      agents: [
        "660ef7c4226a7bd166d3ec3e ",
        "660ef7c4226a7bd166d3ec3e",
        "660ef7c4226a7bd166d3ec3e",
      ],
      rampAgent: "660ef7c4226a7bd166d3ec3e",
      SPV: "660ef7c4226a7bd166d3ec3e",
    },

    gate: "d32",
    PAGIAAgent: "23d",
    totalPassangers: 323,
    totalSuitcases: 323,
    totalStrollers: 323,
  });

  res.send(JSON.stringify(newFlight));
});

flightsRouter.post("/tlvFlights", async (req, res) => {
  const from = req.body.from;
  const to = req.body.from;
  console.log(req.body);
  const json = await getTLVDepartures({ from, to });
  res.json(json);
});

flightsRouter.post("/saveNewFlightFromTLVFlight", async (req, res) => {
  const {
    city,
    counters,
    dateString,
    flightNumber,
    localApplicationId,
  }: tlvFlightInterface = req.body;

  const tlvFlight: tlvFlightInterface = {
    city,
    counters,
    dateString,
    flightNumber,
    localApplicationId,
  };

  const newFlght = await createNewFlightFromTLVFlight(tlvFlight);

  res.json(newFlght);
});
export default flightsRouter;
