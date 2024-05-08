import { Agent } from "http";
import mongoose, { Schema } from "mongoose";

export type agentType = {
  name: string;
  role: "SPV" | "Agent" | "Ramp Agent";
  workerID: string;
  agentId: string;
  phone: string;
  email: string;
};
export type flightCrewType = {
  agents: { agent: agentType[]; notes?: string };
  SPV: { agent: agentType[]; notes?: string };
  rampAgent: { agent: agentType[]; notes?: string };
};
export type airportType = {
  code: string;
  name: string;
};
export interface tlvFlightInterface {
  dateString: string;
  flightNumber: string;
  city: string;
  counters: string;
  localApplicationId: number;
}

export interface Message {
  author: mongoose.Schema.Types.ObjectId | agentType | string;
  messageType: "image" | "text";
  content: string;
}
export interface flightConversation {
  messages: Message[];
  flight: mongoose.Schema.Types.ObjectId;
}
export interface flightInterface {
  crew: flightCrewType;
  flightConversation: flightConversation;
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
  _id: string;
  personalRole: string;
  counters: string;
  destenation: airportType;
  origin: airportType;
  flightNumber: string;
  gate: string;
  flightId: string;
  flightTime: string;
  PAGIAAgent: string;
  totalPassangers: number;
  totalStrollers: number;
  totalSuitcases: number;
  localApplicationId: number;
  __v?: 0;
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
      arrivedToGate: string;
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
  flightConversation: Schema.Types.ObjectId;
}

export type flightReportKeyMoments =
  | "countersOpening"
  | "countersClosing"
  | "bordingEnd"
  | "bordingStart"
  | "openningBoardingPagia"
  | "offBlock";
