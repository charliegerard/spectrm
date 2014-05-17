//Massive thanks to Sann-Remy for putting his code on github. Huge help!
//http://srchea.com/experimenting-with-web-audio-api-three-js-webgl

var context;
var source; 
var sourceJs;
var analyser;
var buffer;
var boost = 0;
var array = new Array();
var url = 'sound/Hungry_Face.mp3'
var microphoneOn = false;

//------------------------ CREATE AUDIO CONTEXT --------------------------
//
if (typeof AudioContext !== "undefined") {
    context = new AudioContext();
} else if (typeof webkitAudioContext !== "undefined") {
    context = new webkitAudioContext();
} else {
    return;
}

//----------------------- Request URL with sound -------------------------
//
var request;

//Function to be called on document.ready
var playSong = function(){
		request = new XMLHttpRequest();
		request.open("GET", url, true);
		request.responseType = 'arraybuffer';

	    request.onload = function(){
	    	context.decodeAudioData(
	    		request.response,
	    		function(buffer){
	    			if(!buffer){
	    				$('#info').text('Error decoding file data');
						return;
	    			}

	    			sourceJs = context.createJavaScriptNode(2048);
	    			sourceJs.buffer = buffer;
	    			sourceJs.connect(context.destination);

	    			//Creates the analyser
	    			analyser = context.createAnalyser();
	    			analyser.smoothingTimeConstant = 0.5;

	    			analyser.fftSize = 512;

	    			source = context.createBufferSource();

	    			source.buffer = buffer;
	    			//Looping the sound??
	    			//source.loop = true;

	    			//connects the source with the analyser;
	    			source.connect(analyser);
	    			//connects the analyser with the sound node??
	    			analyser.connect(sourceJs);
	    			source.connect(context.destination);
	    			//When the sound is playing, do that:
	 
	    			sourceJs.onaudioprocess = function(e){

	    				array = new Uint8Array(analyser.frequencyBinCount);
	    				//Puts the sound data in the analyser?
	    				analyser.getByteFrequencyData(array);
	    				//makes the sound move another way
	    				//analyser.getByteTimeDomainData(array);
	    				boost = 0;
	    				//Not sure about that. 
	    				for(var i = 0; i < array.length; i++){
	    					boost += array[i];
	    				}
	    				boost = (boost / array.length) * (value * 2);
	    				console.log(value)
	    			};
		   			play();
	    		}
	    	)
	    };
	
    request.send();

	//Plays the sound when you press on the 'SONG' button
	 function play() {
	 	$('#play').fadeOut('normal', function() {
	 		$(this).remove();
 		});
	 	source.noteOn(0);
	}
};





