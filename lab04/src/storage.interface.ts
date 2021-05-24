import {INote} from "./note.interface";

export interface INoteStorage {
    getAll(): INote[];
    get(id: string): INote;
    store(note: INote): void;
    persistAll(notes: INote[]): void;
    update(note: INote): void;
    remove(note: INote): void;
    wipe(): void;
}
