"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const login_1 = require("./login");
class TodoInstance extends sequelize_1.Model {
}
exports.TodoInstance = TodoInstance;
TodoInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    note: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "firstname is required",
            },
            notEmpty: {
                msg: "please provide a firstname",
            },
        },
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Lastname is required",
            },
            notEmpty: {
                msg: "Please provide a lastname",
            },
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: "Email is required",
            },
            isEmail: {
                msg: "Please provide a valid email",
            },
        },
    },
    phonenumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: "Phonenumber is required",
            },
            notEmpty: {
                msg: "please provide a valid Phonenumber",
            },
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Password is required",
            },
            notEmpty: {
                msg: "please provide a strong password",
            },
        },
    },
}, {
    sequelize: database_config_1.default,
    tableName: "user",
});
//To different between which user created a note or logged in at a particular time
TodoInstance.hasMany(login_1.LoginInstance, { foreignKey: 'userid', as: 'notes' });
login_1.LoginInstance.belongsTo(TodoInstance, { foreignKey: 'userid', as: 'user' });
