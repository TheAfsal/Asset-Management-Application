import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from '../sequelize.config';

class GrnHeaderModel extends Model {}
class GrnLineItemModel extends Model {}

GrnHeaderModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    grn_number: { type: DataTypes.STRING, unique: true, allowNull: false },
    grn_date: { type: DataTypes.DATEONLY, allowNull: false }, // Use DATEONLY for YYYY-MM-DD
    invoice_number: { type: DataTypes.STRING, allowNull: false },
    vendor_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.ENUM('draft', 'submitted'), defaultValue: 'draft' },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'grn_headers',
    timestamps: true, // Enable timestamps to manage created_at/updated_at
    createdAt: 'created_at', // Map to custom column names
    updatedAt: 'updated_at',
  }
);

GrnLineItemModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    grn_id: { type: DataTypes.INTEGER, allowNull: false },
    subcategory_id: { type: DataTypes.INTEGER, allowNull: false },
    item_description: { type: DataTypes.STRING, allowNull: true }, // Allow null for consistency
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    unit_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    tax_percent: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
    taxable_value: { type: DataTypes.DECIMAL(10, 2), allowNull: true }, // Allow null for consistency
    total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'grn_line_items',
    timestamps: true, // Enable timestamps to manage created_at/updated_at
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

// Define associations with alias
GrnHeaderModel.hasMany(GrnLineItemModel, {
  foreignKey: 'grn_id',
  as: 'lineItems', // Add alias to match repository query
  onDelete: 'CASCADE', // Ensure line items are deleted when header is deleted
});
GrnLineItemModel.belongsTo(GrnHeaderModel, {
  foreignKey: 'grn_id',
  as: 'grn', 
});

export { GrnHeaderModel, GrnLineItemModel };