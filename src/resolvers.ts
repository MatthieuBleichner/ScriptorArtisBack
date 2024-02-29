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
  };

