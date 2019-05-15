import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editComment: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id, text, action } = args;
      const { user } = request;
      try {
        const comment = await prisma.$exists.comment({
          id,
          user: { id: user.id }
        });
        if (comment) {
          if (action === EDIT) {
            return prisma.updateComment({
              data: { text },
              where: { id }
            });
          } else if (action === DELETE) {
            return prisma.deleteComment({ id });
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
