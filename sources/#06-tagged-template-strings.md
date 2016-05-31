Do ogarnięcia: [2ality](http://www.2ality.com/2012/12/template-strings-xregexp.html) i [inne](http://www.2ality.com/search/label/template%20literals)
###wstęp
```js
var a = 5;
var b = 10;

function tag(strings, ...values) {
  console.log(strings[0]); // "Hello "
  console.log(strings[1]); // " world "
  console.log(values[0]);  // 15
  console.log(values[1]);  // 50

  return "Bazinga!";
}

tag`Hello ${ a + b } world ${ a * b }`;
// "Bazinga!"
```
```js
// ###### tagged strings
function tmpl(strings, ...keys) {
	return function(...values) {
		const dict = values[values.length - 1] || {};
		let result = [strings[0]];
		keys.forEach(function(key, index){
			let value = typeof key === 'number' ? values[key] : dict[key];
			result.push(value, strings[index + 1]);
		});
		return result.join('');
	};
}

let test = tmpl`${0} - ${1} - ${2} - ${'something'}`;
console.log(test('A', 'B', 'C', {'something': 'z obiektu'}));

// ###### tagged template strings alternative version
const tmpl = (strings, ...keys) => {
  	const str = Array.from(strings);
	return (...values) => {
		const dict = values[values.length - 1] || {};
		let result = [str.shift()];
      		for (let key of keys) {
			let value = typeof key === 'number' ? values[key] : dict[key];
			result.push(value, str.shift());
      		}
		return result.join('');
	};
};

let test = tmpl`${0} - ${1} - ${2} - ${'something'}`;
console.log(test('A', 'B', 'C', {'something': 'z obiektu'}));
