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

    async get(id: string): Promise<INote> {
        const notes = await this.getAll();
        return notes.filter(note => note.id === id)[0] ?? null;
    }

    async getAll(): Promise<INote[]> {
        const parsedNotes = JSON.parse(localStorage.getItem(this.storageKey) ?? "[]") as INote[];
        const sortedNotes = parsedNotes.sort((a: INote, b: INote): number => {
            if (a.pinned) return -1;
            if (b.pinned) return 1;

            return 0;
        });

        return Promise.resolve(sortedNotes);
    }

    async remove(noteId: string): Promise<void> {
        const notes = await this.getAll();
        const filteredNotes = notes.filter(row => row.id !== noteId);

        this.persistAll(filteredNotes);
    }

    async store(note: INote): Promise<void> {
        const currentNotes = await this.getAll();
        currentNotes.push(note);
        this.persistAll(currentNotes);
    }

    async update(note: INote): Promise<void> {
        const notes = await this.getAll();
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
