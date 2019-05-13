import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

// 이메일에 날라온 secret 코드와 해당 사용자의 이메일을 확인 후 지정된 secret코드값과 비교를 시작한다.
// 1. prisma를 통해 user에 저장된 배열에서 날라온 email과 동일한 email의 유저를 찾는다.
// 2. 만약 user의 loginSecret이 맞다면, generateToken이 실행된다.
export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email: email });
      if (user.loginSecret === secret) {
        return generateToken(user.id);
      } else {
        throw Error("잘못된 이메일/시크릿키 조합입니다");
      }
    }
  }
};
