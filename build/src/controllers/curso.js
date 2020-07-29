"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCursosTeacher = exports.registerCurso = exports.getCursosAll = exports.getCursos = void 0;
const mongoose_1 = require("../db/mongoose");
exports.getCursos = (req, res) => {
    let { user } = req.query;
    mongoose_1.cursoModel.find()
        .where({ student: user._id })
        .populate('silabo', 'title pdfname pdfurl')
        .populate('teacher', 'name surname email')
        .exec((err, cursos) => {
        if (err) {
            return res.status(500).json({
                error: {
                    message: err.message
                }
            });
        }
        if (cursos.length === 0) {
            return res.status(404).json({
                error: {
                    message: 'no se encontraron los cursos'
                }
            });
        }
        res.status(200).json({
            data: cursos
        });
    });
};
exports.getCursosAll = (req, res) => {
    mongoose_1.cursoModel.find()
        .populate('silabo', 'title pdfname pdfurl')
        .populate('teacher', 'name surname email')
        .exec((err, cursos) => {
        if (err) {
            return res.status(500).json({
                error: {
                    message: err.message
                }
            });
        }
        if (cursos.length === 0) {
            return res.status(404).json({
                error: {
                    message: 'no se encontraron los cursos'
                }
            });
        }
        res.status(200).json({
            data: cursos
        });
    });
};
exports.registerCurso = (req, res) => {
    let { id } = req.params;
    let { query } = req;
    let body = { student: query.user };
    const options = {
        new: true
    };
    mongoose_1.cursoModel.findByIdAndUpdate(id, body, options, (err, cursoDB) => {
        if (err) {
            return res.status(500).json({
                error: {
                    message: err.message
                }
            });
        }
        if (!cursoDB) {
            res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }
        res.status(200).json({
            data: cursoDB
        });
    });
};
// maestro
// export const getCursoById = (req: Request, res: Response) => {
//     let {user} : any = req.query;
//     let {id} = req.params;
//     cursoModel.findById(id)
//         .where({teacher: user._id})
//         .exec((err, cursoDB) => {
//             if(err) {
//                 return res.status(500).json({
//                     error: {
//                         message: err.message
//                     }
//                 })
//             }
//             if(!cursoDB) {
//                 return res.status(404).json({
//                     error: {
//                         message: 'id incorrecto'
//                     } 
//                 })
//             }
//             res.status(200).json({
//                 data: cursoDB
//             })
//         })
// }
exports.getCursosTeacher = (req, res) => {
    let { user } = req.query;
    mongoose_1.cursoModel.find()
        .where({ teacher: user._id })
        .populate('silabo')
        .exec((err, cursos) => {
        if (err) {
            return res.status(500).json({
                error: {
                    message: err.message
                }
            });
        }
        if (cursos.length === 0) {
            return res.status(404).json({
                error: {
                    message: 'no se encontraron los cursos'
                }
            });
        }
        res.status(200).json({
            data: cursos
        });
    });
};
