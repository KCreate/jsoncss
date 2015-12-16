# jsoncss
npm module that converts json to css.

# Why?
You could combine this with your build process so your server only sends down the needed css to the client. This reduces data usage enormously. For example, Facebook sends down so much css and only uses 10% of it. They could shave off 90% of their css and nobody would notice.

# Usage
```javascript
var jsoncss = require('jsoncss');
```
## Object to css
```javascript
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
```
## JSON string
```javascript
// test json to css
jsoncss.convert('{"body":{"color":"blue"}}', '', function(err, result) {
	if (err) {
		return console.log(err);
	}
	console.log(result);
});
```
## File
```javascript
// test json-file to css
var fs			= require('fs');
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
```
