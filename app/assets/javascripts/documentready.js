var soundcloundOn;

$(document).ready(function(){
	var soundcloundOn;
	cube();

	$('#microphone').click(function(){
			window.source && source.disconnect(0);
			window.microphoneOn = true;
			SoundCloud.soundcloudOn = false;
			SoundCloud.analyser.disconnect();
			SoundCloud.source.disconnect();
			//setting the analyser to null here seems to work better than in the function in the microphone js file
			//analyser = null;
			//console.log(window.microphoneOn = true)
			navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;	
		 	navigator.getUserMedia( {audio:true}, gotStream );
	 });

	$('#song').click(function(){
			window.microphoneOn = false;
			SoundCloud.soundcloudOn = false;
			SoundCloud.analyser.disconnect();
			SoundCloud.source.disconnect();
			analyser = null;
			source = null; 
			sourceJs = null;
			analyser = null;
			buffer = null;			
			setTimeout(function(){
				playSong();
			}, 500);
			

			// if(soundcloudOn === true){
			// 	console.log("hello")
			
			// }

	});

	$('#form').on('submit', function() {
		analyser = null;
		soundcloudOn = true;
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

	$('#leap').click(function(){
		leap();
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