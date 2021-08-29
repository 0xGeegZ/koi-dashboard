// src/server/graphql/Koi/index.ts
import { objectType, extendType, nonNull, stringArg } from "nexus";
import prisma from "../../db/prisma";

const Koi = objectType({
  name: "Koi",
  definition(t) {
    t.model.id();
    t.model.modifiedAt();
    t.model.birthDate();
    t.model.youtube();
    t.model.variety();
    t.model.breeder();
    t.model.bloodline();
    t.model.skinType();
    t.model.sex();
  },
});

const queries = extendType({
  type: "Query",
  definition: (t) => {
    // This will add a { post(id: "...") { id title body } } query to the API
    t.field("koi", {
      type: "Koi",
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (_, { id }, ctx) => {
        // Only let authenticated users fetch posts
        if (!ctx.user?.id) return null;

        return prisma.koi.findUnique({
          where: {
            id: id,
          },
        });
      },
    });
  },
});

export default [Koi, queries];
