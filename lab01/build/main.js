"use strict";
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.run = function () {
        var im = new InputManager();
    };
    return Main;
}());
var InputManager = /** @class */ (function () {
    function InputManager() {
        var _this = this;
        this.inputs = [];
        document.querySelectorAll('.input-field').forEach(function (el) {
            var typedEl = el;
            typedEl.addEventListener('input', function () { return _this.onInputChanged(); });
            _this.inputs.push(typedEl);
        });
    }
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
Main.run();
