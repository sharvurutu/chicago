const readline = require('readline');
const fs = require('fs');
let run = module.exports = function(){
let lines;
let flagHeader = true;
let index;
let ind;
let primIndex;
let descIndex;
let arrestIndex;
let yearIndex;
let over = [];
let under = [];
let arrest = [];
let narrest = [];
let year1 = 2001;
let year2 = 2016;
let year3 = year1;

let JCrime = {};

let outputFirst = new Array(year2 - year1 + 1).fill(JCrime);
outputFirst = outputFirst.map(function()
{
	let theftObj = {};
	theftObj.over500 = 0;
	theftObj.under500 = 0;
	year1 = year1 + 1;
	theftObj.year = year1;
	JCrime = JSON.stringify(theftObj);
	return JCrime;
});
let outputSec = new Array(year2 - year3 + 1).fill(JCrime);
outputSec = outputSec.map(function()
{
	let assaultObj = {};
	assaultObj.arrested = 0;
	assaultObj.notarrested = 0;
	year3 = year3 + 1;
	assaultObj.year = year3;
	JCrime = JSON.stringify(assaultObj);
	return JCrime;
});
function findIndex(lines1)
{
	primIndex = lines1.indexOf('Primary Type');
	descIndex = lines1.indexOf('Description');
	arrestIndex = lines1.indexOf('Arrest');
	yearIndex = lines1.indexOf('Year');
}
const rl = readline.createInterface({
	input: fs.createReadStream('data/chicagocrimes.csv')
});
function checkFirstCondition(lines1)
{
	let reg = new RegExp(/500/);
	if(lines1[primIndex] === 'THEFT' && reg.test(lines1[descIndex]))
	{
		index = lines1[yearIndex];
		if(isNaN(over[index]))
		{
			over[index] = 0;
			under[index] = 0;
		}
		if(lines1[descIndex] === 'OVER $500')
		{
			over[index] = over[index] + 1;
		}
		if(lines1[descIndex] === '$500 AND UNDER')
		{
			under[index] = under[index] + 1;
		}
		ind = index % 2000 - 1;
		let data = {};
		data.over500 = over[index];
		data.under500 = under[index];
		data.year = Number(index);
		JCrime = JSON.stringify(data);
		outputFirst[ind] = JCrime;
	}
}
function checkSecondCondition(lines1)
{
	let reg2 = new RegExp(/ASSAULT/);
	if(reg2.test(lines1[primIndex]))
	{
		index = lines1[yearIndex];
		if(isNaN(arrest[index]))
		{
			arrest[index] = 0;
			narrest[index] = 0;
		}
		if(lines1[arrestIndex] === 'true' || lines1[arrestIndex] === 'TRUE')
		{
			arrest[index] = arrest[index] + 1;
		}
		if(lines1[arrestIndex] === 'false' || lines1[arrestIndex] === 'FALSE')
		{
			narrest[index] = narrest[index] + 1;
		}
		ind = index % 2000 - 1;
		let data = {};
		data.arrested = arrest[index];
		data.notarrested = narrest[index];
		data.year = Number(index);
		JCrime = JSON.stringify(data);
		outputSec[ind] = JCrime;
	}
}
rl.on('line', (line) => {
	lines = line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
	if(flagHeader)
	{
		flagHeader = false;
		findIndex(lines);
	}
	else
	{
		checkFirstCondition(lines);
		checkSecondCondition(lines);
	}
});
rl.on('close', function() {
	fs.writeFile('output/assault.json', "["+outputSec+"]", (err)=>{
		if(err)
		{
			throw err;
		}
	});
	fs.writeFile('output/theft.json', "["+outputFirst+"]", (err)=>{
		if(err)
		{
			throw err;
		}
	});
});
}
run();
