import {NotesService} from "./notes.service";

export class App {
    constructor() {
        const ns = new NotesService();
        ns.renderNotes();
    }
}
