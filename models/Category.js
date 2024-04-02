const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // Id column defined
    id: {
      type: Datatypes.INTEGER, // Set integer as the data type 
      allowNull: false, // Do not allow null values 
      primaryKey: true, // Set as the primary key
      autoIncrement: true, // Auto increment values for new records
    },
    // Category_name colum defined
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
