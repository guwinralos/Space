import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class Spaceship {
    #object = null; 
    #velocity = new THREE.Vector3();
    #acceleration = 20;
    #rotationSpeed = 1;
    #interior = null;
    
    constructor(scene) {
        this.#loadModel(scene);
        this.#loadInterior(scene);
    }
    
    #loadModel(scene) {
        const loader = new GLTFLoader();
        loader.load('/assets/models/spaceship.glb', (gltf) => {
            this.#object = gltf.scene;
            this.#object.scale.set(0.02, 0.02, 0.02);
            this.#object.position.set(100, 10, 0);
            this.#object.rotation.z = 0.4;
            scene.add(this.#object);
        }, undefined, (error) => {
            console.error('Erro ao carregar nave:', error); 
        });
    }
    
    #loadInterior(scene){
        const loader = new GLTFLoader();
        loader.load('/assets/models/cockpit.glb', (gltf) => {
            this.#interior = gltf.scene;
            this.#interior.position.set(100, 10, 0);
            this.#interior.visible = false;
            scene.add(this.#interior);
        });
    }
    
    update(delta, input) {
        if (!this.#object) return;
        this.#handleRotation(delta, input);
        this.#handleMovement(delta, input);
        this.#updateInteriorMovement();
    }
    
    #handleRotation(delta, input) {
        if (!input) return;
        const rotSpeed = this.#rotationSpeed * delta;
    
        // Rotação horizontal 
        if (input.left) {
            this.#object.rotation.y += rotSpeed;
        }
        if (input.right) {
            this.#object.rotation.y -= rotSpeed;
        }
    
        // Rotação vertical 
        if (input.up) { 
            this.#object.rotation.x -= rotSpeed * 0.5;
        } else if (input.down) { 
            this.#object.rotation.x += rotSpeed * 0.5;
        } else {
            
            this.#object.rotation.x *= 0.95;
        }
        
        // Limitar inclinação
        const maxPitch = Math.PI / 6; 
        this.#object.rotation.x = THREE.MathUtils.clamp(
            this.#object.rotation.x,
            -maxPitch,  
            maxPitch 
        );
    }
    
    #handleMovement(delta, input) {
        if (!input) return;
    
        
        const forward = new THREE.Vector3(0, 0, -1); 
        forward.applyQuaternion(this.#object.quaternion); 
    
        if (input.forward) {
            // Acelerar na direção que a nave está apontando
            this.#velocity.add(forward.multiplyScalar(this.#acceleration * delta));
        }
    
        // Velocidade máxima
        const maxSpeed = 100;
        if (this.#velocity.length() > maxSpeed) {
            this.#velocity.normalize().multiplyScalar(maxSpeed);
        }
    
        // Atrito
        this.#velocity.multiplyScalar(0.98);
        
        // Atualizar posição
        this.#object.position.add(this.#velocity.clone().multiplyScalar(delta));
    }
    
    #updateInteriorMovement(){
        if (!this.#interior || !this.#object) return;
        
        this.#interior.position.copy(this.#object.position);
        this.#interior.rotation.x = this.#object.rotation.x;
        this.#interior.rotation.y = this.#object.rotation.y + Math.PI;

    }
    
    getObject() {
        return this.#object;
    }
    
    getInterior(){
        return this.#interior;
    }
    
    getPosition() {
        return this.#object?.position;
    }
    
    getInteriorPosition(){
        return this.#interior?.position;
    }
    
    getVelocity() {
        return this.#velocity;
    }
}