

let currentMessageId=1;

function createMessage(user,messagetext) {
    return{
    _id: currentMessageId++,
    text: messagetext,
    createdAt: new Date(),
    user: {
      _id: user.userId,
      name: user.username,
      avatar: user.avatar,
    },
  }
}


function handleMessage(socket,users) {
    socket.on("message",messagetext=>{
        console.log(messagetext)
        const user = users[socket.id]
        const message = createMessage(user,messagetext)
        console.log(message)
        socket.broadcast.emit("message",message)
    })
}


module.exports={handleMessage}