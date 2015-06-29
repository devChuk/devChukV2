/*
Title:			BrianCh.uk Home Screen Javascript ThreeJS Animation v1
Author:			Brian Chuk (brianch.uk)
Copyright: 		2015, Brian Chuk - All rights reserved (you have permission to use it, just tell me :D)
*/
/*
Art Inspirations
http://imgur.com/gallery/y33EY
http://imgur.com/2xx8BrK
http://turnislefthome.tumblr.com/post/121867827385/excited-to-have-an-illustration-in-the-new


*/

var count, index, objects, scene, geometry, camera;
var renderer = new THREE.WebGLRenderer();

var raycaster;
var mouse = new THREE.Vector2(), INTERSECTED;




function init() {

	// Creating the scene
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );

	// Interacting with the HTML
	var $container = $('#canvas');
	$container.append(renderer.domElement);

	camera.position.z = 30;
	camera.position.y = 5;
	camera.rotation.x = -0.8;


	// Window resize settings
	window.addEventListener( 'resize', onWindowResize, false );
	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}

	geometry = new THREE.BoxGeometry( 1, 1, 1 );

		
	objects = {};
	count = 0;
	index = 0;
	// var colors = ['0xFFEBEE', '0xFFCDD2', '0xEF9A9A', '0xE57373', '0xEF5350', '0xF44336', '0xE53935', '0xD32F2F', '0xC62828', '0xB71C1C'];
	colors = ['0xF44336', '0x9C27B0', '0x2196F3', '0x4CAF50', '0xFFEB3B', '0xFF5722'];
	var light = new THREE.PointLight( 0xffffff, 1, 0 );
	light.position.set( 0, 10, 30 );
	scene.add( light );
	
	raycaster = new THREE.Raycaster();
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}

function onDocumentMouseMove( event ) {

	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function please() {

	var intersects = raycaster.intersectObjects( scene.children );

	if ( intersects.length > 0 ) {

		if ( INTERSECTED != intersects[ 0 ].object ) {

			if ( INTERSECTED ) {
				INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
			}

			INTERSECTED = intersects[ 0 ].object;
			INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
			INTERSECTED.material.emissive.setHex( 0xff0000 );
			INTERSECTED.scale.y += 1;
		}

	} else {

		if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

		INTERSECTED = null;

	}

}

init();
// Rendering the scene
function render() {
	// requestAnimationFrame( render );
	raycaster.setFromCamera( mouse, camera );
	count++;
	if (count % 10 == 0) {
		for (var i = -30; i < 31; i++) {
			var pls = colors[Math.floor(Math.random() * 6)];//'0x'+Math.floor(Math.random()*16777215).toString(16);
			var materialz = new THREE.MeshPhongMaterial( { color: 0x6699ff } );
			var cube = new THREE.Mesh( geometry, materialz );
			scene.add( cube );
			cube.position.x += i;
			cube.material.color.setHex( pls );
			objects[index++] = cube;
		}
	}
	for (var i in objects) {
		objects[i].position.z += 0.1;
		if (objects[i].position.z >= 30) {
			scene.remove(objects[i]);
			delete objects[i];
		}
	}

	please();


	renderer.render( scene, camera );
}
render();


function animate() {
	requestAnimationFrame( animate );
	render();
	update();

}


animate();