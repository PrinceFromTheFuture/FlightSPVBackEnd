var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import * as mongoose from "mongoose";
import { configDotenv } from "dotenv";
import flightsRouter from "./routes/flightsRouter";
import agentsRouter from "./routes/agentsRouter";
import airportsRouter from "./routes/airportsRouter";
import * as bodyParser from "body-parser";
configDotenv();
const app = express();
const applicationPort = process.env.PORT || 3000;
const DBConnectionString = process.env.DB;
app.use(express.Router());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/flights", flightsRouter);
app.use("/agents", agentsRouter);
app.use("/airports", airportsRouter);
app.listen(applicationPort, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`flight SPV application api server is live and listening on port ${applicationPort}`);
    if (DBConnectionString) {
        try {
            yield mongoose.connect(DBConnectionString);
            console.log("connected to DB");
        }
        catch (e) {
            console.log(e);
        }
    }
    else {
        console.log("please config DB connection string ");
    }
}));
//# sourceMappingURL=server.js.map