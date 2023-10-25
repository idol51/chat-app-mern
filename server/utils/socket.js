const Messages = require('../models/messages')

function socket (io) {

    let chatRoom = '';
    let allUsers = [];

    io.on('connection', (socket) => {
        console.log(`User connected ${socket.id}`);

        socket.on('join-room', (data) => {
            const { userName, roomName } = data;
            socket.join(roomName);

            let createdTime = Date.now();

            Messages.find({ roomName: roomName }).sort({createdTime: -1}).limit(10)
                .then((data) => {
                    data.map((val) => ({
                        message: val.message,
                        userName: val.userName,
                        createdTime: val.createdTime
                    }));

                    data.reverse();

                    data.push({
                        message: `Welcome ${userName}`,
                        userName: 'ChatBot',
                        createdTime: createdTime,
                    });

                    socket.emit('receive-message', data);
                })

            socket.to(roomName).emit('receive-message', [{
                message: `${userName} has joined the chat room`,
                userName: 'ChatBot',
                createdTime: createdTime,
            }]);

            

            chatRoom = roomName;
            allUsers.push({id: socket.id, userName, roomName});
            chatRoomUsers = allUsers.filter((user) => user.roomName === roomName);
            socket.to(roomName).emit('chatroom-users', chatRoomUsers);
            socket.emit('chatroom-users', chatRoomUsers);

        });

        socket.on('send-message', (data) => {
            const { message, userName, roomName, createdTime } = data;

            Messages.create({ message, userName, roomName, createdTime })
                .then(() => console.log('Message added Successfully'))
                .catch((err) => console.log(err));

            socket.to(roomName).emit('receive-message', [{
                message,
                userName,
                createdTime,
            }]);

            socket.emit('receive-message', [{
                message,
                userName,
                createdTime,
            }]);
        });

        socket.on('disconnect', (data) => {
            console.log('disconnect', data);

            let disconnectedUser = allUsers.filter((user) => user.id === socket.id );
            let userRoomName = disconnectedUser[0]?.roomName;
            allUsers = allUsers.filter((user) => user.id!==disconnectedUser[0]?.id);
            chatRoomUsers = allUsers.filter((user) => user.roomName === userRoomName);

            let createdTime = Date.now();

            console.log(disconnectedUser, );

            if (disconnectedUser[0]?.userName) {
                socket.to(userRoomName).emit('chatroom-users', chatRoomUsers);
                socket.to(userRoomName).emit('receive-message', [{
                    message: `${disconnectedUser[0]?.userName} has left the Room`,
                    userName: 'chatBot',
                    createdTime,
                }])
            }
        });
    });
}

module.exports = socket;