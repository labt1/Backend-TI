"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("./user");
const silabo_1 = require("./silabo");
const curso_1 = require("./curso");
exports.Routes = express_1.default();
exports.Routes.use('', user_1.user_router);
exports.Routes.use('', silabo_1.silabo_router);
exports.Routes.use('', curso_1.curso_router);
