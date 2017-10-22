const express = require('express');
const path = require('path');
const router = require('./routes/routes.js');
const app = express();
const server = require('http').createServer(app);

const socketio = require('socket.io');

const io = socketio(server);


app.use( '/vendor', express.static( path.join (__dirname,'..','node_modules') ) );
app.use( '/dist', express.static( path.join( __dirname,'..', 'dist') ) );
app.use( '/stylesheets', express.static( path.join( __dirname, '..', 'browser/stylesheets' ) ) );

app.get( '/', ( req, res, next ) => {
	res.sendFile( path.join( __dirname,'..', 'browser/index.html' ) );
})


app.use( '/api', router );
app.use((err, req, res, next) => {
	console.log(err);
})

var messages = {};
var room;

io.on( 'connection', (socket) => {

	setInterval( () => {
		socket.emit('sendData');
	},3000)

	socket.on('joinRoom', (roomName) => {
		room = roomName;
		socket.join(roomName);
		if( !messages[roomName] ) messages[roomName] = [];
		else socket.emit('messageHistory', messages[roomName]);
	})

	socket.on('message',( msgs ) => {
		messages[room].push( msgs );
		socket.broadcast.emit('message', msgs );
	})

	socket.on('disconnect', () => {
		console.log('Client has disconnected');
	})

})


const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log(`Server listening on port ${ port }`)

})




