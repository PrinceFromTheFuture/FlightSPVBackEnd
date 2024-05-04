import AirportModel from "../models/airportModel.js";
import * as express from "express";

const airportsRouter = express.Router();

airportsRouter.get("/deleteAll", async (req, res) => {
  await AirportModel.deleteMany();
  res.send("deleted");
});

airportsRouter.get("/getAll", async (req, res) => {
  const allAirPortsDocuments = await AirportModel.find();
  const allAirPorts = allAirPortsDocuments.map((airPortDocument) => {
    return { code: airPortDocument.code, name: airPortDocument.name };
  });
  res.json(allAirPorts);
});

export default airportsRouter;
