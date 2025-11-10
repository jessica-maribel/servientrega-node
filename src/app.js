import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import guiaRoutes from "./routes/guia.routes.js";
import { graphqlHTTP } from "express-graphql";
import { schema as userSchema, root as userRoot } from "./graphql/user.schema.js";

dotenv.config();
await connectDB();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send({ ok: true, message: "Servientrega API" }));

app.use("/api/auth", authRoutes);
app.use("/api/guias", guiaRoutes);

// Redirect GET /graphql (browser) to GraphiQL UI
app.get("/graphql", (req, res) => res.redirect(302, "/graphiql"));

// GraphQL endpoint (users listing)
app.post(
  "/graphql",
  graphqlHTTP({
    schema: userSchema,
    rootValue: userRoot,
    graphiql: false,
  })
);

// Dedicated GraphiQL UI endpoint
app.use(
  "/graphiql",
  graphqlHTTP({
    schema: userSchema,
    rootValue: userRoot,
    graphiql: true,
  })
);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
