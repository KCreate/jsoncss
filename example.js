var fs			= require('fs');
var jsoncss 	= require('./index.js');

// test object to css
jsoncss.convert({
	"body": {
		"color":"red"
	}
}, '', function(err, result) {
	if (err) {
		return console.log(err);
	}
	console.log(result);
});

// test json to css
jsoncss.convert('{"body":{"color":"blue"}}', '', function(err, result) {
	if (err) {
		return console.log(err);
	}
	console.log(result);
});

// test json-file to css
fs.readFile('style.json', 'utf8', function(err,data) {
	if (err) {
		return console.log(err);
	}
	var conversion = jsoncss.convert(data, '', function(err, result){
		if (err) {
			return console.log(err);
		}
		console.log(result);
	});
});
