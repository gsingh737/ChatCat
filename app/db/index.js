/**
 * Created by User on 2/15/2017.
 */
const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);

Mongoose.connection.on('error', (error) => {
   console.log("MongoDB drive", error);
});
module.exports = {
   Mongoose
}
