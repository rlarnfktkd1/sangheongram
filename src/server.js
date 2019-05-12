require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

server.express.use(logger("dev"));

const serverStart = () => {
  console.log(`✔️  Server running on http://localhost:${PORT}`);
};

server.start({ port: PORT }, serverStart);
