/*
This file adds the leap motion functionality. At the moment I just tested it quickly so this is still a bit
messy...
Basically, I copied the code to create the cube shape and added at the end the code to apply the Leap Motion
to it.
In the next few days, I'll probably go back into all my code and add the Leap Motion part to each of the shapes
and make it do more interesting stuff.
 */

var leap = function(){
	//Creating the scene and objects
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(60, $(window).width() / $(window).height(), 1, 1000);
	var renderer = new THREE.WebGLRenderer();
	var cubes = new Array(); //Array of cubes
	var state  = null;

	document.body.appendChild(renderer.domElement);

	//x and y seem to be the number of rows and columns
	var i=0;
	for(var x = -15; x < 15; x +=2){
		var j = 0;
		cubes[i] = new Array();
		for(var y = -15; y < 15; y+=2 ){
			var geometry = new THREE.CubeGeometry(1.5, 1.5, 1.5);

			var material = new THREE.MeshPhongMaterial({
				color: randomFairColor(),
				ambient: '0x808080',
				specular: 0xffffff,
				shininess: 10,
				reflectivity: 1.5
			});

			cubes[i][j] = new THREE.Mesh(geometry, material);
			cubes[i][j].position = new THREE.Vector3(x,y,30);

			//Adds the cubes to the scene.
			scene.add(cubes[i][j])
			j++;
		}
		i++;
	}

	//Creates light for the scene. Nothing is visible otherwise;
	var light = new THREE.AmbientLight(0x505050);
	scene.add(light);

	//Need to test changing the value of all of this to check the impact.
	var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
	directionalLight.position.set(0,1,1);
	scene.add(directionalLight);

	directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
	directionalLight.position.set(1, 1, 0);
	scene.add(directionalLight);

	directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
	directionalLight.position.set(0, -1, -1);
	scene.add(directionalLight);

	directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
	directionalLight.position.set(-1, -1, 0);
	scene.add(directionalLight);

	//Changes the position of the camera to center the cube on the screen.
	camera.position.z = 70;
	camera.position.x = -1
	camera.position.y = -2

	var render = function(){
		/*
		array is the key variable here as it contains the data we get back from analysing the sound and
		impact the height of each cube in the shape 
		*/
		if(typeof array === 'object' && array.length > 0) {
			var k = 0;
			for(var i = 0; i <cubes.length; i++){
				for(var j = 0; j < cubes[i].length; j++){
					var scale = (array[k]  + boost)/ 30; // THE LAST VALUE IMPACTS ON THE HEIGHT OF THE CUBES
					//Here you can play around with the different settings as long as you use the 'scale' variable.
					cubes[i][j].scale.z = (scale < 1 ? 1 : scale);

					k += (k < array.length ? 1 : 0);
				}
			}
		}

		requestAnimationFrame(render);

		//Leap Motion starting here.
		Leap.loop(function(frame) {
	        if (frame.valid) {
	          if (state == null) {
	          	//Checks if there is a hand over the leap motion and how many fingers.
	            if (frame.hands.length > 0 && frame.pointables.length <= 5) {
	              startFrame = frame;
	              startX = camera.position.x;
	              startZ = camera.position.z;
	              state = 'moving';
	            }
	          } else if (state == 'moving') {
	            var t = startFrame.translation(frame);
	            camera.position.x = t[0] + startX;
	            camera.position.z = t[2] + startZ;

	            if (frame.hands.length == 1 || frame.pointables.legnth > 1) {
	              state = null;
	            }
	          }
	        } else {
	        	$('#errorLeap').fadeIn(); // Display the error message
	        }
      	});

		renderer.render(scene, camera);
	};

	render();
	renderer.setSize($(window).width(), $(window).height());

	//Creates random colors
	function randomFairColor() {
		var min = 64;
		var max = 224;
		var r = (Math.floor(Math.random() * (max - min + 1)) + min) * 65536;
		var g = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
		var b = (Math.floor(Math.random() * (max - min + 1)) + min);
		return r + g + b;
	}
}//End of cube function









