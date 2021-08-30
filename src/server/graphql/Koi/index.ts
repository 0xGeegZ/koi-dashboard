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
    t.model.user();
    // t.model.updates();
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

        return prisma.koi.findFirst({
          where: {
            user: {
              is: {
                // only fetch your own koi
                id: ctx.user.id,
              },
            },
            id,
          },
        });
      },
    });
  },
});

const mutations = extendType({
  type: "Mutation",
  definition: (t) => {
    t.nullable.field("createKoi", {
      type: "Koi",
      args: {
        variety: nonNull(stringArg()),
        breeder: stringArg(),
        bloodline: stringArg(),
        skinType: stringArg(),
        sex: stringArg(),
        youtube: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        if (!ctx.user?.id) return null;

        return await prisma.koi.create({
          data: {
            variety: args.variety,
            breeder: args.breeder,
            bloodline: args.bloodline,
            skinType: args.skinType,
            sex: args.sex,
            youtube: args.youtube,
            user: {
              connect: {
                id: ctx.user.id,
              },
            },
          },
        });
      },
    });

    t.nullable.field("updateKoi", {
      type: "Koi",
      args: {
        koiId: nonNull(stringArg()),
        variety: nonNull(stringArg())
      },
      resolve: async (_, { koiId, variety }, ctx) => {
        if (!ctx.user?.id) return null;

        const hasAccess = await prisma.koi.findFirst({
          where: {
            user: {
              is: {
                id: ctx.user.id,
              },
            },
            id: koiId,
          },
        });

        if (!hasAccess) return null;

        return await prisma.koi.update({
          where: { id: koiId },
          data: { variety },
        });
      },
    });
  },
});

export default [Koi, queries, mutations];
