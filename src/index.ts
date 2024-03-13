import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import path from "path";
import { gql } from "graphql-tag";
import { resolvers } from "./resolvers";
import { PrismaAPI } from "./datasources/prisma-api";
import jwt from "jsonwebtoken"

interface TokenInterface {
  userId: number,
}

const typeDefs = gql(
    readFileSync(path.resolve(__dirname, "./schema.graphql"), {
      encoding: "utf-8",
    })
  );

  async function startApolloServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => {
        // Get the user token after "Bearer "
        const token = req.headers.authorization? req.headers.authorization.split(' ')[1] : "";
        let currentUser = null
        if (token !== "" && token !== "undefined") {
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
          currentUser = await new PrismaAPI().getUser((<TokenInterface>decodedToken).userId)
        } 
    
        // add the user to the context
        return {
          dataSources: {
            prismaAPI: new PrismaAPI(),
          },
          isAuthenticated: currentUser !== null,
        };
      },
    });
    console.log(`
      🚀  Server is running!
      📭  Query at ${url}
    `);
  }

  startApolloServer();