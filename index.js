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
