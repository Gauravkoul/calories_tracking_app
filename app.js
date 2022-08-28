require('dotenv').config()
const express = require('express');
const graphqlHttp = require('express-graphql');
const graphQlSchema = require('./src/graphql/schemas/index');
const graphQlResolvers = require('./src/graphql/resolvers/index');
const isAuth = require('./src/middleware/is-auth');
const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization,uploader-chunk-number,uploader-chunks-total,uploader-file-id')
  if (req.method == 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET')
    return res.status(200).json({})
  }
  next()
})

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp.graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);


module.exports = app;