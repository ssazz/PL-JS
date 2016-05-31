'use strict';

// Exported: {requestAnimFrame, Animation}

export const requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
    
export class Animation {
    constructor( canvasId, fps = 60 ) {
        this.canvas = document.getElementById( canvasId );
        this.context = this.canvas.getContext( '2d' );
        this.t = 0;
        this.fps = fps;
        this.timeInterval = 0;
        this.startTime = 0;
        this.lastTime = 0;
        this.frames = 0;
        this.animating = false;
    }
    //  {  
    //    id:     String - identifier of canvas element.
    //    width:  Number - canvas width.
    //    height: Number - canvas height.
    //    parent: String - parent of the canvas element; 'body div', for example.
    //  }
    //  # You can write createCanvas({}) statement with empty object to create canvas element with default parameters.
    static createCanvas( {id = 'canvasId', width = 300, height = 150, ancestor = 'body'} ) {
    	try {
    		if ( typeof id       !== 'string' || 
    		     typeof width    !== 'number' || 
    		     typeof height   !== 'number' || 
    		     typeof ancestor !== 'string' ) { throw new TypeError( "Incorrect data when creating canvas element!" ); }
    		
    		const c  = document.createElement( 'canvas' );
    		c.id     = id;
    		c.width  = width;
    		c.height = height;
    		
    		document.querySelector( ancestor ).appendChild( c );
    		
    	} catch( error ) {
    		console.log( error.message );
    	}
    }
    getContext() { 
	return this.context;
    }
    getCanvas() {
	return this.canvas;
    }
    clear() {
	this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height);
    }
    setDrawStage( func ) {
	this.drawStage = func;
    }
    isAnimating() {
	return this.animating;
    }
    getFrames() {
	return this.frames;
    }
    getTimeInterval() {
	return this.timeInterval;
    }
    getTime() {
	return this.t;
    }
    setFps( value ) {
	this.fps = value < 1 ? 1 : Math.min( value, 60 );
    }
    getFps() {
        // return this.fps;
	return this.timeInterval > 0 ? 1000 / this.timeInterval : 0; // real fps
    }
    stop() {
	this.animating = false;
    }
    start() {
        this.animating = true;
        let date = new Date();
        this.startTime = date.getTime();
        this.lastTime = this.startTime;
        if ( this.drawStage !== undefined ) {
            this.drawStage();
        }
        this.animationLoop();
    }
    animationLoop() { 
        const self = this,
              date = new Date(),
              selfTime = date.getTime(),
              miliPerFrame = 1000 / this.fps;

        this.timeInterval = selfTime - this.lastTime;
		
        if ( this.timeInterval > miliPerFrame ) {
            this.frame++;
            this.t += this.timeInterval;
            this.lastTime = selfTime - ( this.timeInterval % miliPerFrame );
            if ( this.drawStage !== undefined ) {
                this.drawStage();
            }
        }
		
        if ( this.animating ) {
            // requestAnimFrame( () => { self.animationLoop(); } );
            requestAnimFrame( self.animationLoop );
        }
    }
}
