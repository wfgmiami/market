import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import Header from './Header';
import Main from './Main';

class App extends Component{
	constructor(props){
		super();		
	}

	render(){
		return(
			<div className="container">
				<Header />
				<Main />		
			</div>
		)
	}
}


export default App; 
