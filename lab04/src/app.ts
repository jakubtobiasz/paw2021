import {NotesService} from "./notes.service";

export class App {
    constructor() {
        const ns = new NotesService();
        ns.renderNotes();

        document.querySelector('#add-note').addEventListener('click', () => ns.handleNoteAdd());
        document.addEventListener('click', (ev) => {
            const tg: HTMLElement = ev.target as HTMLElement;
            const tgParent: HTMLElement = tg?.parentElement;

            if (tg?.classList.contains('note__edit--action')) {
                switch (tg.dataset.action) {
                    case 'save':
                        ns.saveChanges(tg.dataset.noteid);
                        break;
                    case 'cancel':
                        ns.toggleEditMode(tg.dataset.noteid);
                        break;
                    default:
                        console.log('nothing');
                        break;
                }
            }

            if (tg?.classList.contains('note__action-button') || tgParent?.classList.contains('note__action-button')) {
                const destinationTarget: HTMLElement = tg.closest('.note__action-button');

                switch (destinationTarget.dataset.action) {
                    case 'pin':
                        ns.togglePin(destinationTarget.parentElement.dataset.noteid);
                        break;
                    case 'edit':
                        ns.toggleEditMode(destinationTarget.parentElement.dataset.noteid);
                        break;
                    case 'delete':
                        ns.deleteNote(destinationTarget.parentElement.dataset.noteid);
                        break;
                    default:
                        console.log('nothing');
                        break;
                }
            }

        });
    }
}
