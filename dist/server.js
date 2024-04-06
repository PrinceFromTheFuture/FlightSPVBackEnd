"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const dotenv_1 = require("dotenv");
const flightsRouter_1 = require("./routes/flightsRouter");
const agentsRouter_1 = require("./routes/agentsRouter");
const airportsRouter_1 = require("./routes/airportsRouter");
const bodyParser = require("body-parser");
(0, dotenv_1.configDotenv)();
const app = express();
const applicationPort = process.env.PORT || 3000;
const DBConnectionString = process.env.DB;
app.use(express.Router());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/flights", flightsRouter_1.default);
app.use("/agents", agentsRouter_1.default);
app.use("/airports", airportsRouter_1.default);
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