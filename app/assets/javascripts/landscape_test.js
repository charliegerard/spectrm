// $(document).ready(function(){	
// 	 controllerSpeed.onChange(function(value){
// 	   	console.log("value changed", value)
// 	 });
// });
var landscapeNew = function(){
	//Creating the scene and objects
	var scene = new THREE.Scene();
										  // fov,aspect,                              near,far
	var camera = new THREE.PerspectiveCamera(100, $(window).width() / $(window).height(), 1, 1000);
	var renderer = new THREE.WebGLRenderer();
	var buildings = new Array(); //Array of buildings
	var controls;

	document.body.appendChild(renderer.domElement);

	//x and y seem to be the number of rows and columns
	var i=0;
	for(var x = 0; x < 50; x +=2){
		var j = 0;
		buildings[i] = new Array();
		for(var y = 0; y < 70; y+=15 ){
			var geometry = new THREE.CubeGeometry(1, 1, 1.5);

			var material = new THREE.MeshPhongMaterial({
				color: randomFairColor(),
				ambient: '0x808080',
				specular: 0xffffff,
				shininess: 10,
				reflectivity: 1.5
			});

			//Not sure how this part works, need to figure out.
			buildings[i][j] = new THREE.Mesh(geometry, material);
			//Left position on screen??
			buildings[i][j].position = new THREE.Vector3(x,0,y);


			//cubes[i][j].rotateOnAxis(y, 90)

			// ----- ROTATES THE CUBES LIKE CRAZY ---------
			// cubes[i][j].rotation.x += x
			// cubes[i][j].rotation.y += y

			// ----- OTHER TEST -------
			// cubes[i][j].rotation.x += x

			//Adds the cubes to the scene.
			scene.add(buildings[i][j])
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

	//to see buildings horizontally z is 50 and y is 2
	camera.position.z = 150;
	camera.position.y = 3;
	//camera.position.x = 10

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
			for(var i = 0; i <buildings.length; i++){
				for(var j = 0; j < buildings[i].length; j++){
					var scale = (array[k]  + boost)/ 100; // THE LAST VALUE IMPACTS ON THE HEIGHT OF THE CUBES
					buildings[i][j].scale.y = (scale < 1 ? 1 : scale);
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
	// renderer.setSize($(window).width(), $(window).height());

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









