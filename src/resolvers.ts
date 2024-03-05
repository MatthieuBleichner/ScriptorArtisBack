import { Resolvers } from "./types";

export const resolvers: Resolvers = {
    Query: {
        featuredTasks: (_, { filter }, { dataSources }) => {
            return dataSources.prismaAPI.getFeaturedTasks( filter );
        },
        task: (_, { id }, { dataSources }) => {
            return dataSources.prismaAPI.getTask(id);
        },
        states: (_, __, { dataSources }) => {
            return dataSources.prismaAPI.getStates();
        },
        tasksByState: (_, { filters }, { dataSources }) => {
            return dataSources.prismaAPI.getTasksByState(filters);
        }
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

