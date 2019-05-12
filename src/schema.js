import path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";

// **은 모든 폴더를 의미한다. 모든 폴더밑에 .graphql로 끝나는 파일들 가져온다.
const allTypes = fileLoader(path.join(__dirname, "api/**/*.graphql"));
// api밑에 모든 폴더 밑에 .js로 끝나는 파일들을 resolver로 가져온다.
// ※ resolver가 아닌 파일이 감지되면 에러가 발생한다.
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers)
});

export default schema;
