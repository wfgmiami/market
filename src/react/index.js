import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';


import App from './App';
const root = document.getElementById('app');

const route = (
	<BrowserRouter>
		<Switch>
		<Route exact path="/" component={ App } />
		</Switch>	
	</BrowserRouter>

)

render(route, root);
