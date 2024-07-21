import Student from './models/Students';
import Mark from './models/Marks';

const resolvers = {
  Query: {
    students: async () => {
      try {
        return await Student.findAll({
          include: [Mark] 
        });
      } catch (error) {
        throw new Error('Error fetching students');
      }
    },

    student: async (parent, args) => {
      try {
        return await Student.findByPk(args.id, {
          include: [Mark] 
        });
      } catch (error) {
        throw new Error('Error fetching student');
      }
    }
  },

  Mutation: {
    addStudent: async (parent, args) => {
      try {
        return await Student.create({
          first_name: args.first_name,
          last_name: args.last_name
        });
      } catch (error) {
        throw new Error('Error adding student');
      }
    },

    addMark: async (parent, args) => {
      try {
        return await Mark.create({
          discipline: args.discipline,
          mark: args.mark,
          student_id: args.student_id
        });
      } catch (error) {
        throw new Error('Error adding mark');
      }
    }
  }
};

export default resolvers;