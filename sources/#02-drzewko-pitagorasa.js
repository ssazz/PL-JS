/*
Author: Mariusz Gumienny
Date:   22/05/2016
####### Paste this script into console (DevTools) if you want to see Pythagoras tree.
*/

;(function(w, d){
	'use strict';
	var canvas = d.createElement('canvas'),
	    c = canvas.getContext('2d'),
	    width = canvas.width = w.innerWidth,
	    height = canvas.height = w.innerHeight,
	    PI = Math.PI,
	    limit = 7,
	    maxLimit = 12,
	    cosRatio = 0,
	    sinRatio = 0,
	    globalAngle = 30 / 180 * PI,
	    rgbCyan = [71, 242, 232],
	    rgbPink = [247, 131, 254],
	    colors = getGradient(rgbCyan, rgbPink, limit);

	d.body.innerHTML = '';
	canvas.style.position = 'absolute';
	canvas.style.top = 0;
	canvas.style.left = 0;
	d.body.appendChild(canvas);
	
	/*
	* @param  {Array}  - first color RGB
	* @param  {Array}  - second color RGB
	* @param  {Number} - number of steps
	* @return {Array}  - array of colors
	*/
	function getGradient(a, b, steps) {
		steps = Math.max(steps, 2);
		var R = Math.floor( (b[0] - a[0]) / (steps - 1) ),
		    G = Math.floor( (b[1] - a[1]) / (steps - 1) ),
		    B = Math.floor( (b[2] - a[2]) / (steps - 1) ),
		    colors = [],
		    i = 0;
		    
		while(i < steps) {
			colors[i] = 'rgb('
			+ Math.abs(a[0] + R * i)
			+ ', '
			+ Math.abs(a[1] + G * i)
			+ ', '
			+ Math.abs(a[2] + B * i)
			+ ')';
			
			i++;
		}
		
		return colors;
	}
	
	function tree() {
		cosRatio = Math.cos(globalAngle);
		sinRatio = Math.sin(globalAngle);
		c.save();
		c.fillStyle = 'black';
		c.fillRect(0, 0, width, height);
		c.translate(width / 2, height); // bottom center
		c.save();
			recursion(0, height / 5, 0, 1);
		c.restore();
	}
	
	function recursion(angle, left, right, level) {
		c.rotate(angle);
		if (left >= 1) {
			// if value of "left" is higher than 1px
			c.fillStyle = colors[level - 1];
			c.fillRect(-left / 2, -left - right / 2, left, left);
		}
		if (level < limit) {
			c.translate(0,  -left - right / 2);
			c.save();
			right = sinRatio * left;
			left *= cosRatio;
			recursion(-globalAngle, left, right, level + 1);
			recursion(PI / 2 - globalAngle, right, left, level + 1);
		} else {
			c.restore();
		}
	}
	
	function setAngle(mouseY) { 
		return mouseY / height * PI / 2;
	}
	
	function handlerAngle(e) {
		if (e.type == 'mousemove') {
			globalAngle = setAngle(e.clientY - canvas.getBoundingClientRect().top);
		} else if (e.type == 'touchmove' || e.type == 'touchstart') {
			e.preventDefault();
			globalAngle = setAngle(e.changedTouches[0].pageY - canvas.getBoundingClientRect().top);
		}
		tree();
	}
	 
	canvas.addEventListener('touchmove',  handlerAngle, false);
	canvas.addEventListener('touchstart', handlerAngle, false);
	canvas.addEventListener('mousemove',  handlerAngle, false);
	
	w.addEventListener('keydown', function(e) {
		switch (e.keyCode) {
			case 38: case 39: // up and right keys
				limit = Math.min(++limit, maxLimit);
				break;
			case 37: case 40: // left and down keys
				limit = Math.max(--limit, 1);
				break;
		}
		colors = getGradient(rgbCyan, rgbPink, limit);
		tree();
	}, false);
	
	w.addEventListener('resize', function() {
		width  = canvas.width  = w.innerWidth;
		height = canvas.height = w.innerHeight;
		tree();
	}, false);

	tree();
})(window, document);
