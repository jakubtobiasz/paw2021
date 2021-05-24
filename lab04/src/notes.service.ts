import {NotesStorage} from "./notes.storage";
import {INote} from "./note.interface";

export class NotesService {
    private readonly storageManager: NotesStorage;

    constructor() {
        this.storageManager = NotesStorage.getInstance();
    }

    handleNoteAdd(): void {
        const noteTitleEl: HTMLInputElement = document.querySelector('#note-title');
        const noteBodyEl: HTMLInputElement = document.querySelector('#note-body');
        const noteColorEl: HTMLInputElement = document.querySelector('#note-color');
        const formErrorEl: HTMLInputElement = document.querySelector('#form-error');

        if (noteTitleEl.value.length < 3 || noteBodyEl.value.length < 3) {
            formErrorEl.innerHTML = 'Tytuł oraz tekst muszą mieć minimum 3 znaki!!!';
            return;
        }

        const note: INote = {
            id: NotesService.getUuid(),
            pinned: false,
            body: noteBodyEl.value,
            title: noteTitleEl.value,
            color: noteColorEl.value,
            createdAt: new Date()
        };

        this.storageManager.store(note);
        this.renderNotes();

        noteTitleEl.value = '';
        noteBodyEl.value = '';
        noteColorEl.value = 'yellow';
        formErrorEl.innerHTML = '';
    }

    renderNotes(): void {
        const notes = this.storageManager.getAll();
        const notesContainer = document.querySelector('#notes-container');

        let notesHtml = '';

        notes.forEach((note) => notesHtml += NotesService.getNoteHtml(note));

        notesContainer.innerHTML = notesHtml;
    }

    private static getNoteHtml(note: INote) {
        return `
            <div class="note note--${note.color}" data-note="${note.id}">
                <button class="note__pin-button">
                    ${note.pinned ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>'}
                </button>
                <div class="note__title">${note.title}</div>
                <div class="note__body">${note.body}</div>
                <div class="note__footer">${note.createdAt}</div>
            </div>
        `;
    }

    private static getUuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
