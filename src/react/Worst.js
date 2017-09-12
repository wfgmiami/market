import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import { connect } from 'react-redux';
	

const Worst = ( { worstStocks } ) => {	
		console.log('worstStocks................',worstStocks)
		return(
			<div className="container">
			<Header/>
				<Main />
				<ul className="list-group">
					<li className="list-group-item">
					
						{ worstStocks.length && worstStocks.map( (stock, id) => (
							<div key={id}>
							<span>{ stock['symbol'] } </span> : <span>{ stock['ytdReturn'] }</span>
							</div>

						 )
						)}		
						
					</li>
				</ul>
				
			</div>
		)
}

const mapStateToProps = ( state ) => {
	return { 
		worstStocks: state.stocks.worstStocks 
	}
}

export default connect(mapStateToProps)(Worst);

