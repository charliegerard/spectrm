    //Trying to get content from Soundcloud.
    //I don't know where to get the client id yet.
 //    var context = new webkitAudioContext(),
 //    audio = new Audio(),
 //    source,
 //    // `stream_url` you'd get from 
 //    // requesting http://api.soundcloud.com/tracks/6981096.json
 //    url = 'http://api.soundcloud.com/tracks/6981096/stream' +
 //          '?client_id=YOUR_CLIENT_ID';


 // CODE FOR LSD CIRCLES

 //---------------------------CREATING THE ANALYSER ----------------------------
	//
	// var analyser = context.createAnalyser();
	// analyser.fftSize = 64;
	// var frequencyData = new Uint8Array(analyser.frequencyBinCount);
	// //var frequencyData = new Uint8Array(analyser.minDecibels);

	// console.log(analyser.fftSize);
	// console.log(analyser.frequencyBinCount);
	// console.log(analyser.frequencyBinCount);

	//---------------------------- CREATING ANIMATION ELEMENTS -------------------
	//
	//The div 'visualisation' contains all the other divs to animate.
	// var visualisation = $('#visualisation');
	// //This creates a space between elements? At the moment not doing anything.
	// var barSpacingPercent = 100/analyser.frequencyBinCount;
	// for(var i = 0; i < analyser.frequencyBinCount; i++){
	// 	$('#bar').css("left", i * barSpacingPercent + "%").appendTo("visualisation");
	// 	//original line was
	// 	//$('<div/>').css("left", i * barSpacingPercent + "%").appendTo("visualisation");
	// }

	// var bars = $("#visualisation > div");

	// //Get frequency data and update visualisation.
	// function update(){
	// 	requestAnimationFrame(update);
	// 	//analyser.getByteFrequencyData(frequencyData);
	// 	analyser.getByteFrequencyData(frequencyData);

	// 	bars.each(function(index, bar){
	// 		var randomColor =  Math.floor(Math.random()*256);
	// 		bar.style.height = (frequencyData[index]) + 'px';
	// 		bar.style.width = (frequencyData[index]) + 'px';
	// 		//Drugs
	// 		bar.style.backgroundColor ='rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
	// 	});
	// };

	// //Add audio
	// $("#player").bind('canplay', function(){
	// 	var source = context.createMediaElementSource(this);
	// 	source.connect(analyser);
	// 	analyser.connect(context.destination);

	// 	for (var i = 0; i < array.length; i++) {
	// 	    boost += array[i];
	// 	}
	// 	boost = boost / array.length;
	// });

	// //Kick off
	// update();