import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Main from './Main';
import MsgBox from './MsgBox';

// function subscriber(){
	const socket = io(window.location.origin);
	socket.on( 'connect', ()=> {
		
		socket.emit('joinRoom', window.location.origin);
	})
// 	socket.on('newPrices', console.log)
// }


class App extends Component{
	constructor( props ){
		super( props );


		this.state = {
			data: [],
			msgs:[]
		}
		this.onMessageSubmit = this.onMessageSubmit.bind(this);
	}

	componentDidMount(){

	}

	componentWillMount(){
		var self = this;
		
		socket.on('message', ( msgs ) => {

			this.setState( { msgs } );
//			console.log('socketstate.....', this.state.msgs);
		})

		socket.on('messageHistory', ( messages ) => {
			messages.forEach ( ( msgs ) => {
				this.setState( { msgs } )
			})
		})

		socket.on('sendData', ( ) => {
			axios.get('/api/portfolio')
			.then( response =>  response.data  )
			.then( data =>{

//			console.log('.............', data);
			this.setState( { data } );
			})
			.catch( (err) => console.err )
		})
	}
	

	onMessageSubmit(msgs){
		let tempArr = [];
		if( this.state.msgs.length === 0 ){
			tempArr.push( msgs );
		}else{
			tempArr = this.state.msgs;
			tempArr.push( msgs );
		}
		msgs =  tempArr;
		this.setState( {  msgs });

		socket.emit('message', msgs);
	}

	render(){
//		console.log('///////////////////',this.state)
		return(
			<div className="container">
				<div className="row">
					<Header />
					<div className="col-sm-8">
						<Main data = { this.state.data } />
					</div>
					<div className="col-sm-4">
						<MsgBox msgs = { this.state.msgs } onMessageSubmit = { this.onMessageSubmit }  />
					</div>
				</div>
			</div>	
		)
	}
}


export default App;
