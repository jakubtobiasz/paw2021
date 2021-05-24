import {INote} from "./note.interface";
import {INoteStorage} from "./storage.interface";

export class NotesStorage implements INoteStorage {
    private static instance: NotesStorage;
    private readonly storageKey = 'NOTES';

    static getInstance(): NotesStorage {
        if (this.instance == null) {
            this.instance = new NotesStorage();
        }

        return this.instance;
    }

    get(id: string): INote {
        return this.getAll().filter(note => note.id === id)[0] ?? null;
    }

    getAll(): INote[] {
        return JSON.parse(localStorage.getItem(this.storageKey) ?? "[]");
    }

    remove(note: INote): void {
        const filteredNotes = this.getAll().filter(row => row.id !== note.id)

        this.persistAll(filteredNotes);
    }

    store(note: INote): void {
        const currentNotes = this.getAll();
        currentNotes.push(note);
        this.persistAll(currentNotes);
    }

    update(note: INote): void {
        const notes = this.getAll();
        const mappedNotes = notes.map(row => {
            if (row.id !== note.id) return row;

            return {...note};
        });

        this.persistAll(mappedNotes);
    }

    persistAll(notes: INote[]): void {
        const notesAsString = JSON.stringify(notes);

        localStorage.setItem(this.storageKey, notesAsString);
    }

    wipe(): void {
        localStorage.setItem(this.storageKey, "[]");
    }

}
