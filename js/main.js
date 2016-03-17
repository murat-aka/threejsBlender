var scene, camera, renderer;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.01;

function init() {
    scene = new THREE.Scene();

    initMesh();
    initCamera();
    initLights();
    initRenderer();

    document.body.appendChild(renderer.domElement);
}




function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(3, 3.5, 5);
    camera.lookAt(scene.position);
    
    //     // add simple ground
    // var ground = new THREE.Mesh( new THREE.PlaneGeometry(200, 200, 10, 10), new THREE.MeshLambertMaterial({color:0x999999}) );
    // ground.receiveShadow = true;
    // ground.position.set(0, 0, 0);
    // ground.rotation.x = -Math.PI / 2;
    // this.scene.add(ground);
            // create the ground plane
        var planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
        var planeMaterial =    new THREE.MeshLambertMaterial({color: 0xffffff});
        var plane = new THREE.Mesh(planeGeometry,planeMaterial);
        plane.receiveShadow  = true;
        // rotate and position the plane
        plane.rotation.x=-0.5*Math.PI;
        plane.position.x=15
        plane.position.y=0
        plane.position.z=0
        // add the plane to the scene
        scene.add(plane);
}


function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
}

function initLights() {
    
        // add spot light
    var spLight = new THREE.SpotLight(0xffffff, 1.75, 2000, Math.PI / 3);
    spLight.castShadow = true;
    spLight.position.set(-100, 300, -50);
    this.scene.add(spLight);
    
    
    // var light = new THREE.AmbientLight(0xffffff);
    // scene.add(light);
}

var mesh = null;
function initMesh() {
    var loader = new THREE.JSONLoader();
    loader.load('./angel.json.js', function(geometry, materials) {
        mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.75;
        mesh.translation = THREE.GeometryUtils.center(geometry);
        scene.add(mesh);
    });
}

function rotateMesh() {
    if (!mesh) {
        return;
    }

    mesh.rotation.x -= SPEED * 2;
    mesh.rotation.y -= SPEED;
    mesh.rotation.z -= SPEED * 3;
}

function render() {
    requestAnimationFrame(render);
    rotateMesh();
    renderer.render(scene, camera);
}

init();
render();
