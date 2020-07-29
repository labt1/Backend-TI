"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cursoModel = exports.silaboModel = exports.userModel = exports.connect__mongoDB = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const user_1 = require("../models/user");
const silabo_1 = require("../models/silabo");
const curso_1 = require("../models/curso");
exports.connect__mongoDB = () => {
    mongoose_1.default.set("useFindAndModify", false);
    mongoose_1.default
        .connect("mongodb+srv://revan:xMLm8DHdprY6ofN3yRDJYny7GGGxqSmf26BTDvhfQicBhJpfFiKFHv@cluster0.2hznd.mongodb.net/sgl?retryWrites=true&w=majority", {
        useCreateIndex: true,
        useNewUrlParser: true,
        dbName: "sgl",
        useUnifiedTopology: true,
    })
        .then(() => {
        console.log("=======================================================");
        console.log("===========MongoDB connect successfully===========");
        console.log("=======================================================");
    })
        .catch((err) => {
        console.log("=======================================================");
        console.log(err);
        console.log("===========Failed to connect database===========");
    });
};
exports.userModel = mongoose_1.model("User", user_1.userSchema);
exports.silaboModel = mongoose_1.model("Silabo", silabo_1.silaboSchema);
exports.cursoModel = mongoose_1.model("Curso", curso_1.cursoSchema);
