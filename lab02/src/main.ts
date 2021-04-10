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

class AudioChannelUI {
    private readonly id: number;
    private playButton: HTMLButtonElement|null;
    private stopButton: HTMLButtonElement|null;
    private recordButton: HTMLButtonElement|null;
    private deleteButton: HTMLButtonElement|null;
    private acr: AudioChannelRecorder;

    constructor(id: number, sb: Soundboard) {
        this.id = id;
        this.acr = new AudioChannelRecorder(sb);
        this.playButton = null;
        this.stopButton = null;
        this.recordButton = null;
        this.deleteButton = null;
       this.init();
    }

    private init() {
        this.playButton = document.querySelector(`[data-acr="${this.id}"] > [data-acr-action="play"]`);
        this.stopButton = document.querySelector(`[data-acr="${this.id}"] > [data-acr-action="stop"]`);
        this.recordButton = document.querySelector(`[data-acr="${this.id}"] > [data-acr-action="record"]`);
        this.deleteButton = document.querySelector(`[data-acr="${this.id}"] > [data-acr-action="delete"]`);

        console.log(this.playButton);

        this.playButton?.addEventListener('click', () => this.play());
        this.recordButton?.addEventListener('click', () => this.record());
        this.stopButton?.addEventListener('click', () => this.stop());
        this.deleteButton?.addEventListener('click', () => this.delete());
    }

    public play() {
        console.log('playing');
        this.acr.play();
    }

    public record() {
        console.log('recording');
        this.acr.startRecording();
    }

    public stop() {
        console.log('stopping');
        this.acr.stopRecording();
    }

    public delete() {
        console.log('removing');
        this.acr.clear();
    }
}

const uiManager = new UIManager();
const sb = new Soundboard(uiManager);
new AudioChannelUI(1, sb);
new AudioChannelUI(2, sb);
new AudioChannelUI(3, sb);
new AudioChannelUI(4, sb);

document.addEventListener('keypress', (event) => {
    sb.playSound(event.key);
})
