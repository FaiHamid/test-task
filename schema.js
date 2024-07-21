import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import Student from './models/Students';
import Mark from './models/Marks';

const MarkType = new GraphQLObjectType({
  name: 'Mark',
  fields: () => ({
    id: { type: GraphQLString },
    discipline: { type: GraphQLString },
    mark: { type: GraphQLInt }
  })
});

const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: () => ({
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    marks: {
      type: new GraphQLList(MarkType),
      resolve: async (student) => {
        return await Mark.findAll({ where: { student_id: student.id } });
      }
    }
  })
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    students: {
      type: new GraphQLList(StudentType),
      resolve: async () => {
        return await Student.findAll();
      }
    },
    student: {
      type: StudentType,
      args: { id: { type: GraphQLString } },
      resolve: async (parent, args) => {
        return await Student.findByPk(args.id);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addStudent: {
      type: StudentType,
      args: {
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        return await Student.create({
          first_name: args.first_name,
          last_name: args.last_name
        });
      }
    },
    addMark: {
      type: MarkType,
      args: {
        discipline: { type: GraphQLString },
        mark: { type: GraphQLInt },
        student_id: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        return await Mark.create({
          discipline: args.discipline,
          mark: args.mark,
          student_id: args.student_id
        });
      }
    }
  }
});

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation
});