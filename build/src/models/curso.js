"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cursoSchema = void 0;
const mongoose_1 = require("mongoose");
exports.cursoSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'the name is required']
    },
    teacher: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    silabo: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Silabo',
            required: true
        }
    ],
    student: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }
    ]
});
