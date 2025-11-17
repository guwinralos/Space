import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Scene } from './Scene.js';

export class App {

    #renderizador = null;
    #sceneManager = null;
    #scene = null;
    #camera = null;
    #controles = null;
    #grupo = null;
    #lua = null;
    #sol = null;
    #luzsol = null;
    #terra = null;
    #naveObjeto = null;
    #naveMixer = null;
    #tempoNave = 0;

    constructor() {
        window.addEventListener('resize', () => this.#redimensionar());
    }

    initialize() {

        // agora a cena REAL existe
        this.#sceneManager = new Scene();
        this.#scene = this.#sceneManager.getScene();

        console.log("Valor da cena na inicialização:", this.#scene);

        // Renderer
        this.#renderizador = new THREE.WebGLRenderer({ antialias: true });
        this.#renderizador.physicallyCorrectLights = true;
        this.#renderizador.outputColorSpace = THREE.SRGBColorSpace;
        this.#renderizador.toneMapping = THREE.ACESFilmicToneMapping;
        this.#renderizador.setClearColor(0xdddddd);
        this.#renderizador.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.#renderizador.domElement);

        // Camera
        const aspect = window.innerWidth / window.innerHeight;
        this.#camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 2000);
        this.#camera.position.set(100, 10, 0);

        // Luz ambiente
        //const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.3);
        //this.#scene.add(luzAmbiente);

        // Fundo EXR
        const exrLoader = new EXRLoader();
        exrLoader.load('assets/texturas/sky.exr', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            this.#scene.background = texture;
            this.#scene.environment = texture;
        });

        // Controles
        this.#controles = new OrbitControls(this.#camera, this.#renderizador.domElement);
        this.#controles.enableDamping = true;
        this.#controles.dampingFactor = 0.1;

        this.#redimensionar();
    }

    run() {
        const frame = new THREE.Clock();

        const render = () => {
            console.log("Cena no render:", this.#scene);

            requestAnimationFrame(render);

            const tempo = frame.getDelta();
            this.#sceneManager.update(tempo);

            if (this.#naveMixer) this.#naveMixer.update(tempo);

            

            this.#controles.update();
            this.#renderizador.render(this.#scene, this.#camera);

            
        };

        render();
    }

    #redimensionar() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.#camera.aspect = w / h;
        this.#camera.updateProjectionMatrix();
        this.#renderizador.setSize(w, h);
    }
}
