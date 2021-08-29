// src/server/graphql/Koi/index.ts
import { objectType, extendType, nonNull, stringArg } from "nexus";
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

export default [KoiHistory, queries];
