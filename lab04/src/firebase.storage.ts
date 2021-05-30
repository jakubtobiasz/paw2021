import {INoteStorage} from "./storage.interface";
import {INote} from "./note.interface";
import firebase from 'firebase';
import {firebaseConfig} from "./firestore.config";
import Firestore = firebase.firestore.Firestore;

export class FirebaseStorage implements INoteStorage {
    private static instance: FirebaseStorage;
    private static COLLECTION = 'notes';
    private readonly db: Firestore;

    static getInstance(): FirebaseStorage {
        if (this.instance == null) {
            this.instance = new FirebaseStorage();
        }

        return this.instance;
    }

    constructor() {
        const firebaseApp = firebase.initializeApp(firebaseConfig);
        this.db = firebaseApp.firestore();
    }

    get(id: string): Promise<INote> {
        return this.db.collection(FirebaseStorage.COLLECTION).doc(id).get()
            .then((doc) => {
                return doc.data() as INote;
            });
    }

    async getAll(): Promise<INote[]> {
        return await this.db.collection(FirebaseStorage.COLLECTION).orderBy('pinned', 'desc').get()
            .then<INote[]>((snapshot) => {
                const notes: INote[] = [];

                snapshot.forEach((doc) => {
                    notes.push(doc.data() as INote);
                })

                return notes;
            });
    }

    persistAll(notes: INote[]): void {
    }

    async remove(noteId: string) {
        await this.db.collection(FirebaseStorage.COLLECTION).doc(noteId).delete();
    }

    async store(note: INote) {
        await this.db.collection(FirebaseStorage.COLLECTION).doc(note.id).set(note);
    }

    async update(note: INote) {
        await this.db.collection(FirebaseStorage.COLLECTION).doc(note.id).update(note);
    }

    wipe(): void {
    }

}
