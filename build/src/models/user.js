"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const validRoles = {
    values: ['STUDENT_ROLE', 'TEACHER_ROLE']
};
const required = (field) => {
    return [true, `the ${field} is required`];
};
exports.userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: required('name')
    },
    surname: {
        type: String,
        required: required('surname')
    },
    phone: {
        type: Number,
        required: false,
        min: 9
    },
    university: {
        type: String,
        default: 'UNSA',
        required: required('university')
    },
    semestre: {
        type: String,
        required: false
    },
    year: {
        type: String,
        required: false
    },
    career: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: required('email'),
        minlength: 10
    },
    password: {
        type: String,
        required: required('password')
    },
    role: {
        type: String,
        required: required('role'),
        default: 'STUDENT_ROLE',
        enum: validRoles
    },
    state: {
        type: Boolean,
        required: true,
        default: true,
    }
});
exports.userSchema.plugin(mongoose_unique_validator_1.default, {
    message: '{PATH} debe ser único'
});
exports.userSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};
