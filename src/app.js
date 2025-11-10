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
await connectDB(); // OK si usas "type":"module" en package.json

const app = express();

// En DEV desactiva CSP para que GraphiQL pueda cargar su JS inline.
// En PROD, deja CSP activado.
const isProd = process.env.NODE_ENV === "production";
// Permitir habilitar GraphiQL explícitamente en cualquier entorno con GRAPHIQL=true
const enableGraphiQL = process.env.GRAPHIQL === "true" || !isProd;
app.use(
  helmet({
    // Si GraphiQL está habilitado, desactiva CSP para permitir los scripts inline de GraphiQL
    contentSecurityPolicy: enableGraphiQL ? false : isProd ? undefined : false,
    crossOriginEmbedderPolicy: enableGraphiQL ? false : isProd ? undefined : false,
    crossOriginResourcePolicy: enableGraphiQL ? false : isProd ? undefined : false,
  })
);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send({ ok: true, message: "Servientrega API" }));

app.use("/api/auth", authRoutes);
app.use("/api/guias", guiaRoutes);

// === GraphQL (acepta GET y POST) ===
// - En dev habilitamos GraphiQL para probar en el navegador.
// - En prod lo desactivamos por seguridad.
app.use(
  "/graphql",
  graphqlHTTP({
    schema: userSchema,
    rootValue: userRoot,
    graphiql: enableGraphiQL, // http://localhost:4000/graphql cuando esté habilitado
  })
);

// Manejador de errores
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
