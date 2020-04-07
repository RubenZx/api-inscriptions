"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var InscriptionSchema = new mongoose_1.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    age: Number,
    email: { type: String, required: true, unique: true },
    ticket: { type: Boolean, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
});
exports.default = mongoose_1.default.model("Inscription", InscriptionSchema);
