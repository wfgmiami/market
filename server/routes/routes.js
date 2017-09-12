const router = require('express').Router();
const yahooFinance = require('yahoo-finance');
const dateFormat = require('dateformat');

router.get('/loadStocks', (req, res, next) => {
	
	let listOfStocks = ['AAPL', 'GOOGL', 'TA', 'AMZN', 'BABA'];
	let startDate = new Date(new Date().getFullYear(),0,1);
	let endDate = new Date();
	let stocksArr = [];
	let newQuotes = '';
	let stocksObj = {};
	let ytdReturn = 0;

	startDate = dateFormat(startDate, 'yyyy-mm-dd');
	endDate = endDate.setDate(endDate.getDate() - 1)
	endDate = dateFormat(endDate, 'yyyy-mm-dd');

	yahooFinance.historical( {
		symbols: listOfStocks,
		from: startDate,
		to: endDate
	}, function( err, quotes ) {
		if(err) return next(err);

		listOfStocks.forEach( stock => {
			newQuotes = JSON.stringify(quotes);
			newQuotes = JSON.parse(newQuotes)
			lastPrice = newQuotes[stock][0];
			lastPrice = lastPrice['close'];
		
			firstPrice = newQuotes[stock][newQuotes[stock].length - 1];
			firstPrice = firstPrice['close'];
			ytdReturnNumber = Math.floor((( lastPrice - firstPrice) / firstPrice) * 100) ;	
			ytdReturn = ytdReturnNumber + "%";
			stocksObj = { symbol: stock, lastPrice, firstPrice, ytdReturn, ytdReturnNumber };
		
			stocksArr.push(stocksObj);
					
		})
		stocksArr.sort( (a,b) => b.ytdReturnNumber - a.ytdReturnNumber );		
		res.send( { stocksArr } );
	})
})

module.exports = router;
