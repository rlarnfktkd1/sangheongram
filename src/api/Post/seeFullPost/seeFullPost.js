// fragment로 작업 한것
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      return await prisma.post({ id });
    }
  }
};
