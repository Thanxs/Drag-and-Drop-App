import { Project, ProjectStatus } from '../models/project.model';

export type Listener<T> = (items: Array<T>) => void;
    
export class State<T> {
    protected listeners: Array<Listener<T>> = [];

    public addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

/* Project State Management*/

export class ProjectState extends State<Project> {
    private projects: Array<Project> = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    public static getInstance() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new ProjectState();
        return this.instance;
    }

    public addProject(
        title: string,
        description: string,
        numOfPeople: number
    ): void {
        this.projects.push(
            new Project(
                Math.random().toString(),
                title,
                description,
                numOfPeople,
                ProjectStatus.Active
            )
        );

        this.updateListeners();
    }

    public moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find((item: Project) => item.id === projectId);
        
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn([...this.projects]);
        }
    }
}

export const projectState = ProjectState.getInstance();
