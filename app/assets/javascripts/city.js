/* This file creates the "city" 3D object (2nd option in the left nav bar) that you
can navigate through by moving the mouse or clicking to move forward */

var city = function(){
	//Creating the scene, camera, renderer and objects
	var scene = new THREE.Scene();
										  // fov,aspect,                              near,far
	var camera = new THREE.PerspectiveCamera(60, $(window).width() / $(window).height(), 1, 1000);
	var renderer = new THREE.WebGLRenderer();
	var buildings = new Array(); //Array of buildings
	var controls;

	//Add the renderer to the body.
	document.body.appendChild(renderer.domElement);

	//x and y seem to be the number of rows and columns
	var i=0;
	for(var x = 0; x < 200; x +=10){
		var j = 0;
		buildings[i] = new Array();
		for(var y = 0; y < 200; y+=10 ){
			var geometry = new THREE.CubeGeometry(3, 10, 3);

			//Creates the 'material' for each cube in the 3D object. 
			var material = new THREE.MeshPhongMaterial({
				color: 'green',
				ambient: '0x808080',
				specular: 0xffffff,
				shininess: 5,
				reflectivity: 1.5
			});

			//Not really sure what a 'mesh' is but it seems to add the geometry and material together.
			buildings[i][j] = new THREE.Mesh(geometry, material);
			//Sets the position of each cube in the object.
			buildings[i][j].position = new THREE.Vector3(x,-10,y-50);

			//Adds the cubes to the scene.
			scene.add(buildings[i][j])
			j++;
		}
		i++;
	}

	//Creates light for the scene. Nothing is visible otherwise;
	var light = new THREE.AmbientLight(0x505050);
	scene.add(light);

	//Different kind of directional lights.
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

	//To see buildings horizontally z is 50 and y is 2
	camera.position.z = 50;
	camera.position.y = 20;
	camera.position.x = -100

	//Changes the scale of the cubes with the music.
	var render = function(){
		if(typeof array === 'object' && array.length > 0) {
			var k = 0;
			for(var i = 0; i <buildings.length; i++){
				for(var j = 0; j < buildings[i].length; j++){
					var scale = (array[k]  + boost)/ 100; // THE LAST VALUE IMPACTS ON THE HEIGHT OF THE CUBES
					buildings[i][j].scale.y = (scale < 1 ? 1 : scale);
					k += (k < array.length ? 1 : 0);
				}
			}
		}

		requestAnimationFrame(render);
		renderer.render(scene, camera);
	};

	render();

	var updateFcts	= [];

	//Creates random colors
	function randomFairColor() {
		var min = 64;
		var max = 224;
		var r = (Math.floor(Math.random() * (max - min + 1)) + min) * 65536;
		var g = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
		var b = (Math.floor(Math.random() * (max - min + 1)) + min);
		return r + g + b;
	}

	//Allows to navigate through the buildings
	var controls = new THREE.FirstPersonControls( camera );
		controls.movementSpeed	= 10;
		controls.lookSpeed	= 0.02;
		controls.lookVertical	= true;
		updateFcts.push(function(delta, now){
			controls.update( delta );		
		})

	updateFcts.push(function(){
		renderer.setSize($(window).width(), $(window).height());
		//renderer.render( scene, camera );		
	})

	var lastTimeMsec= null
	requestAnimationFrame(function animate(nowMsec){
		// keep looping
		requestAnimationFrame( animate );
		// measure time
		lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
		var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
		lastTimeMsec	= nowMsec
		// call each update function
		updateFcts.forEach(function(updateFn){
			updateFn(deltaMsec/1000, nowMsec/1000)
		})
	})

}//End of landscapeNew function









