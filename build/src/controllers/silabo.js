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
exports.addNewCurso = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("../db/mongoose");
const silaboPdfCurso = (objectSilabo, objectCurso, user) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.startSession();
    session.startTransaction();
    try {
        const opts = { session };
        yield mongoose_2.silaboModel.createCollection();
        yield mongoose_2.cursoModel.createCollection();
        let objectSilabos = new mongoose_2.silaboModel({
            title: objectSilabo.title,
            year: objectSilabo.year,
            semestre: objectSilabo.semestre,
            pdfname: objectSilabo.pdfname,
            pdfurl: objectSilabo.pdfurl,
            user
        });
        let silabo = yield objectSilabos.save(opts);
        let objectCursos = new mongoose_2.cursoModel({
            name: objectCurso.name,
            teacher: user,
            silabo: silabo._id
        });
        let curso = yield objectCursos.save(opts);
        yield session.commitTransaction();
        session.endSession();
        return curso;
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        throw err;
    }
});
exports.addNewCurso = (req, res) => {
    let { body, query } = req;
    silaboPdfCurso(body.objectSilabo, body.objectCurso, query.user._id)
        .then((response) => {
        res.status(201).json({
            data: response
        });
    })
        .catch(err => {
        res.status(400).json({
            error: {
                message: err.message
            }
        });
    });
};
