const express = require('express');
const router = new express.Router();

const yahooFinance = require('yahoo-finance');
const dateFormat = require('dateformat');
const nasdaqData = require( '../../../nasdaq.json');
module.exports = router;

router.get('/nasdaq', (req, res, next) => {

	let obj = {};
	let nasdaq = [];

	nasdaqData.forEach( item => {
		obj.symbol = item.Symbol;
		obj.name = item.Name;
		obj.sector = item.Sector;
		obj.industry = item.industry;
		obj.ipo = item.IPOyear;
		nasdaq.push(obj)
		obj= {};
	})

	res.send( nasdaq )
})


