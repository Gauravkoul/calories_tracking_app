/* eslint-disable no-unused-vars */

const mongoose = require('mongoose');
require('dotenv').config()
module.exports = {

  connect: async () => {
    console.log("connected to Database")
    await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, { useUnifiedTopology: true }
    ).catch(error => console.error(error));

  }

}