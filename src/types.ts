import { Dayjs } from "dayjs";
import { Schema, model } from "mongoose";

export type agentType = {
  name: string;
  role: "SPV" | "Agent" | "Ramp Agent";
  workerID: string;
  agentId: string;
  phone: string;
  email: string;
};
export type flightCrewType = {
  agents: agentType[];
  SPV: agentType;
  rampAgent: agentType;
};
export type airportType = {
  code: string;
  name: string;
  airportId: string;
};
export interface tlvFlightInterface {
  dateString: string;
  flightNumber: string;
  city: string;
  counters: string;
  localApplicationId: number;
}
export interface flightSchemaInterface {
  personalRole: string;
  counters: string;
  crew: {
    agents: { agent: Schema.Types.ObjectId | string; notes?: string }[];
    SPV: { agent: Schema.Types.ObjectId | string; notes?: string } | null;
    rampAgent: {
      agent: Schema.Types.ObjectId | string;
      notes?: string;
    } | null;
  };
  destenation: Schema.Types.ObjectId | string;
  origin: Schema.Types.ObjectId | string;
  flightNumber: string;
  gate: string;
  flightId: string;
  keyMoments: {
    planned: {
      shiftStarts: string;
      countersOpening: string;
      countersClosing: string;
      bording: string;
      departure: string;
    };
    actual: {
      countersOpening: string;
      countersClosing: string;
      bordingEnd: string;
      bordingStart: string;
      offBlock: string;
      openningBoardingPagia: string;
    };
  };
  flightTime: string;
  PAGIAAgent: String;

  totalPassangers: number;
  totalStrollers: number;
  totalSuitcases: number;
  localApplicationId: number;
}
export interface flightInterface {
  personalRole: "SPV" | "Agent";
  flightNumber: string;
  flightId: string;
  origin: airportType;
  destenation: airportType;
  flightTime: string;
  counters: string;
  keyMoments: {
    planned: {
      shiftStarts: Dayjs | string;
      countersOpening: Dayjs | string;
      countersClosing: Dayjs | string;
      bording: Dayjs | string;
      departure: Dayjs | string;
    };
    actual: {
      countersOpening: Dayjs | string;
      countersClosing: Dayjs | string;
      bordingEnd: Dayjs | string;
      bordingStart: Dayjs | string;
      offBlock: Dayjs | string;
      openningBoardingPagia: Dayjs | string;
    };
  };
  crew: flightCrewType;

  gate: string;
  PAGIAAgent: string;
  totalPassangers: number;
  totalSuitcases: number;
  totalStrollers: number;
}

export interface tlvAvalableFlight {
  Flight: string;
  City: string;
  date: string;
  id: string;
  Counter: null | string;
}
[];
