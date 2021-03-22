"use strict";
var UIManager = /** @class */ (function () {
    function UIManager() {
        this.buttons = {};
        this.init();
    }
    UIManager.prototype.init = function () {
        var _this = this;
        var buttons = document.querySelectorAll('.uimanager-button');
        buttons.forEach(function (button) {
            var key = button.dataset.key;
            if (key) {
                _this.buttons[key] = button;
            }
        });
    };
    UIManager.prototype.blinkButton = function (key) {
        var button = this.buttons[key];
        if (!button)
            return;
        button.classList.add('disabled');
        setTimeout(function () {
            button.classList.remove('disabled');
        }, 200);
    };
    return UIManager;
}());
var Soundboard = /** @class */ (function () {
    function Soundboard(uiManager) {
        this.uiManager = uiManager;
        this.sounds = {};
        this.init();
    }
    Soundboard.prototype.init = function () {
        var _this = this;
        var audioElements = document.querySelectorAll('.soundbar-sound');
        audioElements.forEach(function (element) {
            var key = element.dataset.key;
            if (key) {
                _this.sounds[key] = element;
            }
        });
    };
    Soundboard.prototype.playSound = function (soundKey) {
        if (this.sounds[soundKey]) {
            this.sounds[soundKey].currentTime = 0;
            this.sounds[soundKey].play();
            this.uiManager.blinkButton(soundKey);
        }
    };
    return Soundboard;
}());
var AudioChannelRecorder = /** @class */ (function () {
    function AudioChannelRecorder(soundboard) {
        this.isRecording = false;
        this.recordData = [];
        this.soundboard = soundboard;
    }
    AudioChannelRecorder.prototype.startRecording = function () {
        if (this.isRecording)
            return;
        this.isRecording = true;
        document.addEventListener('keypress', this.onKeyPressed.bind(this), true);
    };
    AudioChannelRecorder.prototype.stopRecording = function () {
        if (!this.isRecording)
            return;
        this.isRecording = false;
        document.removeEventListener('keypress', this.onKeyPressed.bind(this), true);
    };
    AudioChannelRecorder.prototype.play = function () {
        var _this = this;
        this.recordData.forEach((function (value, index, array) {
            var timeToReduce = array[0].timeStamp;
            var timestamp = value.timeStamp - timeToReduce;
            setTimeout(function () {
                _this.soundboard.playSound(value.key);
            }, timestamp);
        }));
    };
    AudioChannelRecorder.prototype.clear = function () {
        this.recordData = [];
    };
    AudioChannelRecorder.prototype.onKeyPressed = function (event) {
        var data = {
            key: event.key,
            timeStamp: event.timeStamp
        };
        this.recordData.push(data);
    };
    return AudioChannelRecorder;
}());
var uiManager = new UIManager();
var sb = new Soundboard(uiManager);
var acr = new AudioChannelRecorder(sb);
acr.startRecording();
setTimeout(function () {
    acr.stopRecording();
    acr.play();
    acr.clear();
}, 5000);
document.addEventListener('keypress', function (event) {
    sb.playSound(event.key);
});
