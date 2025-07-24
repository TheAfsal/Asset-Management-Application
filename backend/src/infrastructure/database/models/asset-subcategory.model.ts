import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize.config";
import { AssetCategoryModel } from "./asset-category.model";

class AssetSubcategoryModel extends Model {}

AssetSubcategoryModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { sequelize, tableName: "asset_subcategories", timestamps: false }
);

AssetSubcategoryModel.belongsTo(AssetCategoryModel, {
  foreignKey: "category_id",
});

export { AssetSubcategoryModel };
