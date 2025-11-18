import * as THREE from 'three';
import { Input } from './Input.js';
import { CameraManager } from './CameraManager.js';
import { Scene } from './Scene.js';
import { Spaceship } from '../entities/spaceShip.js';
import { AudioManager } from './AudioManager.js';




export class App {

    #renderizador = null;
    #sceneManager = null;
    #scene = null;
    #cameraManager = null;
    #spaceShip = null;
    #input = null;
    #audioManager = null;
    #audioStarted = false;

    constructor() {
        window.addEventListener('resize', () => this.#redimensionar());
    }

    initialize() {

        // Scene
        this.#sceneManager = new Scene();
        this.#scene = this.#sceneManager.getScene();

        // Renderer
        this.#renderizador = new THREE.WebGLRenderer({ antialias: true });
        this.#renderizador.physicallyCorrectLights = true;
        this.#renderizador.outputColorSpace = THREE.SRGBColorSpace;
        this.#renderizador.toneMapping = THREE.ACESFilmicToneMapping;
        this.#renderizador.setClearColor(0xdddddd);
        this.#renderizador.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.#renderizador.domElement);

        // Camera Manager
        this.#cameraManager = new CameraManager(this.#renderizador);

        // Audio Manager
        this.#audioManager = new AudioManager(this.#cameraManager.getCamera());

        // Input Manager
        this.#input = new Input();

        // Spaceship
        this.#spaceShip = new Spaceship(this.#scene);

        this.#setupAudioStart(); //
        
        this.#redimensionar();
    }

    #setupAudioStart() {
        const startAudio = () => {
            if (!this.#audioStarted) {
                this.#audioManager.playAmbient();
                this.#audioManager.playEngine();
                this.#audioStarted = true;
                document.removeEventListener('click', startAudio);
                document.removeEventListener('keydown', startAudio);
            }
        };
        document.addEventListener('click', startAudio);
        document.addEventListener('keydown', startAudio);
    }

    run() {

        const frame = new THREE.Clock();


        const render = () => {

            requestAnimationFrame(render);
            const tempo = frame.getDelta();
            this.#sceneManager.update(tempo);
            
            if (this.#spaceShip) {
                this.#spaceShip.update(tempo, this.#input.getState());
                this.#cameraManager.update(this.#spaceShip); 
            }

            if (this.#input.getCameraToggle()) {
                    this.#cameraManager.toggleMode();
                }

            if (this.#audioStarted) {
                    const isAccelerating = this.#input.forward && mode !== 'firstperson';
                    const speed = this.#spaceShip.getVelocity().length();
                    this.#audioManager.updateEngine(isAccelerating, speed);
                }
            
            this.#renderizador.render(this.#scene, this.#cameraManager.getCamera());
        };

        render();
    }
    
    #redimensionar() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.#cameraManager.updateAspect(w, h); 
        this.#renderizador.setSize(w, h);
    }
}