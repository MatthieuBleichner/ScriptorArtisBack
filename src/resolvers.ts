import { Resolvers } from "./types";

export const resolvers: Resolvers = {
    Query: {
        featuredTasks: (_, __, { dataSources }) => {
            return dataSources.prismaAPI.getFeaturedTasks();
        },
        task: (_, { id }, { dataSources }) => {
            return dataSources.prismaAPI.getTask(id);
        },
    },
    Mutation: { 
        createTask: (_, { input }, { dataSources }) => {
            return dataSources.prismaAPI.createTask(input);
        },
        deleteTask: (_, { input }, { dataSources }) => {
            return dataSources.prismaAPI.deleteTask(input.id);
        },
        updateTask: (_, { input }, { dataSources }) => {
            return dataSources.prismaAPI.updateTask(input);
        },
    }
  };

