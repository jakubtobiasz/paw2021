import {NotesStorage} from "./notes.storage";
import {INote} from "./note.interface";

export class NotesService {
    private readonly storageManager: NotesStorage;

    constructor() {
        this.storageManager = NotesStorage.getInstance();
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
}
