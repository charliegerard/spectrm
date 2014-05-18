var signUp = function(){
	$('.button.save').click(function(){
		$('#login-choice').fadeIn();

		$('#signup-choice').click(function(){
			$('#login-choice').fadeOut();
			$('.sign-up').fadeIn();
		});

		$('#signin-choice').click(function(){
			$('#login-choice').fadeOut();
			$('#sign-in-form').fadeIn();
		});

		$('#cancel_button').click(function(event){
			event.preventDefault();
			$('.sign-up').fadeOut();
			$('.sign-in-form').fadeOut();
		});
	});

	$('#cancelSettings').click(function(event){
		event.preventDefault();
		$('#save-settings').fadeOut();
	});
}