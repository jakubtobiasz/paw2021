import {NotesStorage} from "../../src/notes.storage";

describe('Is NotesStorage singleton working', () => {
    it('objects are the same', () => {
        const storage = NotesStorage.getInstance();
        const storage2 = NotesStorage.getInstance();

        expect(storage).toEqual(storage2);
    });
});
