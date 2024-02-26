import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import path from "path";
import { gql } from "graphql-tag";
import { resolvers } from "./resolvers";
import { PrismaAPI } from "./datasources/prisma-api";


const typeDefs = gql(
    readFileSync(path.resolve(__dirname, "./schema.graphql"), {
      encoding: "utf-8",
    })
  );

  async function startApolloServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    const { url } = await startStandaloneServer(server, {
      context: async () => {
        const { cache } = server;
        return {
          dataSources: {
            prismaAPI: new PrismaAPI({ cache }),
          },
        };
      },
    });
    console.log(`
      🚀  Server is running!
      📭  Query at ${url}
    `);
  }

  startApolloServer();