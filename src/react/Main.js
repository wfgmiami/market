import React from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';



const Main = () => (
	
	<div className="row">
		<Link to="/topStocks">
			<div className="col-sm-6">
				<ul className="list-group">
					<li className="list-group-item">
						Top 10
					</li>
				</ul>
			</div>
		</Link>

		<Link to="/bottomStocks">
			<div className="col-sm-6">
				<ul className="list-group">
					<li className="list-group-item">
						Bottom 10
					</li>
				</ul>	
			</div>
		</Link>
	</div>				
)


export default Main;
