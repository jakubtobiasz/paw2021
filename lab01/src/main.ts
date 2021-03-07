class Main {
    static run() {
        new InputManager();
    }
}

class InputManager {
    private inputs: HTMLInputElement[];

    constructor() {
        this.inputs = [];
        document.querySelectorAll('.input-field').forEach((el) => {
            const typedEl = el as HTMLInputElement;
            typedEl.addEventListener('input', () => this.onInputChanged());
            this.inputs.push(typedEl);
        })
    }

    getSum(): number {
        let sum = 0;
        this.inputs.forEach((el) => {
            sum += +el.value;
        })

        return sum;
    }

    getAverage(): number {
        return this.getSum() / this.inputs.length;
    }

    getMax(): number {
        let max = Number.MIN_VALUE;
        this.inputs.forEach((el) => {
            let val = +el.value;
            if (val > max) {
                max = val;
            }
        });

        return max;
    }

    getMin(): number {
        let min = Number.MAX_VALUE;
        this.inputs.forEach((el) => {
            if (el.value.length === 0) return;

            let val = +el.value;
            if (val < min) {
                min = val;
            }
        });

        return min;
    }

    private onInputChanged() {
        const sumInput: HTMLInputElement|null = document.querySelector('#sum-input');
        const averageInput: HTMLInputElement|null = document.querySelector('#average-input');
        const minInput: HTMLInputElement|null = document.querySelector('#min-input');
        const maxInput: HTMLInputElement|null = document.querySelector('#max-input');

        if (sumInput) {
            sumInput.value = `${this.getSum()}`;
        }

        if (averageInput) {
            averageInput.value = `${this.getAverage()}`;
        }

        if (minInput) {
            minInput.value = `${this.getMin()}`;
        }

        if (maxInput) {
            maxInput.value = `${this.getMax()}`;
        }
    }
}

Main.run();
