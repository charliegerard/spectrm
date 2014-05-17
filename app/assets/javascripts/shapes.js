// $(document).ready(function(){	
// 	 controllerSpeed.onChange(function(value){
// 	   	console.log("value changed", value)
// 	 });
// });

var cube = function(){
	//Creating the scene and objects
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(60, $(window).width() / $(window).height(), 1, 1000);
	var renderer = new THREE.WebGLRenderer();
	var cubes = new Array(); //Array of cubes
	var controls;
	//console.log(FFTData)

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

			//Not sure how this part works, need to figure out.
			cubes[i][j] = new THREE.Mesh(geometry, material);
			//Left position on screen??
			cubes[i][j].position = new THREE.Vector3(x,y,30);
			// camera.rotation.x = 100

			//cubes[i][j].rotateOnAxis(y, 90)

			// ----- ROTATES THE CUBES LIKE CRAZY ---------
			// cubes[i][j].rotation.x += x
			// cubes[i][j].rotation.y += y

			// ----- OTHER TEST -------
			// cubes[i][j].rotation.x += x

			//Adds the cubes to the scene.
			scene.add(cubes[i][j])
			j++;
		}
		i++;
	}

	//Creates light for the scene. Nothing is visible otherwise;
	var light = new THREE.AmbientLight(0x505050);
	scene.add(light);


	//Need to test all that to see what it does.
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

	camera.position.z = 70;

	//Allows to move the camera??
	// controls = new THREE.OrbitControls(camera);
	// controls.addEventListener('change', render);

	// for(var i = 0; i < 7; i++){
	 //	controls.pan(new THREE.Vector3(1,0,0));
	 	//controls.pan(new THREE.Vector3(0,1,0));
	 //}

	//Draws the cubes??
	var render = function(){
		// console.log(array)
		if(typeof array === 'object' && array.length > 0) {
			//console.log(array)
			var k = 0;
			for(var i = 0; i <cubes.length; i++){
				for(var j = 0; j < cubes[i].length; j++){
					var scale = (array[k]  + boost)/ 30; // THE LAST VALUE IMPACTS ON THE HEIGHT OF THE CUBES
					cubes[i][j].scale.z = (scale < 1 ? 1 : scale);
					k += (k < array.length ? 1 : 0);
				}
			}
		}

		requestAnimationFrame(render);
		//Supposed to update OrbitControls to move the shapes
		//controls.update();
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









