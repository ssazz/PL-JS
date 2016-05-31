rozszerzyć jeszczę bibliotekę o kilka bajerków
```js
(function (window, document, undefined) {
	var Library = function(selector) {
		if (!(this instanceof Library)) {
			return new Library(selector);
		}
		this.elems = this.find(selector);
	};
	
	Library.fn = Library.prototype = {
		
		each: function (fn) {
			for (var i=0, l<this.elems.length; i<l; i++) {
				fn(this.elems[i]);
			}
		},
		
		find: function (selector) {
			try {
				return document.querySelectorAll(selector);
			} catch {
				// document.getElementsByTagName
				// return
			}
			return this;
		},
				
		addClass: function (cssClass) {
			this.each(function(elem){
				if ('classList' in elem) {
					elem.classList.add(cssClass);
				}
				else {
					elem.className += ' ' + cssClass;
				}
			});
			return this;
		},
			
		html: function (html) {
			if (!html) {
				return this.elems[0].innerHTML;
			} else {
				this.each(function(elem){
					elem.innerHTML = html;
				});
			}
			return this;
		},
			
		css: function (prop, val) {
			this.each(function(elem){
				elem.style[prop] = val;
			});
		}
	};
	
	window.$ = Library;
})(window, document);
	
	
// Plug-iny
$.fn.embolden = function() {
	this.css('color', 'red');
}
```
