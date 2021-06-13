import {INote} from "./note.interface";

export interface INoteStorage {
    getAll(): Promise<INote[]>;
    get(id: string): Promise<INote>;
    store(note: INote): void;
    persistAll(notes: INote[]): void;
    update(note: INote): void;
    remove(noteId: string): void;
    wipe(): void;
}
