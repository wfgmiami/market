import React from 'react';
import { Link } from 'react-router-dom';

const StocksList = ( { nasdaq }) => {
// console.log('..............in StocksList.js', nasdaq);

return(
	<div style={{ maxHeight:'80vh', overflowY:'auto' }} >
		{ nasdaq.length > 0 && nasdaq.map( (stock, idx) =>
				(
					<div key = { idx } className="panel panel-default" >
						<div style={{ overflowX: "hidden", overflowY:'auto' }} className="panel-heading"><Link to={`api/quote/${ stock.symbol }`}> { stock.name } ( { stock.symbol } )</Link></div>

						<div className="panel-body">
							<div>Sector:{ stock.sector} </div>
							<div>Industry: { stock.industry }</div>
							<div>IPO: { stock.ipo } </div>
						</div>
					</div>
				)
		)}
	</div>
	)
}

export default StocksList;
