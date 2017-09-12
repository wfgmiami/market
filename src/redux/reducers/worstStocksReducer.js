import axios from 'axios';


const initialState = {
	worstStocks:[]
}

const worstStocksReducer = ( state = initialState, action ) => {
	switch(action.type){
		case 'LOAD_STOCKS':
			state = Object.assign( {}, state, action.payload )
			break;
		default:
			break;
	}
	console.log('worst.......state: ',state);
	return state;
}


const loadStocksSuccess = ( worstStocks ) => ({
	type: 'LOAD_STOCKS',
	payload: { worstStocks} 
})

const loadWorstStocks = () => {
	return (dispatch) => {
		return axios.get('/api/loadStocks')
			.then( response => {
				//console.log('.............', response);
				dispatch( loadStocksSuccess( response.data.stocksArr ) ) 
			})
	}
}


export { loadWorstStocks };
export default worstStocksReducer;
