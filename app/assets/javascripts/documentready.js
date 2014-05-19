$(document).ready(function(){
	cube();
	//controlPanel();
	//controllerSize;
	//signUp();
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

	//When not logged in and clicked on save.
	$('#saveSettings').click(function(event){
		event.preventDefault();
		$('#login-choice').fadeIn();
	});

	$('#signup-choice').click(function(event){
		event.preventDefault();
		$('#login-choice').fadeOut();
		$('.sign-up').fadeIn();
	});

	$('#signin-choice').click(function(event){
		event.preventDefault();
		$('#login-choice').fadeOut();
		$('#sign-in-form').fadeIn();
	});

	$('.cancel_button').click(function(event){
		event.preventDefault();
		$('.sign-up').fadeOut();
		$('#sign-in-form').fadeOut();
	});

	$('#cancelSettings').click(function(event){
		event.preventDefault();
		$('#save-settings').fadeOut();
	});

});