### [Lea Verou - interactive](https://leaverou.github.io/regexplained/)
### [Lea Verou - YT](https://www.youtube.com/watch?v=EkluES9Rvak)
### [playlista](https://www.youtube.com/playlist?list=PLfdtiltiRHWGRPyPMGuLPWuiWgEI9Kp1w)
### [Advanced Search and Replace With RegEx](https://www.youtube.com/watch?v=0F2sSUyrpKM)
### Streścić 'JavaScript Mocne Strony', 'Tajemnice JavaScriptu', 'Zrozumieć JavaScript'
```js
var name = 'henryk';
var text = 'Henryk to podejrzany typ';
var regexp = new RegExp("\\b(" + name + ")\\b", "gi");
console.log(text.replace(regexp, "_$1_")); // _Henryk_ to podejrzany typ
//
var re = /(\w+)\s(\w+)/;
var str = 'John Smith';
var newstr = str.replace(re, '$2, $1');
console.log(newstr); // Smith, John
//
// Counting words
function wordCount(text) {
  return text.match(/\w+/g).length;
}
function wordCount(text) {
  return text.split(/\s+/).length;
}
//
// Strip HTML (warning: will fail in edge cases)
function stripHTML(str) {
  return str.replace(/<.+?>/g, '');
}
function stripHTML(str) {
  return str.replace(/<[^>]+>/g, '');
}
//
// Number
/^[-+]?(\d*\.?\d+|\d+\.)$/
//
// Trimming a string
if (!String.prototype.trim) {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  }
}
```
### john resig tajemnice str. 211 listing 7.10
```js
var chain = 'foo=1&foo=2&blah=a&blah=b&foo=3';

function compress(source) {
	var keys = {};
	source.replace(
		/([^=&]+)=([^&]*)/g,
	    function(full, key, value) {
	       	keys[key] = (keys[key] ? keys[key] + '.' : '') + value;
	       	return '';
	    }
	);
	var result = [];
	for (var key in keys) {
		result.push(key + '=' + keys[key]);
	}
	return result.join('&');
}

console.log(chain); // foo=1&foo=2&blah=a&blah=b&foo=3
console.log(compress(chain)); // foo=1.2.3&blah=a.b
```
