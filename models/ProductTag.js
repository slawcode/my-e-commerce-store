const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // Product_tag column defined
    id: {
      type: DataTypes.INTEGER, // Set integer as data type
      allowNull: false, // Do not allow null values
      primaryKey: true, // Set as the primary key
      autoIncrement: true, // Auto increment values for new records
  },
    product_id: {
      type: DataTypes.INTEGER, // Set integer as data type
      references: {
        model: "product",  // References the 'Product' table
        key: "id", // References the 'Product' models id 
      }
  },
    tag_id: {
      type: DataTypes. INTEGER, // Set integer as the data type
      references: {
        model: "tag", // References the 'Tag' table
        key: "id", // References the 'Tag' models id
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
