import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import { connect } from 'react-redux';
	

const Best = ( { best } ) => {	
		console.log('best stocks..............', best, Array.isArray(best.bestStocks))
		return(
			<div className="container">
			<Header/>
				<Main />
				<div className="row">
				<div className="col-sm-6">
				<ul className="list-group">
					<li className="list-group-item">
					
						{ best.bestStocks.map( (stock, id) => (
							<div key={id}>
							<span>{ stock['symbol'] } </span> : <span>{ stock['ytdReturn'] }</span>
							</div>
						 ))
						}		
						
					</li>
				</ul>
				</div>
				</div>
			</div>
		)
}

const mapStateToProps = ( state ) => {
//	console.log('inmap...', state);
	return { best: state.stocksReducer.bestStocks }
//	console.log('in mapstate', state)
};

/*
const mapStateToProps = ( state ) => {
	console.log('in mapstate...', state);
	return { 
		bestStocks: state.stocks.bestStocks 
	}
}

*/
export default connect(mapStateToProps)(Best);
