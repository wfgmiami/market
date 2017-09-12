const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const app = express();
const router = require('./routes/routes.js');

const server = require('http').createServer(app);

const io = socketio(server);
const test = 0;
io.on( 'connection', (socket) => {
	console.log('Client has connected!');
	console.log(socket.id);
	socket.on('disconnect', () => {
		console.log('Client has disconnected');
	})

})


app.use( '/vendor', express.static( path.join (__dirname,'..','node_modules') ) );
app.use( '/dist', express.static( path.join( __dirname,'..', 'dist') ) );
app.use( '/stylesheets', express.static( path.join( __dirname, '..', 'browser/stylesheets' ) ) );



app.get( '/', ( req, res, next ) => {
//	res.redirect('/topStocks');	
	res.sendFile( path.join( __dirname,'..', 'browser/index.html' ) );	

})

app.get( '/topStocks', ( req, res, next ) => {
	res.sendFile( path.join( __dirname,'..', 'browser/index.html' ) );	
})

app.get( '/bottomStocks', ( req, res, next ) => {
	res.sendFile( path.join( __dirname,'..', 'browser/index.html' ) );	
})

app.use( '/api', router );

const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log(`Server listening on port ${ port }`)
	
})



