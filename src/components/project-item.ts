import { Component } from './base-component';
import { Project } from '../models/project.model';
import { Draggable } from '../models/drag-drop.interface';
import { Autobind } from '../decorators/autobind.decorator';


/* Project Item */
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable {

    private project: Project;

    get persons(): string {
        return this.project.people === 1 ? '1 person': `${this.project.people} persons`;
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);

        this.project = project;

        this.configure();
        this.renderContent();
    }

    @Autobind
    public dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    @Autobind
    public dragEndHandler(event: DragEvent): void {
        console.log(event);
    }

    public configure(): void {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    public renderContent(): void {
        this.element.querySelector('h2')!.innerHTML = `<b>${this.project.title}</b>`;
        this.element.querySelector('h3')!.textContent = `${this.persons} assigned`;
        this.element.querySelector('p')!.innerHTML = `<i>${this.project.description}</i>`;
    }
}
