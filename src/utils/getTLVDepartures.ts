// The following function accepts timeframe
// and returns all departures from TLV airport in that timeframe by
// fetching the data in real time from TLV website database
// it returs all necessey data plus a unique identefier
// for that flight that can be located later on

import axios from "axios";
import * as dayjs from "dayjs";
import { tlvFlightInterface } from "../types";

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

  //website db url
  const url =
    "https://www.iaa.gov.il/umbraco/surface/FlightBoardSurface/Search";

  // Headers
  const headers = {
    Accept: "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Cookie:
      "__uzma=a975f58d-d270-4069-aab9-aecf8e6c52f6; __uzmb=1711016084; __uzme=2685; IAA.lang=en-US; TS01512257=01feb52f0a64dda426b05a33afb2d29e50b2192323125f60ee152b47a8c5e62db9ce5465ca70287e284f710c2c578023f0cc811569a35807d2c99d37f2946cbaccb70f1af0; _ga=GA1.1.1369569106.1711016085; __uzmc=489691939768; __uzmd=1711016097; __uzmf=7f600015445b95-6cc0-4a03-bfe6-0affa7b278de171101608438113644-67a4729ae31914f519; uzmx=7f9000c0f5dffe-2e04-4bbf-908f-ed0f16e6f91c1-171101608438113644-a3c7fcc868a918a719; _ga_MH26H2TCLH=GS1.1.1711016085.1.1.1711016098.0.0.0",
    Origin: "https://www.iaa.gov.il",
    Referer: "https://www.iaa.gov.il/en/airports/ben-gurion/flight-board/",
    "Sec-Ch-Ua":
      '"Chromium";v="122", "Not(A:Brand";v="24", "Microsoft Edge";v="122"',
    "Sec-Ch-Ua-Mobile": "?1",
    "Sec-Ch-Ua-Platform": '"Android"',
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36 Edg/122.0.0.0",
    "X-Requested-With": "XMLHttpRequest",
  };

  // Payload
  const data = new URLSearchParams();
  data.append("FlightType", "Outgoing");
  data.append("AirportId", "LLBG");
  data.append("UICulture", "en-US");
  data.append("City", "");
  data.append("Country", "");
  data.append("AirlineCompany", "");
  data.append("FromDate", formatedDates.from);
  data.append("ToDate", formatedDates.to);
  data.append(
    "ufprt",
    "2DBBDC8EF4097408230761784E89B89326540ED8CE0692108C79AA69FD557FC4CB856E7B46B8819B892CDD446710A557F3BBD467076347C56AE0B08F4A9F47097B1963888521028EA1AF5AC2267AA86B6737E7A8758F0F3664E30269478515B7AA2BD8F524FD4026B66B87C007FA33060BC9C92337A6BD6DD893A1B8C9D41D73FEE4C5589C12761BF562E70289DBAEDD"
  );

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
    const dateString = `${date}/${dayjs(from).get("years")} ${time}`;

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
