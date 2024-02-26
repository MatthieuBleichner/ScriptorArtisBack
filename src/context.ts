import { PrismaAPI } from "./datasources/prisma-api";

export type DataSourceContext = {
  dataSources: {
    prismaAPI: PrismaAPI;
  };
};