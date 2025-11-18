export class Input {

    #keys = {};
    #cameraToggle = false;
    #isFirstPerson = false;
    
    constructor() {

        window.addEventListener('keydown', (e) => {
            this.#keys[e.code] = true;

            if (e.code === 'KeyC') {
                this.#cameraToggle = true;
            }
        });
        window.addEventListener('keyup', (e) => {
            this.#keys[e.code] = false;
        });

    }
    
    getState() {

        return {
            forward: this.#keys['Space'],
            left: this.#keys['KeyA'],
            right: this.#keys['KeyD'],
            up: this.#keys['KeyS'],
            down: this.#keys['KeyW']
        };
    }

    getCameraToggle() {

        if (this.#cameraToggle) {
            this.#cameraToggle = false; 
            return true;
        }
        return false;
    }

    setFirstPersonMode(enabled) {
        this.#isFirstPerson = enabled;
    }
    
    isFirstPersonMode() {
        return this.#isFirstPerson;
    }

}