import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import Express from "express";
import session from "express-session";
import "reflect-metadata";
import { formatArgumentValidationError, useContainer } from "type-graphql";
import { Container } from "typedi";
import * as typeorm from "typeorm";
import { createConnection } from "typeorm";
import { createAuthorsLoader } from "./utils/authorsLoader";
import { createSchema } from "./utils/createSchema";

useContainer(Container);
typeorm.useContainer(Container);

const main = async () => {
  await createConnection();

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError,
    context: ({ req, res }: any) => ({
      req,
      res,
      authorsLoader: createAuthorsLoader()
    }),
    validationRules: [

    ]
  });

  const app = Express();


  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000"
    })
  );



  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql");
  });
};

main().catch(err => console.error(err));
