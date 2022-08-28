
const port = process.env.PORT || 4000;
const db = require('./db')
const app = require('./app')
const http = require('http');
const server = http.createServer(app);
require('dotenv').config()


db.connect()
  .then(() => {
    server.listen(port, () => {
      console.log(`server is running on ${port} port`)
    });
  });

