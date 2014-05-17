
var landscape = function(){

//var buildingMesh = new Array();
var THREEx = THREEx || {}

	THREEx.ProceduralCity	= function(){
		// build the base geometry for each building
		var geometry = new THREE.CubeGeometry( 1, 1, 1 );
		// translate the geometry to place the pivot point at the bottom instead of the center
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );
		// get rid of the bottom face - it is never seen
		geometry.faces.splice( 3, 1 );
		geometry.faceVertexUvs[0].splice( 3, 1 );
		// change UVs for the top face
		// - it is the roof so it wont use the same texture as the side of the building
		// - set the UVs to the single coordinate 0,0. so the roof will be the same color
		//   as a floor row.
		geometry.faceVertexUvs[0][2][0].set( 0, 0 );
		geometry.faceVertexUvs[0][2][1].set( 0, 0 );
		geometry.faceVertexUvs[0][2][2].set( 0, 0 );
		//geometry.faceVertexUvs[0][2][3].set( 0, 0 );
		// buildMesh
		var buildingMesh= new THREE.Mesh( geometry );

		// base colors for vertexColors. light is for vertices at the top, shaddow is for the ones at the bottom
		var light	= new THREE.Color( 0xffffff )
		var shadow	= new THREE.Color( 0x303050 )

		var cityGeometry= new THREE.Geometry();
		var buildings = [];
		// for( var i = 0; i < 20000; i ++ ){
			//for( var i = 0; i < 10000; i ++ ){
			for( var i = 0; i < 1000; i ++ ){
			// put a random position
			buildingMesh.position.x	= Math.floor( Math.random() * 200 - 100 ) * 10;
			buildingMesh.position.z	= Math.floor( Math.random() * 200 - 100 ) * 10;
			// put a random rotation
			buildingMesh.rotation.y	= Math.random()*Math.PI*2;
			// put a random scale
			//cool effect with the x as well :D
			buildingMesh.scale.x	= Math.random() * Math.random() * Math.random() * Math.random() * 50 + 10;
			buildingMesh.scale.y = 50;

			//Test
			//buildingMesh.scale.x = 10;
			var render = function(){
				// var scale = new THREE.Vector3(1,1,Math.random());

				// for(var i = 0; i < cityGeometry.vertices.length; i++) {
				// 	var vertex	= cityGeometry.vertices[i];
				// 	vertex.z *= 1.01; // grow z dimension a little bit
				// 	if (i == 0) {
				// 		console.log(vertex);
				// 	}
				// }

				// // mark the vertices as dirty
				// cityGeometry.__dirtyVertices = true;

				// return;

				if(typeof array === 'object' && array.length > 0) {
					//console.log(array.length)
					var k = 0;
					 for(var i = 0; i < geometry.faces.length; i++){
						//for(var i = 0; i <array.length; i++){
						//for(var j = 0; j <buildingMesh[i].length; j++){
							var scale = (array[k]  + boost)/ 30; // THE LAST VALUE IMPACTS ON THE HEIGHT OF THE CUBES
					//console.log('updating', buildingMesh.scale.y, scale, array[k]);
							buildingMesh.scale.y = (scale < 1 ? 1 : scale);
							k += (k < array.length ? 1 : 0);
						//}
					}
				}
				requestAnimationFrame(render);
				//renderer.render(scene, camera);
			}
			render()

			//End of test

			//the y axis controls the height of each building.
			//buildingMesh.scale.y	= (Math.random() * Math.random() * Math.random() * buildingMesh.scale.x) * 8 + 8;

			buildingMesh.scale.z	= buildingMesh.scale.x

			// establish the base color for the buildingMesh
			var value	= 1 - Math.random() * Math.random();
			//console.log("color ", value )
			var baseColor	= new THREE.Color().setRGB( value + Math.random() * 0.1, value, value + Math.random() * 0.1 );
			// set topColor/bottom vertexColors as adjustement of baseColor
			var topColor	= baseColor.clone().multiply( light );
			var bottomColor	= baseColor.clone().multiply( shadow );
			// set .vertexColors for each face
			var geometry	= buildingMesh.geometry;
			//Supposed to give colors to roofs		
			for ( var j = 0, jl = geometry.faces.length; j < jl; j ++ ) {
				if ( j === 2 ) {
					// set face.vertexColors on root face
					geometry.faces[ j ].vertexColors = [ baseColor, baseColor, baseColor, baseColor ];
				} else {
					// set face.vertexColors on sides faces
					// geometry.faces[ j ].vertexColors = [ topColor, bottomColor, bottomColor, topColor ];
					geometry.faces[ j ].vertexColors = [ topColor, bottomColor, bottomColor, topColor ];
					 
				}
			}
			// merge it with cityGeometry - very important for performance
			THREE.GeometryUtils.merge( cityGeometry, buildingMesh );
			buildings.push(buildingMesh);
		}

		// generate the texture
		var texture		= new THREE.Texture( generateTextureCanvas() );
		texture.anisotropy	= renderer.getMaxAnisotropy();
		texture.needsUpdate	= true;

		// build the mesh
		var material	= new THREE.MeshLambertMaterial({
			map		: texture,
			vertexColors	: THREE.VertexColors
		});
		var mesh = new THREE.Mesh(cityGeometry, material );
		return mesh

		function generateTextureCanvas(){
			// build a small canvas 32x64 and paint it in white
			var canvas	= document.createElement( 'canvas' );
			canvas.width	= 32;
			canvas.height	= 64;
			var context	= canvas.getContext( '2d' );
			// plain it in white
			context.fillStyle	= '#ffffff';
			context.fillRect( 0, 0, 32, 64 );
			// draw the window rows - with a small noise to simulate light variations in each room
			for( var y = 2; y < 64; y += 2 ){
				for( var x = 0; x < 32; x += 2 ){
					var value	= Math.floor( Math.random() * 64 );
					context.fillStyle = 'rgb(' + [value, value, value].join( ',' )  + ')';
					context.fillRect( x, y, 2, 1 );
				}
			}

			// build a bigger canvas and copy the small one in it
			// This is a trick to upscale the texture without filtering
			var canvas2	= document.createElement( 'canvas' );
			canvas2.width	= 512;
			canvas2.height	= 1024;
			var context	= canvas2.getContext( '2d' );
			// disable smoothing
			context.imageSmoothingEnabled		= false;
			context.webkitImageSmoothingEnabled	= false;
			context.mozImageSmoothingEnabled	= false;
			// then draw the image
			context.drawImage( canvas, 0, 0, canvas2.width, canvas2.height );
			// return the just built canvas2
			return canvas2;
		}

	} //End of proceduralCity.

	var updateFcts	= [];
	var scene	= new THREE.Scene();
	scene.fog	= new THREE.FogExp2( 0xd0e0f0, 0.0025 );

	var renderer	= new THREE.WebGLRenderer( { antialias: false } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//////////////////////////////////////////////////////////////////////////////////
	//		creates the camera								//
	//////////////////////////////////////////////////////////////////////////////////

	var camera		= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 3000)
	camera.position.y	= 80

	//////////////////////////////////////////////////////////////////////////////////
	//		add an object and make it move					//
	//////////////////////////////////////////////////////////////////////////////////		
	var light	= new THREE.HemisphereLight( 0xfffff0, 0x101020, 1.25 );
	light.position.set( 0.75, 1, 0.25 );
	scene.add( light );

	var material	= new THREE.MeshBasicMaterial({ color: 0x101018 })
	var geometry	= new THREE.PlaneGeometry( 2000, 2000 )
	var plane	= new THREE.Mesh( geometry, material );
	plane.rotation.x= - 90 * Math.PI / 180;
	scene.add( plane );

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	var city	= new THREEx.ProceduralCity() //Adds the procedural city to the seen
	scene.add(city)
	//scene.add(geometry)
	//scene.add(buildings)

	//////////////////////////////////////////////////////////////////////////////////
	//		Camera Controls							//
	//////////////////////////////////////////////////////////////////////////////////
	var controls	= new THREE.FirstPersonControls( camera );
	controls.movementSpeed	= 20;
	controls.lookSpeed	= 0.05;
	controls.lookVertical	= true;
	updateFcts.push(function(delta, now){
		controls.update( delta );		
	})

	//////////////////////////////////////////////////////////////////////////////////
	//		render the scene						//
	//////////////////////////////////////////////////////////////////////////////////
	updateFcts.push(function(){
		renderer.render( scene, camera );		
	})

	//////////////////////////////////////////////////////////////////////////////////
	//		loop runner							//
	//////////////////////////////////////////////////////////////////////////////////
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
}//End of landscape function
