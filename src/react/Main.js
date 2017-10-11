import React from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';



const Main = ( { data }) => {
	
return(
	<div className="row">	
			<div className="col-sm-4">
				
					
					{ data.data.length > 0 && data.data.map( (stock, idx) => 
						
						(
						<div key = { idx } className="panel panel-default">	
						<div className="panel-heading">{ stock.quotes.price.symbol }</div>
						<div className="panel-body">{ stock.quotes.price.regularMarketPrice }</div>
						</div>
						)
					  )  
				    }	
								
			
			</div>
	</div>		
			

	)	
}

export default Main;
