import { prisma } from "../../../generated/prisma-client";

// parent는 나한테 resolver를 call 하는 해당 resolver를 준다
// 쉽게말해 parent는 위에있는 resolver다
// 밑에 정의한 fullName이 다른데서도 동작하는 이유는 schema.js에서 모든 resolver를 하나로 merging하고 있기때문이다.
export default {
  User: {
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        const exists = await prisma.$exists.user({
          AND: [
            {
              id: parentId
            },
            {
              followers_some: {
                id: user.id
              }
            }
          ]
        });
        return exists;
      } catch (error) {
        return false;
      }
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
};
