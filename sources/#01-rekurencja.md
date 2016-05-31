###sierpiński freestyle
```js
window.onload = function() {
  var canvas = document.getElementById('sierpinski'),
      c = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      iterations = 4,
      p1 = {
        x: -350,
        y: 0
      },
      p2 = {
        x: 350,
        y: 0
      };

  c.translate(width / 2, height - 20);

  function sierpinski(p1, p2, limit) {
    if (limit <= iterations) {

      var dx = p2.x - p1.x,
          dy = p2.y - p1.y,
          dist = Math.sqrt(dx * dx + dy * dy),
          angle = Math.atan2(dy, dx);

      var a = {
            x: p1.x + 0.25 * dx,
            y: p1.y + 0.25 * dy
          },
          b = {
            x: a.x + Math.cos(angle - Math.PI / 3) * dist / 4,
            y: a.y + Math.sin(angle - Math.PI / 3) * dist / 4
          },
          // LOL
          c2 = {
            x: p1.x + Math.cos(angle - Math.PI / 3) * dist / 2,
            y: p1.y + Math.sin(angle - Math.PI / 3) * dist / 2 
          },
          d = {
            x: p1.x + Math.cos(angle - Math.PI / 3) * dist / 4 * 3,
            y: p1.y + Math.sin(angle - Math.PI / 3) * dist / 4 * 3
          },
          e = {
            x: a.x + Math.cos(angle - Math.PI / 3) * dist / 4 * 3,
            y: a.y + Math.sin(angle - Math.PI / 3) * dist / 4 * 3 
          },
          f = {
            x: p1.x + 0.5 * dx + Math.cos(angle - Math.PI / 3) * dist / 2,
            y: p1.y + 0.5 * dy + Math.sin(angle - Math.PI / 3) * dist / 2 
          },
          g = {
            x: p1.x + 0.5 * dx + Math.cos(angle - Math.PI / 3) * dist / 4,
            y: p1.y + 0.5 * dy + Math.sin(angle - Math.PI / 3) * dist / 4 
          },
          h = {
            x: p1.x + 3 / 4 * dx,
            y: p1.y + 3 / 4 * dy
          };

      if (limit == iterations) {
          c.beginPath();
          c.moveTo(p1.x, p1.y);
          c.lineTo(a.x, a.y);
          c.lineTo(b.x, b.y);
          c.lineTo(c2.x, c2.y);
          c.lineTo(d.x, d.y);
          c.lineTo(e.x, e.y);
          c.lineTo(f.x, f.y);
          c.lineTo(g.x, g.y);
          c.lineTo(h.x, h.y);
          c.lineTo(p2.x, p2.y);
          c.stroke();
      }

      sierpinski(p1, a, limit + 1);
      sierpinski(b, a, limit + 1);
      sierpinski(b, c2, limit + 1);
      sierpinski(d, c2, limit + 1);
      sierpinski(d, e, limit + 1);
      sierpinski(f, e, limit + 1);
      sierpinski(f, g, limit + 1);
      sierpinski(h, g, limit + 1);
      sierpinski(h, p2, limit + 1);

    }

  }

  sierpinski(p1, p2, 1);
};
```
###liczba składająca się z *3+5
```js
function numberComposition( num ) {
	const all = [];
	function further( current, history=current ) {
		if (current === num) all.push( history );
		else if ( current > num ) return null;
		else {
          return further( current * 3, `(${history} * 3)` ) || further( current + 5, `(${history} + 5)` );
		}
	}
	further( 1 );
	return all;
}
console.log(numberComposition( 24 )); // -> '(((((1 * 3) * 3) + 5) + 5) + 5),(((1 * 3) + 5) * 3)'
```
###przeszukiwanie węzłów dokumentu
```js
// przygotować
```
###JSON to drzewko geneaologiczne)
```js
let categories = 
[
{ id: 'animals',    parent:  null     },
{ id: 'mammals',    parent: 'animals' },
{ id: 'birds',      parent: 'animals' },
{ id: 'dogs',       parent: 'mammals' },
{ id: 'cats',       parent: 'mammals' },
{ id: 'owls',       parent: 'birds'   },
{ id: 'parrots',    parent: 'birds'   },
{ id: 'pitbull',    parent: 'dogs'    },
{ id: 'labrador',   parent: 'dogs'    },
{ id: 'persian',    parent: 'cats'    },
{ id: 'tiger',      parent: 'cats'    },
{ id: 'lion',       parent: 'cats'    },
{ id: 'puma',       parent: 'cats'    },
{ id: 'ara',        parent: 'parrots' },
{ id: 'kakadu',     parent: 'parrots' },
{ id: 'eeagle-owl', parent: 'owls'    },
{ id: 'tawny',      parent: 'owls'    },

];

function makeTree(categories, parent) {
	const node = {};
	categories.filter( c => c.parent === parent )
	          .forEach( c => node[c.id] = makeTree(categories, c.id) );
	return node;
}

let all = makeTree(categories, null);
console.log(all.animals.mammals.cats);

console.log(
	JSON.stringify(
		  all
		, null
		, 2
	)
)
```
###ilość dróg z punktu do punktu po siatce
```js
function allWays( down, right = down ) {
	if ( !allWays.cache ) allWays.cache = {};
	
	if( down > right ) [down, right] = [right, down];
	const key = `${down} - ${right}`;
	
	if( allWays.cache[key] ) return `CACHE: (${key}) -> ${allWays.cache[key]}`;
	
	let quantity = 0;
	    

	function explore( down, right ) {
		if ( down === 0 || right === 0 ) { // "||" operator is more efficient than "&&" operator in this case.
			quantity++;
			return; 
		}
		else if ( down < 0 || right < 0 )  return;
		else {
			explore( down - 1, right     );
			explore( down    , right - 1 ); 
		}
	}
	explore( down, right );
	
	allWays.cache[key] = quantity;
	return `(${key}) -> ${quantity}`;
}

console.log( allWays(12) );    // (12 - 12) -> 2704156
console.log( allWays(12) );    // CACHE: (12 - 12) -> 2704156
console.log( allWays(14,3) );  // (3 - 14) -> 680
console.log( allWays(3,14) );  // CACHE: (3 - 14) -> 680
```
### quicksort [alternatywa](https://gist.github.com/paullewis/1981455)
```js
let randomNumbers = [];
for (let n=0; n<100; n++) {
	randomNumbers[n] = Math.floor(Math.random() * 1000);
}
console.log( randomNumbers.join() );


function quicksort( a, left = 0, right = a.length - 1 ) {
	let i, j;
	i = j = left;
	 
	while( i < right ) {
		if (a[i] <= a[right]) { 
			[ a[i], a[j] ] = [ a[j], a[i] ];
			j++;
		}
		i++;
	}
 
	[ a[right], a[j] ] = [ a[j], a[right] ];
 
	if( left < j - 1 ) quicksort( a, left, j - 1 );
	if( j + 1 < right ) quicksort( a, j + 1, right );
}

quicksort( randomNumbers );

console.log( randomNumbers.join() );
```
### dziwny fraktal
```js
var ty = document.createElement('canvas'),
    c = ty.getContext('2d'),
    w = ty.width = window.innerWidth,
    h = ty.height = window.innerHeight;

document.body.appendChild(ty);
c.fillStyle='black';
c.fillRect(0, 0, w, h);

  function rec(x, y, r, a) {
    if(a === 0) {
      c.beginPath();
      c.fillStyle='white';
      c.arc(x, y, r, 0, 2*Math.PI, false);
      c.closePath();
      c.fill();
    }
    else {
      var t = [];
      for (var q=0; q<10; q++) {
        t[q] = {
          'left': x + Math.cos(q/10 * 2 * Math.PI) * r,
          'top' : y + Math.sin(q/10 * 2 * Math.PI) * r,
          'rad' : Math.sin((q+1)/11 * Math.PI) * r * 0.24
        };
      }
      rec(t[0].left, t[0].top, t[0].rad, a-1);
      rec(t[1].left, t[1].top, t[1].rad, a-1);
      rec(t[2].left, t[2].top, t[2].rad, a-1);
      rec(t[3].left, t[3].top, t[3].rad, a-1);
      rec(t[4].left, t[4].top, t[4].rad, a-1);
      rec(t[5].left, t[5].top, t[5].rad, a-1);
      rec(t[6].left, t[6].top, t[6].rad, a-1);
      rec(t[7].left, t[7].top, t[7].rad, a-1);
      rec(t[8].left, t[8].top, t[8].rad, a-1);
      rec(t[9].left, t[9].top, t[9].rad, a-1);
    }
  }
  rec(w/2, h/2, h * 0.3, 3);
```
