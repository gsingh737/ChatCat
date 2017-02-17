/**
 * Created by User on 2/15/2017.
 */
'use script';
if(process.env.NODE_ENV === "production"){
    module.exports = {
        host: process.env.host || "",
        dbURI: process.env.dbURI,
        sessionSecret: process.env.sessionSecret
    }
} else {
    module.exports = require('./development.json');
}