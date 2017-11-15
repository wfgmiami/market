import React from 'react';
import { Link } from 'react-router-dom';

const StocksList = ( { nasdaq, searchFlag, reset }) => {
// console.log('..............in StocksList.js',searchFlag, nasdaq);
const total = nasdaq.length;

return(
	<div className="panel-footer"><b>Total listed stocks: <span className="badge badge-info"> { total }</span>{ searchFlag ? <span className="pull-right"><button className="btn btn-primary" onClick={ reset }>Reset</button></span> : null }</b>



	<div>&nbsp;</div>
	<table style={{ width:"100%" }}>
		<thead>
			<tr>
				<th className="symbol">Symbol</th>
				<th className="name">Name</th>
				<th className="sector"> Sector</th>
				<th className="industry">Industry</th>
				<th className="ipo">IPO</th>
			</tr>

		</thead>
	</table>

	<div id="divOuter" style={{ maxHeight:'80vh', overflowY:'auto' }} >
	<div id="divInner">
	<table>
		<tbody>

			{ nasdaq.length ?
				nasdaq.map((stock, index) => (
				<tr key={index} >
					<td className="symbol">
						{ stock.symbol }
					</td>

					<td id={index} className="name">
						{ stock.name }
					</td>

					<td id={index} className="sector">
						{ stock.sector }
					</td>

					<td id={index} className="industry">
						{ stock.industry }
					</td>

					<td id={index} className="ipo">
						{ stock.ipo }
					</td>

				</tr>
						))
					: null }

		</tbody>

  </table>
	</div>
	</div>
	</div>
	)
}

export default StocksList;
