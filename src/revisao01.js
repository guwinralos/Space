import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

//REVISAR CODIGO BASE.
// configuracoes iniciais
const renderizador = new THREE.WebGLRenderer();
renderizador.setClearColor(0xdddddd);
renderizador.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderizador.domElement);

const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(
    50, aspect, 0.1, 2000);
camera.position.z = 5;

const cena = new THREE.Scene();

const controles = new OrbitControls(camera,
    renderizador.domElement);
controles.enableDamping = true;
controles.dampingFactor = 0.1;
//controles.target.set(2, 0, 0);


// objeto
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    })
);
cena.add(mesh);


// renderizar a cena
function animate(){
    requestAnimationFrame(animate);
    controles.update();
    renderizador.render(cena, camera);
}

animate();