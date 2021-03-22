interface AudioRecordData {
    key: string;
    timeStamp: number;
}

class UIManager {
    private readonly buttons: { [id: string]: HTMLElement };

    constructor() {
        this.buttons = {};
        this.init();
    }

    private init() {
        const buttons = document.querySelectorAll<HTMLElement>('.uimanager-button');

        buttons.forEach((button) => {
            let key = button.dataset.key;

            if (key) {
                this.buttons[key] = button;
            }
        });
    }

    public blinkButton(key: string) {
        const button = this.buttons[key];

        if (!button) return;

        button.classList.add('disabled');
        setTimeout(() => {
            button.classList.remove('disabled');
        }, 200);
    }
}

class Soundboard {
    private readonly sounds: { [id: string]: HTMLAudioElement };

    constructor(private uiManager: UIManager) {
        this.sounds = {};
        this.init();
    }

    private init() {
        const audioElements = document.querySelectorAll<HTMLAudioElement>('.soundbar-sound');

        audioElements.forEach((element) => {
            let key = element.dataset.key;

            if (key) {
                this.sounds[key] = element;
            }
        });
    }

    public playSound(soundKey: string) {
        if (this.sounds[soundKey]) {
            this.sounds[soundKey].currentTime = 0;
            this.sounds[soundKey].play();
            this.uiManager.blinkButton(soundKey);
        }
    }
}

class AudioChannelRecorder {
    private isRecording: boolean;
    private recordData: AudioRecordData[];
    private soundboard: Soundboard;

    constructor(soundboard: Soundboard) {
        this.isRecording = false;
        this.recordData = [];
        this.soundboard = soundboard;
    }

    public startRecording() {
        if (this.isRecording) return;

        this.isRecording = true;
        document.addEventListener('keypress', this.onKeyPressed.bind(this), true);
    }

    public stopRecording() {
        if (!this.isRecording) return;

        this.isRecording = false;
        document.removeEventListener('keypress', this.onKeyPressed.bind(this), true);
    }

    public play() {
        this.recordData.forEach(((value, index, array) => {
            const timeToReduce = array[0].timeStamp;
            const timestamp = value.timeStamp - timeToReduce;

            setTimeout(() => {
                this.soundboard.playSound(value.key);
            }, timestamp);
        }))
    }

    public clear() {
        this.recordData = [];
    }

    private onKeyPressed(event: KeyboardEvent)
    {
        const data: AudioRecordData = {
            key: event.key,
            timeStamp: event.timeStamp
        };

        this.recordData.push(data);
    }

}

const uiManager = new UIManager();
const sb = new Soundboard(uiManager);
const acr = new AudioChannelRecorder(sb);
acr.startRecording();
setTimeout(() => {
    acr.stopRecording();
    acr.play();
    acr.clear();
}, 5000);

document.addEventListener('keypress', (event) => {
    sb.playSound(event.key);
})
