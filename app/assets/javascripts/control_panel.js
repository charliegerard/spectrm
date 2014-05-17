//Massive help from http://workshop.chromeexperiments.com/examples/gui/#5--Saving-Values
//Help when working on saving settings: http://learningthreejs.com/blog/2011/08/14/dat-gui-simple-ui-for-demos/
var controllerSize;
var value = 0.8;

//$(document).ready(function(){
var controlPanel = function(){
	var gui = new dat.GUI({
	    //height : 5 * 32 - 1
	    height: 1000
	});

	var FizzyText = function() {
	  this.message = 'dat.gui';
	  this.size = 0.8;
	  this.displayOutline = false;
	  this.noiseStrength = 50;
	  this.growthSpeed = 1;
	  this.maxSize = 100;
	 // this.explode = function() { ... };
	  // Define render logic ...
	};

	var text = new FizzyText();
	var gui = new dat.GUI();
	  	//gui.add(text, 'message');

	//GIVES THE VALUE OF EACH CONTROLLER
	controllerSize = gui.add(text, 'size', -5, 5);
	controllerSize.onChange(function(newValue){
		value = newValue;
	   	//console.log("value changed", value)
	});

	  	gui.add(text, 'displayOutline');
	  //gui.add(text, 'explode');

	  	gui.add(text, 'noiseStrength').step(5); // Increment amount
		gui.add(text, 'growthSpeed', -5, 5); // Min and max
		gui.add(text, 'maxSize').min(0).step(0.25); // Mix and match

		// Choose from accepted values
		gui.add(text, 'message', [ 'pizza', 'chrome', 'hooray' ] );

		// Choose from named values
		gui.add(text, 'size', { Stopped: 0, Slow: 0.1, Fast: 5 } );

//var gui = new dat.GUI();
		//Add new control panel
		var f1 = gui.addFolder('Flow Field');
		f1.add(text, 'size');
		f1.add(text, 'noiseStrength');

		var f2 = gui.addFolder('Letters');
		f2.add(text, 'growthSpeed');
		f2.add(text, 'maxSize');
		//f2.add(text, 'message');

		f2.open();

		//SAVE the settings
		gui.remember(FizzyText);

		//Change saved settings:
		// var fizzyText = new FizzyText();
		// var gui = new dat.GUI({ load: JSON });
		// gui.remember(fizzyText);

		// $speed = parseInt($('.slider-fg')[0].style.width)
		// console.log($speed)
}
//});
