import { isAuthenticated } from "../../../middlewares";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(requset);
      const { postId } = args;
      const { user } = request;
      return true;
    }
  }
};
