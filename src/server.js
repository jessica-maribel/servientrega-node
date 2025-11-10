// import app from "./app.js";
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`🚀 Servientrega backend escuchando en ${PORT}`));


import app from "./app.js";

const PORT = process.env.PORT || 4000;
const isProd = process.env.NODE_ENV === "production";
const enableGraphiQL = process.env.GRAPHIQL === "true" || !isProd;

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
  console.log(`GraphQL POST en http://localhost:${PORT}/graphql`);
  if (enableGraphiQL) {
    console.log(`GraphiQL UI en http://localhost:${PORT}/graphql`);
  }
});
