import AirportModel from "../models/airportModel.js";
import * as express from "express";

const airportsRouter = express.Router();

airportsRouter.get("/deleteAll", async (req, res) => {
  await AirportModel.deleteMany();
  res.send("deleted");
});

export default airportsRouter;
