import mongoose from "mongoose";
import { flightInterface } from "../../types.js";
import { PDFFont, PDFPage } from "pdf-lib";
import dayjs from "dayjs";

type drawFlightReportProps = (
  flight: mongoose.Document<unknown, {}, flightInterface> &
    flightInterface & {
      _id: mongoose.Types.ObjectId;
    },
  page: PDFPage,
  font: PDFFont
) => void;

const drawFlightReportDate: drawFlightReportProps = (flight, page, font) => {
  const fontSize = 9;

  page.drawText(flight.flightNumber, {
    x: 113,
    y: 645,
    size: fontSize + 5,
    font,
  });
  page.drawText(flight.counters, {
    x: 132,
    y: 623,
    size: fontSize + 5,
    font,
  });
  page.drawText(flight.gate, {
    x: 100,
    y: 602,
    size: fontSize + 5,
    font,
  });
  page.drawText(flight.destenation.code, {
    x: 368,
    y: 676,
    size: fontSize + 5,
    font,
  });
  page.drawText(
    dayjs(flight.keyMoments.planned.departure).format("DD/MM HH:mm"),
    {
      x: 370,
      y: 623,
      size: fontSize + 5,
      font,
    }
  );

  page.drawText("PS + Systems", {
    x: 405,
    y: 480,
    size: fontSize,
    font,
  });

  page.drawText(
    dayjs(flight.keyMoments.actual.countersOpening).format("HH:mm"),
    {
      x: 480,
      y: 463,
      size: fontSize,
      font,
    }
  );

  page.drawText(
    dayjs(flight.keyMoments.actual.countersOpening).format("HH:mm"),
    {
      x: 450,
      y: 433,
      size: fontSize,
      font,
    }
  );
  page.drawText("NOTYET", {
    x: 450,
    y: 398,
    size: fontSize,
    font,
  });
  page.drawText(
    dayjs(flight.keyMoments.actual.countersClosing).format("HH:mm"),
    {
      x: 370,
      y: 365,
      size: fontSize,
      font,
    }
  );
  page.drawText(
    dayjs(flight.keyMoments.actual.openningBoardingPagia).format("HH:mm"),
    {
      x: 408,
      y: 323,
      size: fontSize,
      font,
    }
  );
  page.drawText(dayjs(flight.keyMoments.actual.bordingStart).format("HH:mm"), {
    x: 452,
    y: 293,
    size: fontSize,
    font,
  });
  page.drawText(dayjs(flight.keyMoments.actual.bordingEnd).format("HH:mm"), {
    x: 468,
    y: 262,
    size: fontSize,
    font,
  });
  page.drawText(flight.PAGIAAgent as string, {
    x: 478,
    y: 233,
    size: fontSize,
    font,
  });
  page.drawText(dayjs(flight.keyMoments.actual.offBlock).format("HH:mm"), {
    x: 345,
    y: 202,
    size: fontSize,
    font,
  });

  page.drawText(String(flight.totalStrollers), {
    x: 340,
    y: 163,
    size: fontSize + 6,
    font,
  });
  page.drawText(String(flight.totalPassangers), {
    x: 435,
    y: 163,
    size: fontSize + 6,
    font,
  });
  page.drawText(String(flight.totalSuitcases), {
    x: 525,
    y: 163,
    size: fontSize + 6,
    font,
  });
};

export default drawFlightReportDate;
