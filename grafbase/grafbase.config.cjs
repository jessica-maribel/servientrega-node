module.exports = {
  graph: {
    subgraphs: [
      {
        name: 'users',
        url: process.env.USERS_GRAPHQL_URL || 'http://localhost:4000/graphql',
        // headers: { Authorization: `Bearer ${process.env.SOME_TOKEN}` },
      },
    ],
  },
}

