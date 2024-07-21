const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Student;
};