const h = require('../helpers');
module.exports = (io, app) => {
    let allrooms = app.locals.chatrooms;
    io.of('/roomsList').on('connection', socket => {
        console.log('Socket.io connected to client');
        socket.on('getChatRooms', () => {
            socket.emit('chatRoomsList', JSON.stringify(allrooms));
        });

        socket.on('createNewRoom', newRoomInput => {
            //check to see if a room with same title exists or not
            //if not create one and broadcast it to everyone
            if(!h.findRoomByName(allrooms, newRoomInput)) {
                allrooms.push({
                    room: newRoomInput,
                    roomID: h.randomHex(),
                    users: []
                });
                //emit an updated list to creator
                socket.emit('chatRoomsList', JSON.stringify(allrooms));
                //emmit an updated list to the everyone
                socket.broadcast.emit('chatRoomsList', JSON.stringify(allrooms));
            }
        });
    });

    io.of('/chatter').on('connection', socket => {
        socket.on('join', data => {
            let userList = h.addUserToRoom(allrooms, data, socket);
            //update the list of active users in the chat room page
            socket.broadcast.to(data.roomID).emit('updateUsersList', JSON.stringify(userList.users));
            socket.emit('updateUsersList', JSON.stringify(userList.users));
        });
        socket.on('disconnect', () => {
            //find the room to which socket is connected to and purge the user
            let room = h.removeUserFromRoom(allrooms, socket);
            socket.broadcast.to(room.roomID).emit('updateUsersList',JSON.stringify(room.users));
        });
        socket.on('newMessage', data => {
            socket.to(data.roomID).emit("inMessage", JSON.stringify(data));
        });
    });
}