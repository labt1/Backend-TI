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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("./mongoose");
const routes_1 = require("../routes");
const dotenv = __importStar(require("dotenv"));
class Server {
    constructor() {
        this.port = process.env.PORT || 3001;
        this.settings__cors = () => {
            this.app.use((req, res, next) => {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Authorization,token, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
                res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
                res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
                next();
            });
        };
        dotenv.config();
        this.app = express_1.default();
        mongoose_1.connect__mongoDB();
        this.settings__json();
        this.settings__cors();
        this.settings__routes();
    }
    settings__json() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    settings__routes() {
        this.app.get("/", (req, res) => {
            res.status(200).json({ message: "the server is active" });
        });
        this.app.use(routes_1.Routes);
    }
    run__start() {
        this.app.listen(this.port, () => {
            console.log(`The server running successfully in port http://localhost:${this.port}`);
        });
    }
}
exports.Server = Server;
