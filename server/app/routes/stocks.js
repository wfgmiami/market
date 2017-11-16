const express = require('express');
const router = new express.Router();

const yahooFinance = require('yahoo-finance');
const dateFormat = require('dateformat');
const nasdaqData = require( '../../../nasdaq.json');
let lastRow = [];
let firstRow = 0;
let id;
const nasdaqLen = nasdaqData.length - 1;

module.exports = router;

router.get('/nasdaq', (req, res, next) => {
	
	const rowParam = req.query;

	if(Object.keys(rowParam).length){
		lastRow = [];
		Object.keys(rowParam).map( num => {
			lastRow.push( rowParam[num]*1 );	
		})

		firstRow = lastRow[0];
		lastRow = lastRow[1] + 100;
		console.log('...nasdaqLen, first,last', nasdaqLen, firstRow, lastRow);
		if( lastRow > nasdaqLen ){
			lastRow = nasdaqLen;
			firstRow = lastRow - 100;
		}
	}else{
		id = 0;
		firstRow = 0;
		lastRow = 100;
	}

	res.send( createNewObject( nasdaqData ));
})


router.get('/nasdaq/filter', (req, res, next) => {

	const { sector } = req.query;
	let filteredArray = [];
	sector.forEach( sect => {
		let tempArray = nasdaqData.filter( stock => stock.Sector === sect );
		filteredArray = filteredArray.concat( tempArray );
	})

	res.send( createNewObject( filteredArray ));
})

router.get('/nasdaq/search', (req, res, next) => {

	let searchedArray = [];
	const { searchedStock } =  req.query;
	
	nasdaqData.forEach( stock => {
		if( stock.Name.toUpperCase().indexOf( searchedStock.toUpperCase() ) > -1 ){
			searchedArray.push( stock );
		}
	})
//	searchedArray = nasdaqData.filter( stock => stock.Name === searchedStock );
	res.send( createNewObject( searchedArray ));
})


createNewObject = ( arr ) => {
	let obj = {};
	let nasdaq = [];
	
	arr = arr.slice(firstRow, lastRow);
	console.log('arr length, firstRow, lastRow', arr.length, firstRow, lastRow);
	arr.forEach( item => {
		obj.symbol = item.Symbol;
		obj.name = item.Name;
		obj.sector = item.Sector;
		obj.industry = item.industry;
		obj.ipo = item.IPOyear;
		obj.id = id++;
		nasdaq.push(obj)
		obj= {};
	})
	return nasdaq;
}

