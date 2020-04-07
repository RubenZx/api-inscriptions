"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = require("dotenv");
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var morgan_1 = __importDefault(require("morgan"));
var inscriptions_1 = __importDefault(require("./routes/inscriptions"));
dotenv_1.config();
mongoose_1.default.set("useFindAndModify", false);
var app = express_1.default();
var _a = process.env, DB_USER = _a.DB_USER, DB_PASS = _a.DB_PASS, _b = _a.PORT, PORT = _b === void 0 ? 3000 : _b;
mongoose_1.default.connect("mongodb+srv://" + DB_USER + ":" + DB_PASS + "@inscriptions-nqwe6.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(morgan_1.default("dev"));
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use("/inscriptions", inscriptions_1.default);
app.get("/", function (req, res) {
    res.send("Hello World!");
});
var db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
    app.listen(PORT, function () {
        console.log("Server up and running on localhost:" + PORT);
    });
});
