import express from "express";
import FlightModel from "../models/flightModel.js";
import { getTLVDepartures } from "../utils/getTLVDepartures.js";
import { tlvFlightInterface } from "../types.js";
import createNewFlightFromTLVFlight from "../utils/createNewFlightFromTLVFlight.js";
import { getAllPopulatedFlights } from "../utils/getPopulatedFlights.js";
import mongoose from "mongoose";

const flightsRouter = express.Router();

flightsRouter.get("/newDevFlight", async (req, res) => {
  const newportId = new mongoose.Types.ObjectId("6614504f440d441fc5a1e461");

  const agentId32 = new mongoose.Types.ObjectId("66103cbeb04bb4beb3cab225");

  const newFlight = new FlightModel({
    personalRole: "BOSS",
    flightNumber: "423",
    flightId: "d32",
    origin: newportId,
    destenation: newportId,
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
        { agent: agentId32 },
        { agent: agentId32 },
        { agent: agentId32 },
      ],
      rampAgent: { agent: agentId32 },
      SPV: { agent: agentId32 },
    },

    gate: "d32",
    PAGIAAgent: "23d",
    totalPassangers: 323,
    totalSuitcases: 323,
    totalStrollers: 323,
    localApplicationId: 4783248732,
  });
  try {
    const test = await newFlight.save();
    res.json(test);
  } catch (e) {
    console.log(e);
  }
});

flightsRouter.post("/tlvFlights", async (req, res) => {
  const from = req.body.from;
  const to = req.body.to;

  const json = await getTLVDepartures({ from, to });
  res.json(json);
});

flightsRouter.get("/allFlights", async (req, res) => {
  const allFlights = await getAllPopulatedFlights();

  res.json(allFlights);
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
