import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { BloomPass } from 'three/examples/jsm/Addons.js';

export class Scene {
    #loader = new THREE.TextureLoader();
    #sceneManager = null;
    #background = null;

    #sun = null;
    #mercury = null;
    #venus = null;
    #earth = null;
    #moon = null;
    #mars = null;
    #jupiter = null;
    #saturn = null;
    #uranus = null;
    #neptune = null;

    #solarSystemGrp = null;
    
    // Órbita individual para cada planeta
    #mercuryOrbit = null;
    #venusOrbit = null;
    #earthOrbit = null;
    #marsOrbit = null;
    #jupiterOrbit = null;
    #saturnOrbit = null;
    #uranusOrbit = null;
    #neptuneOrbit = null;

    constructor() {
        this.#sceneManager = new THREE.Scene();
        this.#solarSystemGrp = new THREE.Group();
        this.#sceneManager.add(this.#solarSystemGrp);

        // setups
        
        this.#setupPlanets();
        this.#setupLights();
    }

    #setupLights() {
        
    }

    #createPlanet(texturePath, scale, position, axialTilt = 0, orbitalTilt = 0){
        // Create Orbit
        const orbit = new THREE.Group();
        orbit.rotation.x = THREE.MathUtils.degToRad(orbitalTilt); 
        this.#solarSystemGrp.add(orbit);
        
        // Criar planeta
        const geo = new THREE.SphereGeometry(1, 30, 30);
        const tex = this.#loader.load(texturePath);
        const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: tex }));
        mesh.scale.set(scale, scale, scale);
        mesh.position.set(position, 0, 0);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        // Aplicar inclinação axial se houver
        if (axialTilt !== 0) {
            mesh.rotation.z = axialTilt;
        }
        
        orbit.add(mesh);
        
        return { mesh, orbit };
    }

    #createOrbitLine(radius, color, orbitalTilt) {
        const geometry = new THREE.BufferGeometry();
        const points = [];
        const segments = 128;
        
        for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            points.push(
                new THREE.Vector3(
                    Math.cos(theta) * radius,
                    0,
                    Math.sin(theta) * radius
                )
            );
        }
        
        geometry.setFromPoints(points);
        
        const material = new THREE.LineBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.3
        });
        
        const line = new THREE.Line(geometry, material);
        line.rotation.x = THREE.MathUtils.degToRad(orbitalTilt); // Aplicar inclinação orbital
        this.#sceneManager.add(line);
        
        return line;
    }

    #setupPlanets() {
        const planetsGeo = new THREE.SphereGeometry(1, 30, 30);

        //Sun
        const sunTexture = this.#loader.load('assets/texturas/sun2.jpg'); 
        this.#sun = new THREE.Mesh( 
            planetsGeo, 
            new THREE.MeshBasicMaterial({
                map: sunTexture, 
                emissive: 0xFC9601, 
                emissiveIntensity: 1 })
        );
        this.#sun.position.set(0, 0, 0);
        const sunLight = new THREE.PointLight(0xffffff, 5000, 5000, 2); //Add light to the sun
        this.#sun.add(sunLight);
        this.#sun.scale.set(20, 20, 20);
        this.#sun.castShadow = true;
        //const lightHelper = new THREE.PointLightHelper(sunLight); //Sun lighthelper 
        //this.#sceneManager.add(lightHelper);

        //Mercury
        const mercury = this.#createPlanet('assets/texturas/mercury.jpg', 0.5, 25, 0, 7);
        this.#mercury = mercury.mesh;
        this.#mercuryOrbit = mercury.orbit;

        //Venus
        const venus = this.#createPlanet('assets/texturas/venus.jpg', 1, 30, 0, 3.39);
        this.#venus = venus.mesh;
        this.#venusOrbit = venus.orbit;

        //Earth
        const earth = this.#createPlanet('assets/texturas/terra2.jpg', 1.1, 35, THREE.MathUtils.degToRad(23.5), 0);
        this.#earth = earth.mesh;
        this.#earthOrbit = earth.orbit;

        //Mars
        const mars = this.#createPlanet('assets/texturas/mars.jpg', 0.6, 45, 0, 1.85);
        this.#mars = mars.mesh;
        this.#marsOrbit = mars.orbit;

        //Jupiter
        const jupiter = this.#createPlanet('assets/texturas/jupiter.jpg', 6, 60, 0, 1.31);
        this.#jupiter = jupiter.mesh;
        this.#jupiterOrbit = jupiter.orbit;

        //Saturn
        const saturn = this.#createPlanet('assets/texturas/saturn.jpg', 4, 80, 0, 2.49);
        this.#saturn = saturn.mesh;
        this.#saturnOrbit = saturn.orbit;

        //Uranus
        const uranus = this.#createPlanet('assets/texturas/uranus.jpg', 2, 100, 0, 0.77);
        this.#uranus = uranus.mesh;
        this.#uranusOrbit = uranus.orbit;

        //Neptune
        const neptune = this.#createPlanet('assets/texturas/neptune.jpg', 1.8, 120, 0, 1.77);
        this.#neptune = neptune.mesh;
        this.#neptuneOrbit = neptune.orbit;
        
        //add sun
        this.#solarSystemGrp.add(this.#sun);

        // Criar linhas de órbita
        this.#createOrbitLine(25, 0xaaaaaa, 7);  // Mercury
        this.#createOrbitLine(30, 0xffc649, 3.39);  // Venus
        this.#createOrbitLine(35, 0x4169e1, 0);  // Earth
        this.#createOrbitLine(45, 0xff4500, 1.85);  // Mars
        this.#createOrbitLine(60, 0xffa500, 1.31);  // Jupiter
        this.#createOrbitLine(80, 0xf4a460, 2.49);  // Saturn
        this.#createOrbitLine(100, 0x4fd0e1, 0.77); // Uranus
        this.#createOrbitLine(120, 0x4169e1, 1.77); // Neptune
    }

    update(delta){
        // Velocidades orbitais (translação)
        this.#mercuryOrbit.rotation.y += 0.008;
        this.#venusOrbit.rotation.y += 0.006;
        this.#earthOrbit.rotation.y += 0.005;
        this.#marsOrbit.rotation.y += 0.004;
        this.#jupiterOrbit.rotation.y += 0.002;
        this.#saturnOrbit.rotation.y += 0.0015;
        this.#uranusOrbit.rotation.y += 0.001;
        this.#neptuneOrbit.rotation.y += 0.0008;
        
        // Rotação dos planetas no próprio eixo
        this.#mercury.rotation.y += 0.002;
        this.#venus.rotation.y += 0.001;
        this.#earth.rotation.y += 0.01;
        this.#mars.rotation.y += 0.01;
        this.#jupiter.rotation.y += 0.02;
        this.#saturn.rotation.y += 0.018;
        this.#uranus.rotation.y += 0.012;
        this.#neptune.rotation.y += 0.011;
    }

    getScene() {
        return this.#sceneManager;
    }
}
