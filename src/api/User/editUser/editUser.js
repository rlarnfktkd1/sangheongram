import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username, email, firstName, lastName, bio, avatar } = args;
      const { user } = request;
      try {
        return await prisma.updateUser({
          where: {
            id: user.id
          },
          data: {
            username,
            email,
            firstName,
            lastName,
            bio,
            avatar
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
