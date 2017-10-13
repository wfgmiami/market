
const router = require('express').Router();
const yahooFinance = require('yahoo-finance');
const dateFormat = require('dateformat');
const nasdaq = require( '../../nasdaq.json');


router.get('/listOfStocks', (req, res, next) => {
	let obj = {};
	let nasdaqArray = [];

	nasdaq.forEach( item => {
		obj.symbol = item.Symbol;
		obj.name = item.Name;
		obj.sector = item.Sector;
		obj.industry = item.industry;
		obj.ipo = item.IPOyear;
		nasdaqArray.push(obj)
		obj= {};
	})
	res.send( nasdaqArray )
})

const portfolio = ['AAPL', 'FB', 'AMZN', 'BABA', 'TSLA', 'GOOGL'];


router.get('/portfolio', (req, res, next) => {
	let stockArr = [];

	portfolio.forEach( stock => {
	yahooFinance.quote({
		symbol:stock,
		modules: ['price', 'summaryDetail']
	})
	.then( quotes => stockArr.push( { quotes }))
	.then( () => {

		if( stockArr.length === portfolio.length ){
			let tempArr = [];
			stockArr.forEach( dataPoint => {
				tempArr.push( dataPoint.quotes.price.symbol );
			})
			tempArr.sort();
			let newArray = [];
			tempArr.forEach( item => {
				newArray = newArray.concat( stockArr.filter( origObj => origObj.quotes.price.symbol === item ) );
			})
			return newArray;
		}
	})
	.then( ( finalArr ) => {
		if( finalArr ) res.send( finalArr )
	})
	.catch( next )

	})


})

// router.get('/stocks', (req, res, next) => {

// 	let listOfStocks = nasdaq.map( stock => stock.Symbol );
// 	listOfStocks = listOfStocks.slice(0,99);
// //	console.log(listOfStocks)
// 	let startDate = new Date(new Date().getFullYear(),-1,31);
// 	if ( startDate.getDay() === 0 ) {
// 		startDate = new Date( startDate - 2 );
// 	}else if( startDate.getDay() === 6 ){
// 		startDate = new Date( startDate - 1 );
// 	}

// 	let endDate = new Date();
// 	let stocksArr = [];
// 	let newQuotes = '';
// 	let stocksObj = {};
// 	let ytdReturn = 0;

// 	startDate = dateFormat(startDate, 'yyyy-mm-dd');
// 	endDate = endDate.setDate(endDate.getDate() - 1)
// 	endDate = dateFormat(endDate, 'yyyy-mm-dd');

// 	yahooFinance.historical( {
// 		symbols: listOfStocks,
// 		from: startDate,
// 		to: endDate
// 	}, function( err, quotes ) {
// 		if(err) return next(err);

// 		listOfStocks.forEach( stock => {
// 			newQuotes = JSON.stringify(quotes);
// 			newQuotes = JSON.parse(newQuotes)
// 			lastPrice = newQuotes[stock][0];
// 			if( lastPrice ){
// 				lastPrice = lastPrice['close'];

// 				firstPrice = newQuotes[stock][newQuotes[stock].length - 1];
// 				if( firstPrice ){
// 					firstPrice = firstPrice['close'];
// 					ytdReturnNumber = Math.floor((( lastPrice - firstPrice) / firstPrice) * 100) ;
// 					ytdReturn = ytdReturnNumber + "%";
// 					stocksObj = { symbol: stock, lastPrice, firstPrice, ytdReturn, ytdReturnNumber };

// 					stocksArr.push(stocksObj);
// 				}
// 		    }
// 		})
// 		stocksArr.sort( (a,b) => b.ytdReturnNumber - a.ytdReturnNumber );
// 		res.send( { stocksArr } );
// 	})
// })

module.exports = router;

