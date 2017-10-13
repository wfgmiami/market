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
		console.log(window.location.origin)
	})
// 	socket.on('newPrices', console.log)
// }


class App extends Component{
	constructor( props ){
		super( props );


		this.state = {
			data: []
		}

		// subscriber( (err, msg) => this.setState({ msg }))
	}

	componentDidMount(){
		// axios.get('/api/portfolio')
		// 	.then( response =>  response.data  )
		// 	.then( data => {
		// 		//const price = data.quotes.price;
		// 		//const summaryDetail = data.quotes.summaryDetail;
		// 		this.setState( { data } );
		// 		console.log('...........', this.state)
		// 	} )'

	}

	componentWillMount(){
		var self = this;

		socket.on('sendData', ( ) => {
			axios.get('/api/portfolio')
			.then( response =>  response.data  )
			.then( data =>{

//			console.log('.............', data);
			this.setState( { data } );
			})
		})
	}

	render(){
		console.log('///////////////////',this.state)
		return(
			<div className="container">
				<Header />
				<Main data = { this.state } />
			</div>
		)
	}
}


export default App;
