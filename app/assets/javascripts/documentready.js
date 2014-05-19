$(document).ready(function(){
	cube();
	//controlPanel();
	//controllerSize;
	signUp();
	//settings();
	//saveSettings(listName, sizeValue);
	// changeValue();
	//loadSettings();

	$('#microphone').click(function(){
			window.source && source.disconnect(0);
			window.microphoneOn = true;
			//console.log(window.microphoneOn = true)
			navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;	
		 	navigator.getUserMedia( {audio:true}, gotStream );
	 });

	$('#song').click(function(){
			window.microphoneOn = false;
			playSong();
	});

	$('#cube').click(function(){
		cube();
	});

	$('#landscape').click(function(){
		landscape();
	});

	$('#landscapeNew').click(function(){
		landscapeNew();
	});

	if (window.location.hash) {
		$(window.location.hash).trigger('click');
	}

});