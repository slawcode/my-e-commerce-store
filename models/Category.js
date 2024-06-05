const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  { // Defining fields/columns on model
    // Id column defined
    id: {
      type: DataTypes.INTEGER, // Set integer as the data type 
      allowNull: false, // Do not allow null values 
      primaryKey: true, // Set as the primary key
      autoIncrement: true, // Auto increment values for new records
    },
    // Category_name column defined
    category_name: {
      type: DataTypes. STRING, // Set string as the data type
    }
  },
  {
    // Link to database connection
    sequelize,
    // Set to false to remove 'created_at' and 'updated_at' fields
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
