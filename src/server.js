require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";

const typeDefs = `
    type Query{
        hello:  String!
    }
`;

const PORT = process.env.PORT || 4000;

const resolvers = {
  Query: {
    hello: () => "Hi"
  }
};
const server = new GraphQLServer({
  typeDefs,
  resolvers
});

const serverStart = () => {
  console.log(`Server running on http://localhost:${PORT}`);
};

server.start({ port: PORT }, serverStart);
