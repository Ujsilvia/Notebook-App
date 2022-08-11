import { StringRegexOptions } from "joi";
import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
import { LoginInstance } from "./login";
interface TodoAttributes {
  id: string;
  note: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  password: string;
}

export class TodoInstance extends Model<TodoAttributes> {}

TodoInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
  },
  {
    sequelize: db,
    tableName: "user",
  }
); 

//To different between which user created a note or logged in at a particular time

TodoInstance.hasMany(LoginInstance,{foreignKey:'userid', as: 'notes'})
LoginInstance.belongsTo(TodoInstance,{foreignKey:'userid', as: 'user'})
