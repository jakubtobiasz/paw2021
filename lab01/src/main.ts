class Main {
    private inputManager: InputManager;

    constructor() {
        this.inputManager = new InputManager();
    }

    run() {
        this.setupSubmitButton();
    }

    private setupSubmitButton() {
        document.querySelector('#add-input')?.addEventListener('click', (event) => {
            this.onSubmitClicked(event);
        });
    }

    private onSubmitClicked(event: Event) {
        console.log('xd');

        const numberOfInputsInput = document.querySelector<HTMLInputElement>('#number-of-new-inputs');
        const numberOfInputs = parseInt(numberOfInputsInput?.value ?? '0');

        for (let i = 0; i < numberOfInputs; i++) {
            const div = document.createElement('div');
            const input = document.createElement('input');
            input.type = 'number';
            input.classList.add('input-field');
            div.appendChild(input);

            this.inputManager.add(input);
            document.querySelector('#inputs-wrapper')?.appendChild(div);
        }

        if (numberOfInputsInput != null) {
            numberOfInputsInput.value = '';
        }
    }
}

class InputManager {
    private inputs: HTMLInputElement[] = [];

    constructor() {
        this.loadInputs();
    }

    private loadInputs() {
        this.inputs = [];
        document.querySelectorAll('.input-field').forEach((el) => {
            const typedEl = el as HTMLInputElement;
            typedEl.addEventListener('input', () => this.onInputChanged());
            this.inputs.push(typedEl);
        })
    }

    add(input: HTMLInputElement) {
        input.addEventListener('input', () => this.onInputChanged());
        this.inputs.push(input);
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

document.addEventListener('DOMContentLoaded', () => {
    const main = new Main();
    main.run();
});
