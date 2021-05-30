import {NotesStorage} from "./notes.storage";
import {INote} from "./note.interface";
import {Storage} from "./storage";
import {INoteStorage} from "./storage.interface";

export class NotesService {
    private readonly storageManager: INoteStorage;

    constructor() {
        this.storageManager = Storage.getProvider();
    }

    async handleNoteAdd() {
        const noteTitleEl: HTMLInputElement = document.querySelector('#note-title');
        const noteBodyEl: HTMLInputElement = document.querySelector('#note-body');
        const noteColorEl: HTMLInputElement = document.querySelector('#note-color');
        const formErrorEl: HTMLInputElement = document.querySelector('#form-error');

        if (noteTitleEl.value.length < 3 || noteBodyEl.value.length < 3) {
            formErrorEl.innerHTML = 'Tytuł oraz tekst muszą mieć minimum 3 znaki!!!';
            return;
        }

        const currentDate = new Date();
        const note: INote = {
            id: NotesService.getUuid(),
            pinned: false,
            body: noteBodyEl.value,
            title: noteTitleEl.value,
            color: noteColorEl.value,
            createdAt: `${currentDate.toLocaleDateString('pl-PL')} ${currentDate.toLocaleTimeString('pl-PL')}`,
            editMode: false
        };

        await this.storageManager.store(note);
        await this.renderNotes();

        noteTitleEl.value = '';
        noteBodyEl.value = '';
        noteColorEl.value = 'yellow';
        formErrorEl.innerHTML = '';
    }

    async togglePin(noteId: string) {
        const note = await this.storageManager.get(noteId);

        if (!note) return;

        note.pinned = !note.pinned;
        await this.storageManager.update(note);
        await this.renderNotes();
    }

    async toggleEditMode(noteId: string) {
        const note = await this.storageManager.get(noteId);
        note.editMode = !note.editMode;

        await this.storageManager.update(note);
        await this.renderNotes();
    }

    async deleteNote(noteId: string) {
        await this.storageManager.remove(noteId);
        await this.renderNotes();
    }

    async saveChanges(noteId: string) {
        const submitButton = document.querySelector(`.note__edit--action[data-action="save"][data-noteid="${noteId}"]`);
        const titleElement = submitButton.parentElement.querySelector('.note__title--edit') as HTMLInputElement;
        const bodyElement = submitButton.parentElement.querySelector('.note__body--edit') as HTMLTextAreaElement;
        const colorElement = submitButton.parentElement.querySelector('.note__color--edit') as HTMLSelectElement;

        const note = await this.storageManager.get(noteId);
        note.title = titleElement.value;
        note.body = bodyElement.value;
        note.color = colorElement.value;
        note.editMode = false;

        await this.storageManager.update(note);
        await this.renderNotes();
    }

    async renderNotes() {
        const notes = await this.storageManager.getAll();
        const notesContainer = document.querySelector('#notes-container');

        let notesHtml = '';

        notes.forEach((note) => notesHtml += NotesService.getNoteHtml(note));

        notesContainer.innerHTML = notesHtml;
    }

    private static getNoteHtml(note: INote) {
        return `
            <div class="note note--${note.color}" data-noteid="${note.id}">
                <button class="note__action-button" data-action="pin">
                    ${note.pinned ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>'}
                </button>
                <button class="note__action-button" data-action="edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="note__action-button" data-action="delete">
                    <i class="fas fa-times"></i>
                </button>
                <div class="note__title">${note.editMode ? `<input class="border border-gray-400 note__title--edit" type="text" value="${note.title}"/>` : `${note.title}`}</div>
                <div class="note__body">${note.editMode ? `<textarea class="border border-gray-400 note__body--edit">${note.body}</textarea>` : `${note.body}`}</div>
                ${note.editMode ? `
                    <select class="note__color--edit">
                        <option value="yellow" ${note.color === "yellow" ? 'selected' : ''}>Żółty</option>
                        <option value="red" ${note.color === "red" ? 'selected' : ''}>Czerwony</option>
                        <option value="green" ${note.color === "green" ? 'selected' : ''}>Zielony</option>
                        <option value="blue" ${note.color === "blue" ? 'selected' : ''}>Niebieski</option>
                    </select>
                    <button class="note__edit--action" data-action="save" data-noteid="${note.id}">
                        Zapisz
                    </button>
                    <button class="note__edit--action" data-action="cancel" data-noteid="${note.id}">
                        Anuluj
                    </button>
                ` : ''}
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
