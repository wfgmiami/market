import React from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';



const Main = ( { data }) => {
//console.log('..............in Main.js', data.data);

return(
	<div className="row">
			<div className="col-sm-4">


					{ data.data.length > 0 && data.data.map( (stock, idx) =>


							(
							<div key = { idx } className="panel panel-default">
							<div className="panel-heading">{
								stock.quotes.price.shortName }, {''}  { stock.quotes.price.symbol }
							</div>
							<div className="panel-body">
								<div>Price: { stock.quotes.price.regularMarketPrice }</div>
								<div> % change:{ parseFloat( (stock.quotes.price.regularMarketChangePercent*100).toFixed(2)) + "%" }</div>
								<div>Ask Price:{ stock.quotes.summaryDetail.ask } &nbsp;&nbsp;&nbsp; Ask Size: { stock.quotes.summaryDetail.askSize }</div>
								<div>Bid Price: { stock.quotes.summaryDetail.bid } &nbsp;&nbsp;&nbsp; Bid Size: { stock.quotes.summaryDetail.bidSize }</div>
							</div>
							</div>
							)
					  )
				  }


			</div>
	</div>


	)

}

export default Main;
