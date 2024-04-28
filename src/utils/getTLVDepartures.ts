// The following function accepts timeframe
// and returns all departures from TLV airport in that timeframe by
// fetching the data in real time from TLV website database
// it returs all necessey data plus a unique identefier
// for that flight that can be located later on

import axios from "axios";
import dayjs from "dayjs";
import { tlvFlightInterface } from "../types.js";
import { url, headers } from "../data/tlvAPIRequest.js";

interface getTLVDeparturesInterface {
  from: string;
  to: string;
}

interface TLVserverResponseInterface {
  Flights: {
    CheckInUrl: string;
    Counter: string;
    Airline: string;
    Flight: string;
    Terminal: string;
    Status: string;
    City: string;
    Country: null;
    StatusColor: string;
    ScheduledDateTime: string;
    ScheduledDate: string;
    ScheduledTime: string;
    UpdatedDateTime: string | null;
    UpdatedDate: string | null;
    UpdatedTime: string | null;
    CurrentCultureName: string;
  }[];
}

export const getTLVDepartures = async ({
  from,
  to,
}: getTLVDeparturesInterface) => {
  const formatedDates = {
    from: dayjs(from).format("M/D/YYYY"),
    to: dayjs(to).format("M/D/YYYY"),
  };
  console.log(from, to);
  const data = new URLSearchParams({
    FlightType: "Outgoing",
    AirportId: "LLBG",
    UICulture: "en-US",
    City: "",
    Country: "",
    AirlineCompany: "",
    FromDate: formatedDates.from,
    ToDate: formatedDates.to,
    ufprt:
      "BD24E729B685C2F466888C2E710D7384423B0AE4406453EDC7E34CBD7EB498C33415F21E57F5797AC0B285A0C51DBD46B70CEB940D456AD0B21B4144F02BB374300858590552AFEEC2B2946E957382796669C3E999F27D354254E839B855BCB2BD18BFB002880D1B56C764BDF510978D5CCC56D25208F1F1CC444A8DD9136393F9B7B4034C26F45A6E906D21BDA9CB00.cookies",
  });

  const response = await axios.post<TLVserverResponseInterface>(url, data, {
    headers,
  });
  // filter only the flights responsible by aeroHandling to be processed
  const filterOptions = ["iz", "ux", "j2", "cy", "et", "qs", "wz", "hy"]; // Add more options as needed
  const aeroFlights = response.data.Flights.filter((flight) => {
    const flightCode = flight.Flight.toLowerCase();
    return filterOptions.some((option) => flightCode.includes(option));
  });

  //declear the returned data
  let flights: tlvFlightInterface[] = [];

  //maping over the response.data and returning flitered flights
  for (const flight of aeroFlights) {
    const {
      ScheduledDate,
      ScheduledTime,
      UpdatedDate,
      UpdatedTime,
      City,
      Counter,
      Flight,
    } = flight;

    let date: string = "";
    let time: string = "";

    if (UpdatedDate == null || UpdatedTime == null) {
      date = ScheduledDate;
      time = ScheduledTime;
    } else {
      date = UpdatedDate;
      time = UpdatedTime;
    }

    const dateString = dayjs(`${date}/2024 ${time}`, "DD/MM/YYYY HH:mm")
      .subtract(3, "hour")
      .toISOString();

    const newFlight: tlvFlightInterface = {
      flightNumber: Flight,
      city: City,
      dateString: dateString,
      counters: Counter,
      localApplicationId: dayjs(dateString).unix(),
    };
    flights.push(newFlight);
  }

  return flights;
};
