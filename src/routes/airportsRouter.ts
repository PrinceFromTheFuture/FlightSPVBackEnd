import AirportModel from "../models/airportModel";
import * as express from "express";

const airportsRouter = express.Router();

airportsRouter.get("/deleteAll", async (req, res) => {
  await AirportModel.deleteMany();
  res.send("deleted");
});

export default airportsRouter;
