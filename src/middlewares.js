export const isAuthenticated = request => {
  if (!request.user) {
    throw Error("You need to Log in to perform this action");
  }
  return;
};
