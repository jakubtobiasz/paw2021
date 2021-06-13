import {INoteStorage} from "./storage.interface";
import {config} from "./config";
import {FirebaseStorage} from "./firebase.storage";
import {NotesStorage} from "./notes.storage";

export class Storage {
    static getProvider(): INoteStorage {
        switch (config.databaseProvider) {
            case 1:
                return FirebaseStorage.getInstance();
            case 0:
                return NotesStorage.getInstance();
            default:
                return NotesStorage.getInstance();
        }
    }
}