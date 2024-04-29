import dayjs from "dayjs";
import FlightModel from "../models/flightModel.js";
import { getTLVDepartures } from "./getTLVDepartures.js";

const updateAllFlightsBasedOnTLV = async () => {
  let updatedDocumentsCouter = 0;
  let deletedDocumentsCouter = 0;

  const allFlghts = await FlightModel.find();
  const allTLVFlights = await getTLVDepartures({
    from: dayjs().format("YYYY-MM-DD"),
    to: dayjs().add(7, "days").format("YYYY-MM-DD"),
  });

  for (const flight of allFlghts) {
    const tlvFlight = allTLVFlights.find(
      (tlvFlight) => tlvFlight.localApplicationId === flight.localApplicationId
    );

    if (!tlvFlight) {
      await flight.deleteOne();
      deletedDocumentsCouter++;
      continue;
    }
    const { counters, dateString } = tlvFlight;
    flight.keyMoments.planned.shiftStarts = dayjs(dateString)
      .subtract(210, "minutes")
      .toString();
    flight.keyMoments.planned.countersOpening = dayjs(dateString)
      .subtract(180, "minutes")
      .toString();
    flight.keyMoments.planned.countersClosing = dayjs(dateString)
      .subtract(60, "minutes")
      .toString();
    flight.keyMoments.planned.bording = dayjs(dateString)
      .subtract(45, "minutes")
      .toString();
    flight.keyMoments.planned.departure = dayjs(dateString).toString();
    flight.counters = counters;
    await flight.save();
    updatedDocumentsCouter++;
  }
  return { updatedDocumentsCouter, deletedDocumentsCouter };
};

export default updateAllFlightsBasedOnTLV;
