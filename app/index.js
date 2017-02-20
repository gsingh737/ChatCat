/**
 * Created by User on 2/15/2017.
 */
'use strict';
require('./auth')();

//create an IO server
let ioServer = app => {
    app.locals.chatrooms = [];
    const server = require('http').Server(app);
    const io = require('socket.io')(server);
    io.use((socket, next) => {
        //Session returns a function inside express-session call which is a middleware callback
       require('./session')(socket.request, {}, next);
    });
    require('./socket')(io, app);
    return server;
}
module.exports = {
    router : require('./routes')(),
    session: require('./session'),
    ioServer
}