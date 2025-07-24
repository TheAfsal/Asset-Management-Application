import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize.config';

class ManufacturerModel extends Model {}

ManufacturerModel.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { sequelize, tableName: 'manufacturers', timestamps: false });

export { ManufacturerModel };