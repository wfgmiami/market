import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import Main from './Main';
import MsgBox from './MsgBox';
import FilterBar from './Filter/FilterBar';
import SearchBar from './SearchBar';
import StocksList from './StocksList';
import SingleStock from './SingleStock';

const socket = io(window.location.origin);
socket.on( 'connect', ()=> {
	socket.emit('joinRoom', window.location.origin);
})


class App extends Component{
	constructor( props ){
		super( props );

		this.state = {
			msgs:[],
			nasdaq:[],
			quote: []
		}

		this.onMessageSubmit = this.onMessageSubmit.bind(this);
	}

	componentDidMount(){
		axios.get('/api/stocks/nasdaq')
		.then( response => response.data )
		.then( nasdaq => this.setState( { nasdaq }))
		.catch( err => console.log( err ))


	}

	componentDidUpdate(){
		let quote = [];
		if(	Object.keys( this.props ).length > 1 && quote.length > 0){
			console.log('..quote', quote)
			this.setState({ quote });
		}else if( Object.keys( this.props ).length < 2  && quote.length === 0){
			quote = this.props.router.match.params.symbol;
			console.log('..quote', quote)
			this.setState({ quote });
		}
	}

	componentWillMount(){
		var self = this;
		socket.on('message', ( msgs ) => {
			this.setState( { msgs } );
		})

		socket.on('messageHistory', ( messages ) => {
			messages.forEach ( ( msgs ) => {
				this.setState( { msgs } )
			})
		})

		socket.on('sendData', ( ) => {

			const symbol = this.state.quote;
			console.log('...socket.on, symbol', symbol)
			// if( symbol.length > 0 ){
			// 	axios.get(`/api/quote/${ symbol }`)
			// 	.then( response => response.data )
			// 	.then ( quote => this.setState( { quote } ))
			// 	.catch( err => console.log( err ))
			// }

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
	console.log('.....in App.js, state, props',this.state, this.props)

		return(
			<div className="container-fluid">
				<Nav />
				<div style={ { marginTop: '65px' }}>
					<SearchBar />
						<div className="row">
							<div className="col-sm-2">
								<FilterBar />
							</div>
							<div className="col-sm-6">
							{ Object.keys( this.props ).length > 1 ?
								<StocksList nasdaq = { this.state.nasdaq } />
								: <SingleStock router = { this.props.router }/> }
							</div>
							<div className="col-sm-4">
								<MsgBox msgs = { this.state.msgs } onMessageSubmit = { this.onMessageSubmit }  />
							</div>
						</div>
				</div>
			</div>
		)
	}
}


export default App;
