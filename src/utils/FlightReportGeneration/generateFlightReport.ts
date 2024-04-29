import { PDFDocument, StandardFonts } from "pdf-lib";
import fs from "fs";
import { getPopulatedFlightById } from "../getPopulatedFlights.js";
import drawFlightReportDate from "./drawFlightReportDate.js";

const generateFlightReport = async (flightId: string) => {
  const ExsitingPdfBytes = fs.readFileSync("flightreport.pdf");
  const pdfDoc = await PDFDocument.load(ExsitingPdfBytes);
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pages = pdfDoc.getPages();

  const firstPage = pages[0];

  const flight = await getPopulatedFlightById(flightId);
  if (!flight) {
    return;
  }

  drawFlightReportDate(flight, firstPage, timesRomanFont);

  const flightReportPDFFile = await pdfDoc.save();

  return flightReportPDFFile;
};

export default generateFlightReport;
