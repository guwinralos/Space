import * as THREE from 'three';
import { HDRLoader } from 'three/examples/jsm/Addons.js';


export class Scene {

    #loader = new THREE.TextureLoader();
    #sceneManager = null;

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

    #asteroidBelt = null;

    #solarSystemGrp = null;
    
    // Órbita individual para cada planeta
    #mercuryOrbit = null;
    #venusOrbit = null;
    #earthOrbit = null;
    #moonOrbit = null;
    #marsOrbit = null;
    #jupiterOrbit = null;
    #saturnOrbit = null;
    #uranusOrbit = null;
    #neptuneOrbit = null;

    

    constructor() {
        this.#sceneManager = new THREE.Scene();
        this.#solarSystemGrp = new THREE.Group();
        this.#sceneManager.add(this.#solarSystemGrp);

        this.#setupBackground();
        this.#setupPlanets();
        this.#setupLights();
    }

    #setupBackground(){

                const rgbeLoader = new HDRLoader();
                rgbeLoader.load('assets/texturas/backgroundteste.hdr', (texture) => {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                this.#sceneManager.background = texture;
                this.#sceneManager.environment = texture;
});
    }

    #setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.#sceneManager.add(ambientLight);

        const hemiLight = new THREE.HemisphereLight(0x8888ff, 0x000000, 0.2);
        this.#sceneManager.add(hemiLight);
    }

    #createPlanet(texturePath, scale, position, axialTilt = 0, orbitalTilt = 0){
        // Criar órbita
        const orbit = new THREE.Group();
        orbit.rotation.z = THREE.MathUtils.degToRad(orbitalTilt); 
        this.#solarSystemGrp.add(orbit);
        
        // Criar planeta
        const geo = new THREE.SphereGeometry(1, 30, 30);
        const tex = this.#loader.load(texturePath);
        const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: tex }));
        mesh.scale.set(scale, scale, scale);
        mesh.position.set(position, 0, 0);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        // Aplicar inclinação do planeta (só tem na terra mas eu quis fazer mesmo assim)
        if (axialTilt !== 0) {
            mesh.rotation.x = axialTilt;
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
            opacity: 0.1
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
        const sunLight = new THREE.PointLight(0xffffff, 1000, 5000, 1); 
        this.#sun.add(sunLight);
        this.#sun.scale.set(40, 40, 40);
        this.#sun.castShadow = true;
        this.#solarSystemGrp.add(this.#sun);
        //const lightHelper = new THREE.PointLightHelper(sunLight); //Sun lighthelper 
        //this.#sceneManager.add(lightHelper); //usei pra debug
        

        //Mercury
        const mercury = this.#createPlanet('assets/texturas/mercury.jpg', 1, 58, 0, 7);
        this.#mercury = mercury.mesh;
        this.#mercuryOrbit = mercury.orbit;

        //Venus
        const venus = this.#createPlanet('assets/texturas/venus.jpg', 2.2, 108, 0, 3.39);
        this.#venus = venus.mesh;
        this.#venusOrbit = venus.orbit;

        //Earth
        const earth = this.#createPlanet('assets/texturas/terra2.jpg', 2.4, 150, THREE.MathUtils.degToRad(23.5), 0);
        this.#earth = earth.mesh;
        this.#earthOrbit = earth.orbit;
        //Moon
        this.#moonOrbit = new THREE.Group();
        this.#moonOrbit.position.set(150, 0, 0);
        this.#earthOrbit.add(this.#moonOrbit);
        
        const moonTexture = this.#loader.load('assets/texturas/lua.jpg'); 
        this.#moon = new THREE.Mesh( 
            planetsGeo, 
            new THREE.MeshStandardMaterial({
                map: moonTexture, 
                })
        );
        this.#moonOrbit.add(this.#moon);
        this.#moon.position.set(4, 0, 0);
        this.#moon.scale.set(0.4, 0.4, 0.4)

        //Mars
        const mars = this.#createPlanet('assets/texturas/mars.jpg', 1.4, 228, 0, 1.85);
        this.#mars = mars.mesh;
        this.#marsOrbit = mars.orbit;

        //Jupiter
        const jupiter = this.#createPlanet('assets/texturas/jupiter.jpg', 12, 780, 0, 1.31);
        this.#jupiter = jupiter.mesh;
        this.#jupiterOrbit = jupiter.orbit;

        //Saturn
        const saturn = this.#createPlanet('assets/texturas/saturn.jpg', 8, 1430, 0, 2.49);
        this.#saturn = saturn.mesh;
        this.#saturnOrbit = saturn.orbit;
        this.#createSaturnRings();

        //Uranus
        const uranus = this.#createPlanet('assets/texturas/uranus.jpg', 4, 2870, 0, 0.77);
        this.#uranus = uranus.mesh;
        this.#uranusOrbit = uranus.orbit;

        //Neptune
        const neptune = this.#createPlanet('assets/texturas/neptune.jpg', 3.8, 4500, 0, 1.77);
        this.#neptune = neptune.mesh;
        this.#neptuneOrbit = neptune.orbit;
        
        this.#createAsteroidBelt();

        // Criar linhas de órbita
        this.#createOrbitLine(58, 0xaaaaaa, 7);  // Mercury
        this.#createOrbitLine(108, 0xffc649, 3.39);  // Venus
        this.#createOrbitLine(150, 0x4169e1, 0);  // Earth
        this.#createOrbitLine(228, 0xff4500, 1.85);  // Mars
        this.#createOrbitLine(780, 0xffa500, 1.31);  // Jupiter
        this.#createOrbitLine(1430, 0xf4a460, 2.49);  // Saturn
        this.#createOrbitLine(2870, 0x4fd0e1, 0.77); // Uranus
        this.#createOrbitLine(4500, 0x4169e1, 1.77); // Neptune
    }

    #createSaturnRings() {
        const innerRadius = 2;
        const outerRadius = 6;
        const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 128);

        // Corrigir UVs
        ringGeometry.computeBoundingBox();
        const pos = ringGeometry.attributes.position;
        const uv = ringGeometry.attributes.uv;

        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);

            const radius = Math.sqrt(x * x + y * y);
            const angle = Math.atan2(y, x);

            uv.setXY(
                i,
                (angle + Math.PI) / (Math.PI * 2),
                (radius - innerRadius) / (outerRadius - innerRadius)
            );
        }
        uv.needsUpdate = true;

        // Textura
        const ringTexture = this.#loader.load('assets/texturas/saturn_ring.png');
        ringTexture.center.set(0.5, 0.5);
        ringTexture.rotation = 0; // ajuste se precisar
        ringTexture.wrapS = ringTexture.wrapT = THREE.RepeatWrapping;

        const ringMaterial = new THREE.MeshBasicMaterial({
            map: ringTexture,
            transparent: true,
            side: THREE.DoubleSide
        });

        const rings = new THREE.Mesh(ringGeometry, ringMaterial);

        rings.rotation.x = Math.PI / 2;
        rings.rotation.z = THREE.MathUtils.degToRad(26.7);

        this.#saturn.add(rings);
}

    #createAsteroidBelt() {
    const asteroidCount = 500; // Quantidade de asteroides
    const minRadius = 400;     // Raio interno (depois de Marte)
    const maxRadius = 600;     // Raio externo (antes de Júpiter)
    
    const asteroidGeo = new THREE.SphereGeometry(0.5, 6, 6);
    const asteroidMat = new THREE.MeshBasicMaterial({
        color: 0x888888,
        roughness: 1
    });
    
    const asteroidGroup = new THREE.Group();
    
    for (let i = 0; i < asteroidCount; i++) {
        const asteroid = new THREE.Mesh(asteroidGeo, asteroidMat);
        
        // Posição aleatória em anel
        const angle = Math.random() * Math.PI * 2;
        const radius = minRadius + Math.random() * (maxRadius - minRadius);
        const height = (Math.random() - 0.5) * 10; 
        
        asteroid.position.set(
            Math.cos(angle) * radius,
            height,
            Math.sin(angle) * radius
        );
        
        // Escala aleatória
        const scale = 0.3 + Math.random() * 1;
        asteroid.scale.set(scale, scale, scale);
        
        // Rotação aleatória
        asteroid.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        
        asteroidGroup.add(asteroid);
    }
    
    this.#sceneManager.add(asteroidGroup);
    
    this.#asteroidBelt = asteroidGroup;
}

    update(delta){
        /*// Velocidades orbitais (translação)
        this.#mercuryOrbit.rotation.y += 0.0008;
        this.#venusOrbit.rotation.y += 0.0006;
        this.#earthOrbit.rotation.y += 0.0005;
        this.#moonOrbit.rotation.y += 0.005
        this.#marsOrbit.rotation.y += 0.0004;
        this.#jupiterOrbit.rotation.y += 0.0002;
        this.#saturnOrbit.rotation.y += 0.00015;
        this.#uranusOrbit.rotation.y += 0.0001;
        this.#neptuneOrbit.rotation.y += 0.00008;
        
        // Rotação dos planetas no próprio eixo
        this.#sun.rotation.y += 0.005;
        this.#mercury.rotation.y += 0.002;
        this.#venus.rotation.y += 0.001;
        this.#earth.rotation.y += 0.01;
        this.#mars.rotation.y += 0.01;
        this.#jupiter.rotation.y += 0.02;
        this.#saturn.rotation.y += 0.018;
        this.#uranus.rotation.y += 0.012;
        this.#neptune.rotation.y += 0.011;
*/  //Velocidades usadas pra teste inicial ^^^  

    const timeScale = 50000;

    // Converter dias em segundos: 1 dia = 86400 s
    const daySec = 86400;

    // Períodos orbitais em dias
    const orbitalPeriods = {
        mercury: 88,
        venus: 225,
        earth: 365,
        moon: 27.3,
        mars: 687,
        jupiter: 4333,
        saturn: 10759,
        uranus: 30687,
        neptune: 60190
    };

    // Períodos de rotação em dias
    const spinPeriods = {
        sun: 25,
        mercury: 58.6,
        venus: -243,
        earth: 1,
        moon: 27.3,
        mars: 1.03,
        jupiter: 0.41,
        saturn: 0.44,
        uranus: 0.72,
        neptune: 0.67
    };

    // função para obter velocidade angular (rad/s) no tempo do jogo:
    const angVel = (periodDays) => {
        if (!periodDays) return 0;
        const periodSecondsReal = periodDays * daySec;
        const periodSecondsGame = periodSecondsReal / timeScale; // comprimido
        return (2 * Math.PI) / periodSecondsGame; // rad / s (no tempo do delta)
    };

    // Translação
    this.#mercuryOrbit.rotation.y += angVel(orbitalPeriods.mercury) * delta;
    this.#venusOrbit.rotation.y += angVel(orbitalPeriods.venus) * delta;
    this.#earthOrbit.rotation.y += angVel(orbitalPeriods.earth) * delta;
    this.#moonOrbit.rotation.y += angVel(orbitalPeriods.moon) * delta;
    this.#marsOrbit.rotation.y += angVel(orbitalPeriods.mars) * delta;
    this.#jupiterOrbit.rotation.y += angVel(orbitalPeriods.jupiter) * delta;
    this.#saturnOrbit.rotation.y += angVel(orbitalPeriods.saturn) * delta;
    this.#uranusOrbit.rotation.y += angVel(orbitalPeriods.uranus) * delta;
    this.#neptuneOrbit.rotation.y += angVel(orbitalPeriods.neptune) * delta;

    // Rotação
    this.#sun.rotation.y += angVel(spinPeriods.sun) * delta;
    this.#mercury.rotation.y += angVel(spinPeriods.mercury) * delta;
    this.#venus.rotation.y += angVel(spinPeriods.venus) * delta;
    this.#earth.rotation.y += angVel(spinPeriods.earth) * delta;
    this.#moon.rotation.y += angVel(spinPeriods.moon) * delta; 
    this.#mars.rotation.y += angVel(spinPeriods.mars) * delta;
    this.#jupiter.rotation.y += angVel(spinPeriods.jupiter) * delta;
    this.#saturn.rotation.y += angVel(spinPeriods.saturn) * delta;
    this.#uranus.rotation.y += angVel(spinPeriods.uranus) * delta;
    this.#neptune.rotation.y += angVel(spinPeriods.neptune) * delta;
    
    if (this.#asteroidBelt) {
        this.#asteroidBelt.rotation.y += 0.00001;
        }
    }

    getScene() {
        return this.#sceneManager;
    }
}
