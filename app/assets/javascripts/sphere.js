var sphere = function(){
	var SCREEN_WIDTH = window.innerWidth,
	SCREEN_HEIGHT = window.innerHeight,

	radius = 450,

	mouseX = 0, mouseY = 0,

	windowHalfX = window.innerWidth / 2,
	windowHalfY = window.innerHeight / 2,

	camera, scene, renderer;

	init();
	animate();

	function init(){
		var container;

		//Creating the element that is going to contain our Three.js object.
		container = document.createElement('div');
		//Append the container to the body of the page.
		document.body.appendChild(container);

		//Setting up the camera.
		camera = new THREE.PerspectiveCamera(80, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 3000);
		//Setting up the z position of the camera.
		camera.position.z = 1000;

		//creating a scene.
		scene = new THREE.Scene();

		//Setting up the variables that are going to be part of the shape.
		var i, line, vertex1, vertex2, material, p,
					parameters = [ [ 0.25, 0xff7700, 1, 2 ], [ 0.5, 0xff9900, 1, 1 ], [ 0.75, 0xffaa00, 0.75, 1 ], [ 1, 0xffaa00, 0.5, 1 ], [ 1.25, 0x000833, 0.8, 1 ],
							       [ 3.0, 0xaaaaaa, 0.75, 2 ], [ 3.5, 0xffffff, 0.5, 1 ], [ 4.5, 0xffffff, 0.25, 1 ], [ 5.5, 0xffffff, 0.125, 1 ] ],

		//Creating the actual THREE.js object
		geometry = new THREE.Geometry();

		for ( i = 0; i < 1500; i ++ ) {
			var vertex1 = new THREE.Vector3();
				vertex1.x = Math.random() * 2 - 1;
				vertex1.y = Math.random() * 2 - 1;
				vertex1.z = Math.random() * 2 - 1;
				vertex1.normalize();
				vertex1.multiplyScalar( r );

				vertex2 = vertex1.clone();
				vertex2.multiplyScalar( Math.random() * 0.09 + 1 );

				//Push the vertices in the object.
				geometry.vertices.push( vertex1 );
				geometry.vertices.push( vertex2 );
		}

		for( i = 0; i < parameters.length; ++ i ) {

			p = parameters[ i ];

			//Creates the material (texture) of the three.js object
			material = new THREE.LineBasicMaterial( { color: p[ 1 ], opacity: p[ 2 ], linewidth: p[ 3 ] } );

			//The sphere object is made of lines.
			line = new THREE.Line( geometry, material, THREE.LinePieces );
			line.scale.x = line.scale.y = line.scale.z = p[ 0 ];
			line.originalScale = p[ 0 ];
			line.rotation.y = Math.random() * Math.PI;
			line.updateMatrix();
			//Add the lines to the scene.
			scene.add( line );
		}

		//Creates the renderer that is going to render the shape on the screen.
		renderer = new THREE.WebGLRenderer( { antialias: true } );
		//Sets the size of the renderer, here it takes the whole screen.
		renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
		//Append the renderer to the container.
		container.appendChild( renderer.domElement );

		//Event listeners to allow controls.
		//Each of these function is declared below.
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );
		window.addEventListener( 'resize', onWindowResize, false );

	} //End of init() function.

	//function called when the window is resized
	function onWindowResize() {
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		//Updates the settings of the camera accordingly.
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		//Same for the renderer
		renderer.setSize( window.innerWidth, window.innerHeight );
	}

	//Tracks the movements of the mouse to move the camera accordingly.
	function onDocumentMouseMove( event ) {

		mouseX = event.clientX - windowHalfX;
		mouseY = event.clientY - windowHalfY;

	}

	//Not sure what this one does. Maybe not necessary
	function onDocumentTouchStart( event ) {
		if ( event.touches.length > 1 ) {
			event.preventDefault();

			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			mouseY = event.touches[ 0 ].pageY - windowHalfY;
		}
	}

	//Tracks the movement of the mouse again? Not sure...
	function onDocumentTouchMove( event ) {
		if ( event.touches.length == 1 ) {

			event.preventDefault();

			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			mouseY = event.touches[ 0 ].pageY - windowHalfY;
		}
	}

	//Calls the render function with requestAnimationFrame so it is faster.
	function animate(){
		requestAnimationFrame( animate );

		render();
	}

	//This function actually renders everything on the screen.
	function render() {
		//Updates the position of the camera depending on the movement of the mouse?
		camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
		camera.lookAt( scene.position );

		//Rendering everything.
		renderer.render( scene, camera );

		//Not sure about that... Speed?
		var time = Date.now() * 0.0001;

		for ( var i = 0; i < scene.children.length; i ++ ) {

			var object = scene.children[ i ];

			//Rotates the shape and and gives the effect of back and forth.
			if ( object instanceof THREE.Line ) {
				object.rotation.y = time * ( i < 4 ? ( i + 1 ) : - ( i + 1 ) );
				if ( i < 5 ) object.scale.x = object.scale.y = object.scale.z = object.originalScale * (i/5+1) * (1 + 0.5 * Math.sin( 7*time ) );
			}
		}
	} //End of render

}