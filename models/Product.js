// Import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// Import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// Set up fields and rules for Product model
Product.init(
  {
    // Id column defined
    id: { 
      type: DataTypes.INTEGER, // Set integer as the data type
      allowNull: false, // Do not allow null values
      primaryKey: true, // Set as the primary key
      autoIncrement: true, // Auto increment values for new records
    },
    // Product name colum defined
    product_name: {
      type: DataTypes.STRING, // Set string as the data type 
    },
    // Price column defined
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false, // Do not allow null values
      validate: {
        isDecimal: true, // Validates that the value is a decimal number 
      },
    },
    // Stock column defined
    stock: { 
      type: DataTypes.INTEGER, // Set integer as the data type
      allowNull: false, 
      defaultValue: 10, // Set the default value to 10
      validate: {
        isNumeric: true, // Validates that the number is numeric
      },
    },
    // Category_id column defined
    category_id: { 
      type: DataTypes.INTEGER, // Set integer as the data type
      references: {
        model: "category", // References the 'Category' models id
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
