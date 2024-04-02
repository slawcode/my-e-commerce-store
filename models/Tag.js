const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    // Tag columns defined 
    id: {
      type: DataTypes.INTEGER, // Set integer as the data type 
      allowNull: false, // Do not allow null values
      primaryKey: true, // Set as the primary key 
      autoIncrement: true, // Auto increment values for new records
    },
    tag_name: {
      type: DataTypes.STRING, // Set integer as the data type
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
