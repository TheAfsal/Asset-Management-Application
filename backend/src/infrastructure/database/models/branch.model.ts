import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize.config";

class BranchModel extends Model {}

BranchModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING },
    code: { type: DataTypes.STRING, unique: true, allowNull: false },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { sequelize, tableName: "branches", timestamps: false }
);

export { BranchModel };
