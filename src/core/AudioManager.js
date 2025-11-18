import * as THREE from 'three';

export class AudioManager {

    #listener = null;
    #ambientSound = null;
    #engineSound = null;
    #audioLoader = null;
    
    constructor(camera) {

        this.#listener = new THREE.AudioListener();
        camera.add(this.#listener);
        
        this.#audioLoader = new THREE.AudioLoader();
        
        this.#loadAmbient();
        this.#loadEngine();
    }
    
    #loadAmbient() {

        this.#ambientSound = new THREE.Audio(this.#listener);
        
        this.#audioLoader.load('/assets/sounds/Moonlight - Gravity Sound.wav', (buffer) => {
            this.#ambientSound.setBuffer(buffer);
            this.#ambientSound.setLoop(true);
            this.#ambientSound.setVolume(0.3);
        });
    }
    
    #loadEngine() {
        this.#engineSound = new THREE.Audio(this.#listener);
        
        this.#audioLoader.load('/assets/sounds/Engine Loop_4.wav', (buffer) => {
            this.#engineSound.setBuffer(buffer);
            this.#engineSound.setLoop(true);
            this.#engineSound.setVolume(0);

        });
    }
    
    playAmbient() {
        if (this.#ambientSound && !this.#ambientSound.isPlaying) {
            this.#ambientSound.play();
        }
    }
    
    stopAmbient() {
        if (this.#ambientSound && this.#ambientSound.isPlaying) {
            this.#ambientSound.stop();
        }
    }
    
    playEngine() {
        if (this.#engineSound && !this.#engineSound.isPlaying) {
            this.#engineSound.play();
        }
    }
    
    updateEngine(isAccelerating, speed) {
        if (!this.#engineSound) return;
        
        // Volume baseado na velocidade (0 a 1)
        const baseVolume = isAccelerating ? 0.8 : 0;
        const speedFactor = Math.min(speed / 50, 1);
        const targetVolume = baseVolume + (speedFactor * 0.3);
        
        // Suavizar transição de volume
        const currentVolume = this.#engineSound.getVolume();
        this.#engineSound.setVolume(
            THREE.MathUtils.lerp(currentVolume, targetVolume, 0.1)
        );
        
        // Pitch baseado na velocidade 
        const targetRate = 0.8 + (speedFactor * 0.4); // 0.8 a 1.2
        this.#engineSound.setPlaybackRate(targetRate);
    }
}