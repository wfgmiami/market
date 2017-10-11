import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';
import Main from './Main';

class App extends Component{
	constructor( props ){
		super( props );		
		this.state = {
			data:[]
		}
	}

	componentDidMount(){
		axios.get('/api/portfolio')
			.then( response =>  response.data  )
			.then( data => {
				//const price = data.quotes.price;
				//const summaryDetail = data.quotes.summaryDetail;
				this.setState( { data } );
				console.log('...........', this.state)
			} )
	}

	render(){

		return(
			<div className="container">
			<Header />
			<Main data = { this.state } />
			</div>
		)
	}
}


export default App; 
