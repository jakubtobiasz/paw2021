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
var AudioChannelUI = /** @class */ (function () {
    function AudioChannelUI(id, sb) {
        this.id = id;
        this.acr = new AudioChannelRecorder(sb);
        this.playButton = null;
        this.stopButton = null;
        this.recordButton = null;
        this.deleteButton = null;
        this.init();
    }
    AudioChannelUI.prototype.init = function () {
        var _this = this;
        var _a, _b, _c, _d;
        this.playButton = document.querySelector("[data-acr=\"" + this.id + "\"] > [data-acr-action=\"play\"]");
        this.stopButton = document.querySelector("[data-acr=\"" + this.id + "\"] > [data-acr-action=\"stop\"]");
        this.recordButton = document.querySelector("[data-acr=\"" + this.id + "\"] > [data-acr-action=\"record\"]");
        this.deleteButton = document.querySelector("[data-acr=\"" + this.id + "\"] > [data-acr-action=\"delete\"]");
        console.log(this.playButton);
        (_a = this.playButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return _this.play(); });
        (_b = this.recordButton) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return _this.record(); });
        (_c = this.stopButton) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return _this.stop(); });
        (_d = this.deleteButton) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () { return _this.delete(); });
    };
    AudioChannelUI.prototype.play = function () {
        console.log('playing');
        this.acr.play();
    };
    AudioChannelUI.prototype.record = function () {
        console.log('recording');
        this.acr.startRecording();
    };
    AudioChannelUI.prototype.stop = function () {
        console.log('stopping');
        this.acr.stopRecording();
    };
    AudioChannelUI.prototype.delete = function () {
        console.log('removing');
        this.acr.clear();
    };
    return AudioChannelUI;
}());
var uiManager = new UIManager();
var sb = new Soundboard(uiManager);
new AudioChannelUI(1, sb);
new AudioChannelUI(2, sb);
new AudioChannelUI(3, sb);
new AudioChannelUI(4, sb);
document.addEventListener('keypress', function (event) {
    sb.playSound(event.key);
});
