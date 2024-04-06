import * as express from "express";
import AirportModel from "../models/airportModel";

const airportsRouter = express.Router();

airportsRouter.get("/deleteAll", async (req, res) => {
  await AirportModel.deleteMany();
  res.send("deleted");
});

export default airportsRouter;
