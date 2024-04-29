import { PDFDocument, StandardFonts } from "pdf-lib";
import fs from "fs";
import { getPopulatedFlightById } from "../getPopulatedFlights.js";
import mongoose from "mongoose";
import drawFlightReportDate from "./drawFlightReportDate.js";

export async function createAndWritePdf() {
  const ExsitingPdfBytes = fs.readFileSync("flightreport.pdf");
  const pdfDoc = await PDFDocument.load(ExsitingPdfBytes);
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pages = pdfDoc.getPages();

  const firstPage = pages[0];

  const flight = await getPopulatedFlightById(
    new mongoose.Types.ObjectId("662edbd91290e933b245d57a")
  );
  if (!flight) {
    return;
  }

  drawFlightReportDate(flight, firstPage, timesRomanFont);

  const pdfBytes = await pdfDoc.save();

  // Write the PDF bytes to a file
  fs.writeFile("./output.pdf", pdfBytes, (error) => {
    if (error) {
      console.error("Error writing PDF file:", error);
      return;
    }
    console.log("PDF file has been written successfully.");
  });
}
