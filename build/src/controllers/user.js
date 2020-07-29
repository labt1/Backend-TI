"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.logged = exports.checkinUser = void 0;
const mongoose_1 = require("../db/mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.checkinUser = (req, res) => {
    let { body } = req;
    let objectUser = new mongoose_1.userModel({
        name: body.name,
        surname: body.surname,
        phone: body.phone,
        university: body.university,
        semestre: body.semestre,
        year: body.year,
        career: body.career,
        email: body.email,
        password: bcrypt_1.default.hashSync(body.password, 10),
        role: body.role
    });
    objectUser.save((err, userDB) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: {
                    message: err.message
                }
            });
        }
        let access_token = jsonwebtoken_1.default.sign({ user: userDB }, 'code', { expiresIn: 60 * 60 * 24 * 30 });
        res.status(201).json({
            data: userDB,
            access_token
        });
    });
};
exports.logged = (req, res) => {
    let { body } = req;
    mongoose_1.userModel.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                error: {
                    message: err.message
                }
            });
        }
        if (!userDB) {
            return res.status(404).json({
                error: {
                    message: 'wrong username or password'
                }
            });
        }
        if (!bcrypt_1.default.compareSync(body.password, userDB.password)) {
            return res.status(404).json({
                error: {
                    message: 'wrong username or password'
                }
            });
        }
        let access_token = jsonwebtoken_1.default.sign({ user: userDB }, 'code', { expiresIn: 60 * 60 * 24 * 30 });
        res.status(200).json({
            data: {
                user: userDB,
                access_token
            }
        });
    });
};
exports.getUser = (req, res) => {
    let { user } = req.query;
    mongoose_1.userModel.findById(user._id)
        .exec((err, userDB) => {
        if (err) {
            return res.status(500).json({
                error: {
                    message: err.message
                }
            });
        }
        if (!userDB) {
            return res.status(404).json({
                error: {
                    message: 'id incorrecto'
                }
            });
        }
        res.status(200).json({
            data: userDB
        });
    });
};
