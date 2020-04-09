import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import logger from "morgan";
import inscriptions from "./routes/inscriptions";

config();

mongoose.set("useFindAndModify", false);

const app = express();
const { DB_USER, DB_PASS, PORT = 3000 } = process.env;

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@inscriptions-nqwe6.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.use(cors());
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/inscriptions", inscriptions);

app.get("/", (req, res) => {
  res.send("API-inscriptions");
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  app.listen(PORT, () => {
    console.log("Server up and running on localhost:" + PORT);
  });
});
