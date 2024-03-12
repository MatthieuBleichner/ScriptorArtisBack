import { Resolvers } from "./types";

export const resolvers: Resolvers = {
    Query: {
        featuredTasks: (_, { filter }, context) => {
            if (!context.isAuthenticated) return null
            return context.dataSources.prismaAPI.getFeaturedTasks( filter );
        },
        task: (_, { id }, context) => {
            if (!context.isAuthenticated) return null
            return context.dataSources.prismaAPI.getTask(id);
        },
        states: (_, __, context) => {
            if (!context.isAuthenticated) return null
            return context.dataSources.prismaAPI.getStates();
        },
        tasksByState: (_, { filters }, context) => {
            if (!context.isAuthenticated) return null
            return context.dataSources.prismaAPI.getTasksByState(filters);
        },
        users: (_, __, context) => {
            if (!context.isAuthenticated) return null
            return context.dataSources.prismaAPI.getUsers();
        },
    },
    Task: {
        owner: (parent, _, context) => {
          return context.dataSources.prismaAPI.getUser(parent.ownerId)
        },
        state: (parent, _, context) => {
            if (!parent) return null
            return context.dataSources.prismaAPI.getSate(parent?.stateId)
        }
    },
    Mutation: { 
        createTask: (_, { input }, context) => {
            if (!context.isAuthenticated) return null
            return context.dataSources.prismaAPI.createTask(input);
        },
        deleteTask: (_, { input }, context) => {
            if (!context.isAuthenticated) return null
            return context.dataSources.prismaAPI.deleteTask(input.id);
        },
        updateTask: (_, { input }, context) => {
            if (!context.isAuthenticated) return null
            return context.dataSources.prismaAPI.updateTask(input);
        },
        register: (_, { input }, context) => {
            return context.dataSources.prismaAPI.addUser(input);
        },
        login: (_, { input }, context) => {
            return context.dataSources.prismaAPI.login(input);
        },
    }
  };

