import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const TodoRouter = createTRPCRouter({
  // get all todos from DB
  getTodos: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.todo.findMany();
  }),

  // find by id
  getTodoById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;

      return await ctx.prisma.todo.findUnique({
        where: { id },
      });
    }),

  // add todo to DB
  addTodo: publicProcedure
    .input(
      z.object({
        title: z.string(),
        isCompleted: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.todo.create({
          data: {
            title: input.title,
            isCompleted: input.isCompleted,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),

  // update todo from DB
  updateTodo: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        isCompleted: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input;

      return await ctx.prisma.todo.update({
        where: { id },
        data: { ...rest },
      });
    }),

  // delete todo from DB
  deleteTodo: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      return await ctx.prisma.todo.delete({
        where: { id },
      });
    }),
});
