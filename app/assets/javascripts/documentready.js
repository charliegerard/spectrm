$(document).ready(function(){
	cube();
	//var sizeValue = 1;
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
			//setting the analyser to null here seems to work better than in the function in the microphone js file
			analyser = null;
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

	$('#city').click(function(){
		city();
	});

	$('#sphere').click(function(){
		sphere();
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

	$('.signInButton').click(function(event){
		event.preventDefault();

		var user_email = $('#email').val();
		var user_password = $('#password').val();

		$.ajax({
			url: '/login',
			type: 'POST',
			datatype: 'json',
			data: {email : user_email, password : user_password}
		})

		.done(function(data){
			console.log(data)
			if(data){
				$('#sign-in-form').fadeOut();
				$('.menu h3').prepend('<p>' + '<a href="/logout">' + 'Sign out ' + data + '</a>' + '</p>')
				location.reload();
			} else {
				$('#sign-in-form').prepend('<p>' + 'Incorrect email or password' + '</p>')
			}
		})
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