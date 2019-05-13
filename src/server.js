import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";

const PORT = process.env.PORT || 4000;

//context는 resolver 사이에서 정보 공유 할떄 사용
const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request })
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);

const serverStart = () => {
  console.log(`✔️  Server running on http://localhost:${PORT}`);
};

server.start({ port: PORT }, serverStart);
