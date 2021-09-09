// src/server/graphql/Koi/index.ts
import { objectType, extendType, nonNull, stringArg, intArg } from "nexus";
import prisma from "../../db/prisma";

const KoiHistory = objectType({
  name: "KoiHistory",
  definition(t) {
    t.model.length();
    t.model.date();
    t.model.image();
  },
});

const queries = extendType({
  type: "Query",
  definition: (t) => {
    t.field("koiHistory", {
      type: "KoiHistory",
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (_, { id }, ctx) => {
        // Only let authenticated users fetch posts
        if (!ctx.user?.id) return null;

        return prisma.koiHistory.findUnique({
          where: {
            id: id,
          },
        });
      },
    });
  },
});

const mutations = extendType({
  type: "Mutation",
  definition: (t) => {
    t.nullable.field("createKoiHistory", {
      type: "KoiHistory",
      args: {
        id: nonNull(stringArg()),
        length: intArg(),
        date: stringArg(),
        image: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        // Only let authenticated users create history
        if (!ctx.user?.id) return null;

        return await prisma.koiHistory.create({
          data: {
            length: args.length as number,
            date: args.date as string,
            image: args.image as string,
            koi: {
              connect: {
                id: args.id,
              },
            },
          },
        });
      },
    });
  },
});

export default [KoiHistory, queries, mutations];
