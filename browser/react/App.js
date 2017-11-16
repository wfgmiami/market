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
let clientIP = '';

let divOuter;
let divInner;

socket.on( 'connect', ()=> {
	socket.emit('joinRoom', window.location.origin);
})

//comment
class App extends Component{
	constructor( props ){
		super( props );

		this.state = {
			msgs:[],
			nasdaq:[],
			quote:[],
			search:''
		}
		this.reset = this.reset.bind(this);
		this.searchActive = this.searchActive.bind(this);
		this.filterActive = this.filterActive.bind(this);
		this.onMessageSubmit = this.onMessageSubmit.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
//		this.getVisibleRows = this.getVisibleRows(this);
//		this.isElementVisible = this.isElementVisible(this);
	}

	searchActive( input ){
		const searchedStock = { "searchedStock": input }
//		console.log('in searchActive.....',searchedStock);
		axios.get('/api/stocks/nasdaq/search', { params: searchedStock })
		.then( res => res.data )
		.then( nasdaq => {
			this.setState( { nasdaq } )
			this.setState( { search: true } );
		})
		.catch( err => console.log( err ))
	}

	filterActive( filter ){
		let url = '/api/stocks/nasdaq/filter';
		if( filter.sector.length === 0){
			url = '/api/stocks/nasdaq';
		}
		axios.get(url, { params: filter })
		.then( res => res.data )
		.then( nasdaq => this.setState( { nasdaq } ))
		.catch( err => console.log( err ))
	}

	componentDidMount(){
		divOuter = document.getElementById("divOuter");
		divInner = document.getElementById("divInner");
		divOuter.addEventListener("scroll", this.handleScroll);
		localStorage.clear();

		axios.get('/api/stocks/nasdaq')
		.then( response => response.data )
		.then( nasdaq => this.setState( { nasdaq }))
		.catch( err => console.log( err ))
	}

	componentWillUnmount(){
		window.removeEventListener("scroll", this.handleScroll);
	}

	handleScroll(event){
		var currentY = divOuter.scrollTop;
		var posHeight = divOuter.clientHeight;
		var scrollHeight = divInner.clientHeight;

		var scrollPercentage = (currentY / (scrollHeight - posHeight ));
		//console.log('.....', scrollPercentage,currentY,posHeight,scrollHeight )


		var isRowVisible = isElementVisible(divOuter);
		var visibleRows = getVisibleRows(isRowVisible);
		// console.log(scrollPercentage < 0.1);

		if(scrollPercentage < 0.1){
			let lastRow = this.state.nasdaq[0].id;

			let firstRow = lastRow - 100;
			if(firstRow <= 0) firstRow = 0;
			if(!lastRow) lastRow = 100;

			const stored = JSON.parse(localStorage.getItem("nasdaq"));

			if(stored){
				const nasdaq = stored.slice(firstRow,lastRow);
				this.setState( { nasdaq })
			}

			if(!scrollPercentage){
				const nasdaq = stored.slice(0,100);
				this.setState( { nasdaq })
			}

			// console.log('negative',scrollPercentage,typeof(scrollPercentage), firstRow,lastRow,this.state.nasdaq);

			// if( lastRow >= nasdaqLen ){
			// 	lastRow = nasdaqLen;
			// }else{
			// 	firstRow = lastRow;
			// 	lastRow += increment;
			// }
			// console.log('.....visibleRows, state', visibleRows[0]*1,this.state.nasdaq, JSON.parse(localStorage.getItem("nasdaq")));

			// const endRow = this.state.nasdaq[0].id;
			// const firstVisibleRow = visibleRows[0] * 1;

			// if(firstVisibleRow - endRow < 10 && endRow - 100 > 0){
			// 	const storage = JSON.parse(localStorage.getItem("nasdaq"));
			// 	// console.log('in if.....', storage[0]);

			// }else{
			// 	// console.log('negative', endRow-100);
			// }
		}


		if(scrollPercentage > 0.9 ) {

			var stored = JSON.parse(localStorage.getItem("nasdaq"));
			var lastStored = 0;

			if(stored){
				lastStored = stored[stored.length-1].id;
			}

			var dataLength = this.state.nasdaq[0].len;
			// console.log('................',lastStored, dataLength,this.state.nasdaq[0]);

			const firstLastRows = [visibleRows[0]];
			firstLastRows.push(visibleRows[visibleRows.length - 1]);

			// console.log('firstLastRow....',firstLastRows);

			// axios.get('/api/stocks/nasdaq', { params: firstLastRows })

			axios.get('/api/stocks/nasdaq', { params: 1 })
			.then( response => response.data )
			.then( nasdaq => {
				this.setState( { nasdaq })
			})
			.catch( err => console.log( err ))

			if(stored){
				if(lastStored < dataLength){
					stored = stored.concat(this.state.nasdaq);
					localStorage.setItem("nasdaq", JSON.stringify(stored));
				}
			}else{
				localStorage.setItem("nasdaq", JSON.stringify(this.state.nasdaq));
			}


			// console.log('storage..state....', JSON.parse(localStorage.getItem("nasdaq")), this.state.nasdaq);
		}

	    function getVisibleRows( isRowVis ){
			var cells = Array.prototype.slice.call(document.getElementsByClassName("symbol"),0);
//			console.log('cells....', cells);
			function rowIndex( cell ) { return cell.parentNode.id };
			return cells.filter( isRowVis ).map( rowIndex );
		}

		function isElementVisible(container){

			var containerHeight = container.clientHeight;
			return function(element){
				var containerTop = container.scrollTop;
				var containerBottom = containerTop + containerHeight;
				var elemTop = element.offsetTop;
				var elemHeight = parseInt(getComputedStyle(element).height);
				var elemBottom = elemTop + elemHeight;
	//			onsole.log('...', containerHeight, containerTop, containerBottom);
				return (elemTop >= containerTop && elemBottom <= containerBottom);
			}
		}


	}

	reset(){
		axios.get('/api/stocks/nasdaq')
		.then( response => response.data )
		.then( nasdaq => {
			this.setState( { nasdaq })
			this.setState({ search: false });
		})
		.catch( err => console.log( err ))
	}

	componentWillMount(){
		var self = this;
		socket.on('message', ( msgs ) => {
			this.setState( { msgs } );
		})

		socket.on('ip', ( clientAddress ) => {
			clientIP = clientAddress;
		})

		socket.on('messageHistory', ( messages ) => {
			messages.forEach ( ( msgs ) => {
				this.setState( { msgs } )
			})
		})
		socket.on('sendData', ( ) => {

			if( Object.keys( this.props ).length < 2 ){
				this.setState( { quote:[] } )
//				console.log('......sendData.....', this.props, this.state);
			}

		})
	}


	onMessageSubmit(msgs){
		let tempArr = [];
		msgs = clientIP + ': ' + msgs;
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
	// console.log('.....in App.js, state, props',this.state, this.props)

		return(
			<div className="container-fluid">
				<Nav />
				<div style={ { marginTop: '65px' }}>
					<SearchBar searchActive={ this.searchActive }/>
						<div className="row">
							<div className="col-sm-2">
								<FilterBar filterActive={ this.filterActive } />
							</div>
							<div className="col-sm-8">
							{ Object.keys( this.props ).length > 1 ?
								<StocksList searchFlag = { this.state.search } reset={ this.reset } nasdaq = { this.state.nasdaq } />
								: <SingleStock router = { this.props.router }/> }
							</div>
							<div className="col-sm-2">
								<MsgBox msgs = { this.state.msgs } onMessageSubmit = { this.onMessageSubmit }  />
							</div>
						</div>
				</div>
			</div>
		)
	}
}


export default App;
