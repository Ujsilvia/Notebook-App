import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
interface LoginAttributes {
  id: string;
  title: string;
  completed: boolean;
  userid:string;
}

export class LoginInstance extends Model<LoginAttributes> {}

LoginInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userid:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize: db,
    tableName: "notes"
  }
);
