interface AudioRecordData {
    key: string;
    timeStamp: number;
}

class Soundboard {
    private sounds: HTMLAudioElement[];

    constructor() {
        this.sounds = [];
        this.init();
    }

    private init() {
        const audioElement = document.querySelector<HTMLAudioElement>('#boom-sound');

        if (audioElement) {
            this.sounds.push(audioElement);
        }
    }

    public playSound(soundName: string) {
        console.log(soundName);
        this.sounds[0].currentTime = 0;
        this.sounds[0].play();
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
        console.log('Recording started');

        if (this.isRecording) return;

        this.isRecording = true;
        document.addEventListener('keypress', this.onKeyPressed.bind(this), true);
    }

    public stopRecording() {
        console.log('Recording stopped.')

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

const sb = new Soundboard();
const acr = new AudioChannelRecorder(sb);
acr.startRecording();
setTimeout(() => {
    acr.stopRecording();
    acr.play();
    acr.clear();
}, 5000);
