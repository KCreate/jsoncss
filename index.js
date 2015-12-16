/*
Copyright (c) <2015> <Leonard Schütz>



Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:



The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.



THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var exports = module.exports = {};

// convert json to css
// will call the callbakc first, then return
exports.convert = function(obj, stack, callback) {
	var err;

	// parse json if not already done
	if (typeof obj === "string") {
		if (isValidJson(obj)) {
			obj = JSON.parse(obj);
		} else {
			err = "JSON parsing failed";
		}
	}

	// default value for the callback
	callback = (callback || function(){});

	// iterate over obj
	var length = obj.length;
	var i=0;
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (typeof obj[key] == "object") {
				stack += key+" {\n";
				stack = this.convert(obj[key], stack);
				stack += "}\n";
			} else {
				stack += key+": "+obj[key]+";\n";
				if (i==length-1) {
					stack += "}\n";
				}
			}
		}
		i++;
	}
	callback(err,stack);
	return stack;
};

// validate json
var isValidJson = function(json) {
	try {
		JSON.parse(json);
		return true;
	} catch (e) {
		return false;
	}
};
