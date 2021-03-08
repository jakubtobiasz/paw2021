"use strict";
var Main = /** @class */ (function () {
    function Main() {
        this.inputManager = new InputManager();
    }
    Main.prototype.run = function () {
        this.setupSubmitButton();
    };
    Main.prototype.setupSubmitButton = function () {
        var _this = this;
        var _a;
        (_a = document.querySelector('#add-input')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (event) {
            _this.onSubmitClicked(event);
        });
    };
    Main.prototype.onSubmitClicked = function (event) {
        var _a, _b;
        console.log('xd');
        var numberOfInputsInput = document.querySelector('#number-of-new-inputs');
        var numberOfInputs = parseInt((_a = numberOfInputsInput === null || numberOfInputsInput === void 0 ? void 0 : numberOfInputsInput.value) !== null && _a !== void 0 ? _a : '0');
        for (var i = 0; i < numberOfInputs; i++) {
            var div = document.createElement('div');
            var input = document.createElement('input');
            input.type = 'number';
            input.classList.add('input-field');
            div.appendChild(input);
            this.inputManager.add(input);
            (_b = document.querySelector('#inputs-wrapper')) === null || _b === void 0 ? void 0 : _b.appendChild(div);
        }
        if (numberOfInputsInput != null) {
            numberOfInputsInput.value = '';
        }
    };
    return Main;
}());
var InputManager = /** @class */ (function () {
    function InputManager() {
        this.inputs = [];
        this.loadInputs();
    }
    InputManager.prototype.loadInputs = function () {
        var _this = this;
        this.inputs = [];
        document.querySelectorAll('.input-field').forEach(function (el) {
            var typedEl = el;
            typedEl.addEventListener('input', function () { return _this.onInputChanged(); });
            _this.inputs.push(typedEl);
        });
    };
    InputManager.prototype.add = function (input) {
        var _this = this;
        input.addEventListener('input', function () { return _this.onInputChanged(); });
        this.inputs.push(input);
    };
    InputManager.prototype.getSum = function () {
        var sum = 0;
        this.inputs.forEach(function (el) {
            sum += +el.value;
        });
        return sum;
    };
    InputManager.prototype.getAverage = function () {
        return this.getSum() / this.inputs.length;
    };
    InputManager.prototype.getMax = function () {
        var max = Number.MIN_VALUE;
        this.inputs.forEach(function (el) {
            var val = +el.value;
            if (val > max) {
                max = val;
            }
        });
        return max;
    };
    InputManager.prototype.getMin = function () {
        var min = Number.MAX_VALUE;
        this.inputs.forEach(function (el) {
            if (el.value.length === 0)
                return;
            var val = +el.value;
            if (val < min) {
                min = val;
            }
        });
        return min;
    };
    InputManager.prototype.onInputChanged = function () {
        var sumInput = document.querySelector('#sum-input');
        var averageInput = document.querySelector('#average-input');
        var minInput = document.querySelector('#min-input');
        var maxInput = document.querySelector('#max-input');
        if (sumInput) {
            sumInput.value = "" + this.getSum();
        }
        if (averageInput) {
            averageInput.value = "" + this.getAverage();
        }
        if (minInput) {
            minInput.value = "" + this.getMin();
        }
        if (maxInput) {
            maxInput.value = "" + this.getMax();
        }
    };
    return InputManager;
}());
document.addEventListener('DOMContentLoaded', function () {
    var main = new Main();
    main.run();
});
