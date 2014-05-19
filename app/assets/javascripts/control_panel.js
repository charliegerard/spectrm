//Massive help from http://workshop.chromeexperiments.com/examples/gui/#5--Saving-Values
//Help when working on saving settings: http://learningthreejs.com/blog/2011/08/14/dat-gui-simple-ui-for-demos/
var controllerSize;
//var sizeValue = 0.8;

//$(document).ready(function(){
var controlPanel = function(){

	var GUIsize, GUIdisplayoutline
	//Trying to recreate the savings buttons with divs.
	// var saving = document.createElement('div');
	// saving.setAttribute("id", "saving");
	// saving.innerHTML = "save";
	// document.body.appendChild(saving)

	var gui = new dat.GUI({
	    //height : 5 * 32 - 1
	    height: 1000
	});

	$.getJSON('/settings', function (settings) {
		console.log('settings!', settings);
		$.each(settings, function (i, setting) {
			console.log('a setting', setting);
			var FizzyText = function() {
			  this.message = 'dat.gui';
			  this.size = setting.details;
			  GUIsize = this.size
			};

			var text = new FizzyText();

			controllerSize = gui.add(text, 'size', -5, 5);
			controllerSize.onChange(function(newValue){
				sizeValue = newValue;
			   	console.log("value changed", sizeValue)
			});

			gui.remember(FizzyText);
		});
	});

	//var gui = new dat.GUI();
	  	//gui.add(text, 'message');

	//GIVES THE VALUE OF EACH CONTROLLER

	  	//gui.add(text, 'displayOutline');
	  //gui.add(text, 'explode');

	  	//gui.add(text, 'noiseStrength').step(5); // Increment amount
		//gui.add(text, 'growthSpeed', -5, 5); // Min and max
		//gui.add(text, 'maxSize').min(0).step(0.25); // Mix and match

		// Choose from accepted values
		//gui.add(text, 'message', [ 'pizza', 'chrome', 'hooray' ] );

		// Choose from named values
		//gui.add(text, 'size', { Stopped: 0, Slow: 0.1, Fast: 5 } );

//var gui = new dat.GUI();
		//Add new control panel
		//var f1 = gui.addFolder('Flow Field');
		//f1.add(text, 'size');
		//f1.add(text, 'noiseStrength');

		//var f2 = gui.addFolder('Letters');
		//f2.add(text, 'growthSpeed');
		//f2.add(text, 'maxSize');
		//f2.add(text, 'message');

		//f2.open();

		//SAVE the settings
		//Change saved settings:
		// var fizzyText = new FizzyText();
		// var gui = new dat.GUI({ load: JSON });
		//gui.remember(fizzyText);

		// $speed = parseInt($('.slider-fg')[0].style.width)
		// console.log($speed)
}
//});
