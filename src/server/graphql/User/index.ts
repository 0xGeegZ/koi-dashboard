import { extendType, nonNull, objectType, stringArg } from "nexus";
import prisma from "../../db/prisma";

const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.kois();
    t.model.email();
    t.model.friends();
  },
});

const queries = extendType({
  type: "Query",
  definition: (t) => {
    t.field("currentUser", {
      type: "User",
      resolve: (_, __, ctx) => {
        if (!ctx.user?.id) return null;

        return prisma.user.findUnique({
          where: {
            id: ctx.user.id,
          },
        });
      },
    });
  },
});

const mutations = extendType({
  type: "Mutation",
  definition: (t) => {
    t.nullable.field("updateUser", {
      type: "User",
      args: {
        userId: nonNull(stringArg()),
        name: stringArg(),
        email: nonNull(stringArg()),
      },
      resolve: async (_, { userId, name, email }, ctx) => {
        if (!ctx.user?.id || userId !== ctx.user.id) return null;

        return await prisma.user.update({
          where: { id: userId },
          data: { name, email },
        });
      },
    });

    t.nullable.field("createFriend", {
      type: "User",
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, args, ctx) => {
        if (!ctx.user?.id) return null;

        const userExists = await prisma.user.findUnique({
          where: {
            id: ctx.user.id,
          },
        });

        if (!userExists) return null;
        if (ctx.user.id == args.id) return null;

        return await prisma.user.update({
          where: { id: ctx.user?.id },
          data: {
            friends: {
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

export default [User, mutations, queries];
