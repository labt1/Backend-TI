"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.silabo_router = void 0;
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const silabo_1 = require("../controllers/silabo");
exports.silabo_router = express_1.Router();
exports.silabo_router.post('/silabo-add', authentication_1.verificaToken, authentication_1.verificaAdmin_Role, silabo_1.addNewCurso);
