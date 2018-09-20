const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  //когда пришел новое сообщение
  socket.on('chat message', function(res){
    io.emit('chat message', res);
  });

  //Когда подключился новый пользователь
  socket.on('addUser', userName => {
    io.emit('userConnected', `${userName} подключился`);
  });

  socket.on('typing', userName => {
      io.emit('typing', `${userName} печатает ...`);
  });

  //Когда пользователь покидает страницу
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});