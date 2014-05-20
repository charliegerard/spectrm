
/**
 * The *AudioSource object creates an analyzer node, sets up a repeating function with setInterval
 * which samples the input and turns it into an FFT array. The object has two properties:
 * streamData - this is the Uint8Array containing the FFT data
 * volume - cumulative value of all the bins of the streaData.
 *
 * The MicrophoneAudioSource uses the getUserMedia interface to get real-time data from the user's microphone. Not used currently but included for possible future use.
 */

var SoundCloudAudioSource = function(player) {
    //var self = this;
    var audioCtx = new (window.AudioContext || window.webkitAudioContext);
    var source = audioCtx.createMediaElementSource(player);
  	var analyser = audioCtx.createAnalyser();
    //analyser.fftSize = 256;
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    var sampleAudioStream = function() {
    	 sizeValue = parseInt($('#sizeInput').val());
    	// this.streamData = new Uint8Array(128);

    	// array = newUint8Array(128);
    	array = new Uint8Array(analyser.frequencyBinCount)
        // analyser.getByteFrequencyData(self.streamData);

        boost = 0;
      	//Not sure about that. 
      	for(var i = 0; i < array.length; i++){
      		boost += array[i];
      	}
      	boost = (boost / array.length) * (sizeValue * 2);
      	//console.log(sizeValue)

        analyser.getByteFrequencyData(array);
        requestAnimationFrame(sampleAudioStream)
    };

    requestAnimationFrame(sampleAudioStream)
    
    this.playStream = function(streamUrl) {
        // get the input stream from the audio element
        player.addEventListener('ended', function(){
            self.directStream('coasting');
        });
        player.setAttribute('src', streamUrl);
        player.play();
    }
};

/**
 * Makes a request to the Soundcloud API and returns the JSON data.
 */
var SoundcloudLoader = function(player) {
    var self = this;
    var client_id = "0f51b1e1e15add18752bc0cb4522134a"; // to get an ID go to http://developers.soundcloud.com/
    this.sound = {};
    this.streamUrl = "";
    this.errorMessage = "";
    this.player = player;

    /**
     * Loads the JSON stream data object from the URL of the track (as given in the location bar of the browser when browsing Soundcloud),
     * and on success it calls the callback passed to it (for example, used to then send the stream_url to the audiosource object).
     * @param track_url
     * @param callback
     */
    this.loadStream = function(track_url, successCallback, errorCallback) {
        SC.initialize({
            client_id: client_id
        });
        SC.get('/resolve', { url: track_url }, function(sound) {
            if (sound.errors) {
                self.errorMessage = "";
                for (var i = 0; i < sound.errors.length; i++) {
                    self.errorMessage += sound.errors[i].error_message + '<br>';
                }
                self.errorMessage += 'Make sure the URL has the correct format: https://soundcloud.com/user/title-of-the-track';
                errorCallback();
            } else {

                if(sound.kind=="playlist"){
                    self.sound = sound;
                    self.streamPlaylistIndex = 0;
                    self.streamUrl = function(){
                        return sound.tracks[self.streamPlaylistIndex].stream_url + '?client_id=' + client_id;
                    }
                    successCallback();
                }else{
                    self.sound = sound;
                    self.streamUrl = function(){ return sound.stream_url + '?client_id=' + client_id; };
                    successCallback();
                }
            }
        });
    };


    this.directStream = function(direction){
        if(direction=='toggle'){
            if (this.player.paused) {
                this.player.play();
            } else {
                this.player.pause();
            }
        }
        else if(this.sound.kind=="playlist"){
            if(direction=='coasting') {
                this.streamPlaylistIndex++;
            }else if(direction=='forward') {
                if(this.streamPlaylistIndex>=this.sound.track_count-1) this.streamPlaylistIndex = 0;
                else this.streamPlaylistIndex++;
            }else{
                if(this.streamPlaylistIndex<=0) this.streamPlaylistIndex = this.sound.track_count-1;
                else this.streamPlaylistIndex--;
            }
            if(this.streamPlaylistIndex>=0 && this.streamPlaylistIndex<=this.sound.track_count-1) {
               this.player.setAttribute('src',this.streamUrl());
               this.player.play();
            }
        }
    }
};

window.onload = function init() {
    var player =  document.getElementById('player');
    var loader = new SoundcloudLoader(player);
    var audioSource = new SoundCloudAudioSource(player);
    var loadAndUpdate = function(trackUrl){
    loader.loadStream(trackUrl,
        function(){
       		audioSource.playStream(loader.streamUrl());
       	});
    }

    // handle the form submit event to load the new URL
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var trackUrl = document.getElementById('input').value;
        loadAndUpdate(trackUrl);
    });
};
