/*import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class App {

    #renderizador = null;
    #cena = null;
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
        this.#renderizador = new THREE.WebGLRenderer({ antialias: true });
        this.#renderizador.physicallyCorrectLights = true;
        this.#renderizador.outputColorSpace = THREE.SRGBColorSpace;
        this.#renderizador.toneMapping = THREE.ACESFilmicToneMapping;
        this.#renderizador.setClearColor(0xdddddd);
        this.#renderizador.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.#renderizador.domElement);

        //camera
        const aspect = window.innerWidth / window.innerHeight;
        this.#camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 2000);
        this.#camera.position.set(2, 10, 3);

        this.#cena = new THREE.Scene();
        const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.3);
        this.#cena.add(luzAmbiente);

        //carregar a nave
        const carregarGLTF = new GLTFLoader();
        carregarGLTF.load('assets/texturas/3iatlas.glb', (gltf) => {
            const nave = gltf.scene;
            nave.position.set(3, 2, -3);
            nave.scale.set(0.4, 0.4, 0.4);
            nave.rotation.y = Math.PI / 4;
            this.#naveObjeto = nave;
            this.#cena.add(nave);
        });

        //fundo
        const exrLoader = new EXRLoader();
        exrLoader.load('assets/texturas/sky.exr', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            this.#cena.background = texture;
            this.#cena.environment = texture;
        });

        
        this.#controles = new OrbitControls(this.#camera, this.#renderizador.domElement);
        this.#controles.enableDamping = true;
        this.#controles.dampingFactor = 0.1;

        const loader = new THREE.TextureLoader();
        const grupo = new THREE.Group();

        //sol
        const solTexture = loader.load('assets/texturas/sun.jpg');
        const sol = new THREE.Mesh(
            new THREE.SphereGeometry(1, 30, 30),
            new THREE.MeshBasicMaterial({ map: solTexture })
        );

        //Luz do soll n esta funcionando
        const luzSol = new THREE.PointLight(0xffffff, 2, 100);
        sol.add(luzSol);
        this.#luzsol = luzSol;

        //TERRa
        const terraTexture = loader.load('assets/texturas/terra.jpg');
        const terra = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 30, 30),
            new THREE.MeshBasicMaterial({ map: terraTexture })
        );
        terra.position.x = 3;

        //lua
        const luaTexture = loader.load('assets/texturas/lua.jpg');
        const lua = new THREE.Mesh(
            new THREE.SphereGeometry(0.2, 30, 30),
            new THREE.MeshBasicMaterial({ map: luaTexture })
        );
        lua.position.set(0.8, 1, 0);
        terra.add(lua);

        grupo.position.y = 1;
        grupo.add(sol, terra);
        this.#cena.add(grupo);

        this.#grupo = grupo;
        this.#lua = lua;
        this.#terra = terra;
        this.#sol = sol;

        this.#redimensionar();
    }

    #atualizarNave(tempo) {
        if (this.#naveObjeto && !this.#grupo.children.includes(this.#naveObjeto)) {
            this.#grupo.add(this.#naveObjeto);
        }
        this.#tempoNave -= tempo * 0.1;
    }

    run() {
        const frame = new THREE.Clock();

        const render = () => {
            requestAnimationFrame(render);

            const tempo = frame.getDelta();
            this.#atualizarNave(tempo);

            if (this.#naveMixer) this.#naveMixer.update(tempo);

            if (this.#grupo) this.#grupo.rotation.y += 0.002;
            if (this.#terra) this.#terra.rotation.y += 0.004;
            if (this.#lua) this.#lua.rotation.y += 0.001;

            this.#controles.update();
            this.#renderizador.render(this.#cena, this.#camera);
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

const app = new App();
app.initialize();
app.run();
*/