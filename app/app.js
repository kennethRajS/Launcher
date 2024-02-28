const { Server } = require('socket.io');

const io = new Server({
    cors: {
            origin: "*",
            //listen: "0.0.0.0:3000",
    }
});

let likes = 2010;

io.on("connection", (socket) => {
    socket.emit('likeupdate', likes);
    socket.on('liked', () => {
        if(likes < 2023){
            likes++;
            socket.emit('likeupdate', likes);
            socket.broadcast.emit('likeupdate', likes);
        }
    });

    socket.on('triggered', () => {
        if(likes === 2023){
            likes++;
            socket.emit('likeupdate', likes);
            socket.broadcast.emit('likeupdate', likes);
            
            // change the button yo Yay and disable.
            //socket.emit('yay', 'Yay!');
            //socket.broadcast.emit('yay', 'Yay!');    
        }
    });

    socket.on('reset', ()=> {
        likes = 2010;
        socket.emit('likeupdate', likes);
        socket.broadcast.emit('likeupdate', likes);
    })

});

io.listen(3000);