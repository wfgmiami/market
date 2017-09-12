import axios from 'axios';


const initialState = {
	bestStocks:[]
	//worstStocks:{}
}

const stocksReducer = ( state = initialState, action ) => {
	switch(action.type){
		case 'LOAD_BEST_STOCKS':			
				state.bestStocks  = Object.assign( {}, state.bestStocks, action.payload )
				break;
		case 'LOAD_WORST_STOCKS':
				state.worstStocks = Object.assign( {}, state.worstStocks, action.payload ) 
				break;
		default:
				break;
	}
	console.log('.......state: ',state);
	return state;
}


const loadBestStocksSuccess = ( bestStocks ) => ({
	type: 'LOAD_BEST_STOCKS',
	payload: { bestStocks } 
})


const loadWorstStocksSuccess = ( worstStocks ) => ({
	type: 'LOAD_WORST_STOCKS',
	payload: { worstStocks } 
})


const loadStocks = () => {
	return (dispatch) => {
		return axios.get('/api/loadStocks')
			.then( response => {
		
				//let bestStocks = response.data.stocksArr.sort( (a,b) =>  b.ytdReturnNumber - a.ytdReturnNumber )
				dispatch( loadBestStocksSuccess( response.data.stocksArr ) ) 

	//			let worstStocks = response.data.stocksArr.sort( (a,b) =>  a.ytdReturnNumber - b.ytdReturnNumber )
	//			dispatch( loadWorstStocksSuccess( worstStocks ) ) 
			})
	}
}


export { loadStocks };
export default stocksReducer;
