import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import path from "path";
import { ApolloServer } from "apollo-server-express";
// const {
//   ApolloServerPluginLandingPageGraphQLPlayground,
// } = require("apollo-server-core");

import { UserRoles } from "./models/User";
import uploadRoute from "./routes/upload";
import uploadTestRoute from "./routes/uploadTestRoute";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI as string;

interface JwtUserPayload {
  id: string;
  role: UserRoles;
  iat?: number; // Issued At (standard JWT claim)
  exp?: number; // Expiration Time (standard JWT claim)
}

async function startServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use("/api", uploadRoute);
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
  app.use("/", uploadTestRoute);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()], // Enables the GraphQL Playground UI
    context: ({ req }) => {
      const authHeader = req.headers.authorization || "";
      const BEARER_PREFIX = "Bearer ";

      let user = null;

      if (authHeader && authHeader.startsWith(BEARER_PREFIX)) {
        const token = authHeader.substring(BEARER_PREFIX.length).trim();

        if (!token) {
          console.warn(
            "Authorization header present but token is missing or malformed after 'Bearer '."
          );
        } else if (!process.env.JWT_SECRET) {
          console.error(
            "SERVER CONFIG ERROR: JWT_SECRET is not defined in the environment variables. Cannot verify token."
          );
        } else {
          try {
            const decoded = jwt.verify(
              token,
              process.env.JWT_SECRET
            ) as JwtUserPayload;
            user = decoded;
            console.log("Authenticated User:", user.id);
          } catch (error: any) {
            // If token verification fails (e.g., expired, invalid signature),
            // we catch the error but do NOT throw it from the context function itself.
            // `user` will remain null, and individual resolvers will handle authentication.
            console.error("TOKEN VERIFICATION ERROR:", error.message);

            if (error.name === "TokenExpiredError") {
              console.warn("Token expired. User will need to re-authenticate.");
            } else if (error.name === "JsonWebTokenError") {
              console.warn(
                "Invalid or malformed JWT. User will need to re-authenticate."
              );
            }
          }
        }
      } else if (authHeader) {
        console.warn(
          `Authorization header present but does not start with '${BEARER_PREFIX}'.`
        );
      } else {
        console.log("No authorization header provided for this request.");
      }

      return { user };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("MongoDB connected");

      app.listen(PORT, () => {
        console.log(
          `Apollo Server ready at http://localhost:${PORT}${server.graphqlPath}`
        );
      });
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
}

startServer();
