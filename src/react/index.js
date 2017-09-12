import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import Best from './Best';
import Worst from './Worst';
import store from '../redux/store';
import { loadStocks } from '../redux/reducers/stocksReducer';

const root = document.getElementById('app');

const init = () => {
	store.dispatch( loadStocks() );
}

const route = (
<Provider store = {store}>
	<BrowserRouter>
		<Switch>
		<Route exact path="/" component={ App } render={ init() }/>
		<Route path="/topStocks" component={ Best }/>
		<Route path="/bottomStocks" component={ Worst }/>
		</Switch>	
	</BrowserRouter>
</Provider>
)

render(route, root);
