/**
 * Created by User on 2/15/2017.
 */
const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);

Mongoose.connection.on('error', (error) => {
   console.log("MongoDB drive", error);
});

//Create a schema that defines the structure for storing user data
const chatUser = new Mongoose.Schema({
   profileId: String,
    fullName: String,
    profilePic: String
});
//Turn the schema into mode
let userModel = new Mongoose.model('chatUser', chatUser);

module.exports = {
    Mongoose,
    userModel
}
