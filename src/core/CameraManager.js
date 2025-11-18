import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from 'three/examples/jsm/Addons.js';

export class CameraManager{

    #firstPerson = null;
    #camera = null;
    #orbitControls = null;
    #offset = new THREE.Vector3(0.01, 0.05, 0.2); 
    #lookAtOffset = new THREE.Vector3(0, 0, -10); 
    #smoothness = 0.3; 
    #mode = 'follow';

    constructor(renderer){
        this.#createCamera();
        this.#createOrbitControls(renderer);
        this.#createFirstPerson(renderer);
    }

    #createCamera(){
        // Camera
        const aspect = window.innerWidth / window.innerHeight;
        this.#camera = new THREE.PerspectiveCamera(75, aspect, 0.08, 6000);
        this.#camera.position.set(0, 15, 10);
    }

    #createOrbitControls(renderer){
        this.#orbitControls = new OrbitControls(this.#camera, renderer.domElement);
        this.#orbitControls.enableDamping = true;
        this.#orbitControls.dampingFactor = 0.1;
        this.#orbitControls.enabled = false; 
    }

    #createFirstPerson(renderer){
        this.#firstPerson = new PointerLockControls(this.#camera, renderer.domElement);
        this.#firstPerson.enabled = false;
    }

    update(spaceship){

        if (this.#mode === 'follow') {

            const interiorModel = spaceship.getInterior();
            if (interiorModel.visible) interiorModel.visible = false;

            this.#updateFollowMode(spaceship);
            this.#orbitControls.enabled = false;
            this.#firstPerson.enabled = false;

            if (this.#mode !== 'firstPerson' && this.#firstPerson.isLocked) {
                this.#firstPerson.unlock(); 
            }

        } else if (this.#mode === 'orbit') {

            const interiorModel = spaceship.getInterior();
            if (interiorModel.visible) interiorModel.visible = false;

            this.#updateOrbitMode();
            this.#orbitControls.enabled = true;

            if (this.#mode !== 'firstperson' && this.#firstPerson.isLocked) {
                this.#firstPerson.unlock();  
            }

        } else if (this.#mode === 'firstperson') {

            const interiorModel = spaceship.getInterior();
            if (!interiorModel.visible) interiorModel.visible = true;

            this.#updateFirstPerson(spaceship);
            this.#orbitControls.enabled = false;
            this.#firstPerson.enabled = true;

            if (!this.#firstPerson.isLocked) {
                this.#firstPerson.lock();  
            }
        }
    
        const spaceshipObj = spaceship.getObject();
        if (!spaceshipObj) return;
        
    }

    #updateFollowMode(spaceship) {

        const spaceshipObj = spaceship.getObject();
        if (!spaceshipObj) return;
        
        const desiredPosition = new THREE.Vector3();
        desiredPosition.copy(this.#offset);
        desiredPosition.applyQuaternion(spaceshipObj.quaternion);
        desiredPosition.add(spaceshipObj.position);
    
        this.#camera.position.lerp(desiredPosition, this.#smoothness);
        
        const lookAtPoint = new THREE.Vector3();
        lookAtPoint.copy(this.#lookAtOffset);
        lookAtPoint.applyQuaternion(spaceshipObj.quaternion);
        lookAtPoint.add(spaceshipObj.position);
        
        this.#camera.lookAt(lookAtPoint);
    }
    
    #updateOrbitMode() {
        this.#orbitControls.update();
    }

    #updateFirstPerson(spaceship) {
    const interiorModel = spaceship.getInterior();
    if (!interiorModel) return;

    const cockpitOffset = new THREE.Vector3(0, 1.7, 0);

    const cameraPos = new THREE.Vector3();
    cameraPos.copy(cockpitOffset);
    cameraPos.applyQuaternion(interiorModel.quaternion); 
    cameraPos.add(interiorModel.position); 

    this.#camera.position.copy(cameraPos);

    }
    
    toggleMode() {

        if (this.#mode === 'follow') {
            this.#mode = 'firstperson';
        } else if (this.#mode === 'firstperson') {
            this.#mode = 'orbit';
        } else {
            this.#mode = 'follow';
        }
    }
    
    getMode() {
        return this.#mode;
    }
    
    setMode(mode) {
        if (mode === 'follow' || mode === 'orbit' || mode === 'firstperson') {
            this.#mode = mode;
        }
    }

    getCamera() {
        return this.#camera;
    }

    updateAspect(width, height) {
        this.#camera.aspect = width / height;
        this.#camera.updateProjectionMatrix();
    }
}
