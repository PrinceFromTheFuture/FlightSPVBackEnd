import express from "express";
import * as mongoose from "mongoose";
import { configDotenv } from "dotenv";
import flightsRouter from "./routes/flightsRouter.js";
import agentsRouter from "./routes/agentsRouter.js";
import airportsRouter from "./routes/airportsRouter.js";
import bodyParser from "body-parser";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import cors from "cors";
configDotenv();
dayjs.extend(customParseFormat);
const app = express();
app.use(cors());
const applicationPort = process.env.PORT || 3000;
const DBConnectionString = process.env.DB;
app.use(express.Router());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/flights", flightsRouter);
app.use("/agents", agentsRouter);
app.use("/airports", airportsRouter);
app.listen(applicationPort, async () => {
    console.log(`flight SPV application api server is live and listening on port ${applicationPort}`);
    if (DBConnectionString) {
        try {
            await mongoose.connect(DBConnectionString);
            console.log("connected to DB");
        }
        catch (e) {
            console.log(e);
        }
    }
    else {
        console.log("please config DB connection string ");
    }
});
app.get("/", async (req, res) => {
    res.send("Welcome To Flight SPV API");
});
//# sourceMappingURL=server.js.map