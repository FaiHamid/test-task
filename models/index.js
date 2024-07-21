const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('d6pf58bdhp9p7c', 'ua952kdg82027q', 'p3079af17a7ac6012721f93c5279757e34db7f30704a1501d3a7d9710b8c20a4f', {
  host: 'c3l5o0rb2a6o4l.cluster-czz5s0kz4scl.eu-west-1.rds.amazonaws.com',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  }
});


const Student = require('./Student')(sequelize, DataTypes);
const Mark = require('./Mark')(sequelize, DataTypes);


Student.hasMany(Mark, { foreignKey: 'student_id' });
Mark.belongsTo(Student, { foreignKey: 'student_id' });


module.exports = { sequelize, Student, Mark };