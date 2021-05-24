import {NotesService} from "./notes.service";

export class App {
    constructor() {
        const ns = new NotesService();
        ns.renderNotes();

        document.querySelector('#add-note').addEventListener('click', () => ns.handleNoteAdd());
        document.addEventListener('click', (ev) => {
            if (!ev.target || !(ev.target as HTMLElement).parentElement.classList.contains('note__pin-button')) return;

            const parent = (ev.target as HTMLElement).parentElement.parentElement;
            if (parent) {
                const noteId: string = parent.dataset.noteid;
                ns.togglePin(noteId);
            }
        });
    }
}
