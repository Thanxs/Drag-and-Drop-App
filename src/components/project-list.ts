import { Component } from './base-component';
import { DragTarget } from '../models/drag-drop.interface';
import { Autobind } from '../decorators/autobind.decorator';
import { ProjectStatus, Project } from '../models/project.model';
import { ProjectItem } from './project-item';
import { projectState } from '../state/project.state';

/* Project List */
export class ProjectList extends Component<HTMLElement, HTMLDivElement>
    implements DragTarget {
    private assignedProjects: Array<Project>;

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`)

        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    @Autobind
    public dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();

            const listElement = this.element.querySelector('ul')!;
            console.log()
            listElement.classList.add('droppable');
        }
    }

    @Autobind
    public dropHandler(event: DragEvent): void {
        const projectId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(
            projectId,
            this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
        )
    }
    
    @Autobind
    public dragLeaveHandler(_: DragEvent): void {
        const listElement = this.element.querySelector('ul')!;
        listElement.classList.remove('droppable');
    }

    public renderContent() {
        this.element.querySelector('ul')!.id =
            `${this.type}-project-list`;

        this.element.querySelector('h2')!.textContent =
            `${this.type} projects`.toUpperCase();
    }

    public configure(): void {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(prj => {
            if (this.type === 'active') {
                return prj.status === ProjectStatus.Active;
            }

                return prj.status === ProjectStatus.Finished;
            });

            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }

    private renderProjects() {
        const listElement = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;

        listElement.innerHTML = '';

        for (const projectItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, projectItem)
        }
    }
}
