const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Mark = sequelize.define('Mark', {
    discipline: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mark: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Mark;
};