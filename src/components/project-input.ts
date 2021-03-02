import { Component } from "./base-component";
import { Validatable, validate, validatorExplanations } from '../validators/project.validator';
import { Autobind } from '../decorators/autobind.decorator';
import { projectState } from '../state/project.state';

type formFields = [string, string, number];

/* Project Input */
export class ProjectInput extends Component<HTMLFormElement, HTMLDivElement> {
    private titleElement: HTMLInputElement;
    private descriptionElement: HTMLTextAreaElement;
    private peopleElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input')
    
        this.titleElement = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionElement = this.element.querySelector('#description')! as HTMLTextAreaElement;
        this.peopleElement = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();
    }

    public configure(): void {
        this.element.addEventListener('submit', this.submitHandler);
    }

    public renderContent(): void {}

    private gatherUserInput(): formFields | void {
        const titleValidator: Validatable = {
            value: this.titleElement.value,
            required: true,
            minLength: 2,
            maxLength: 80
        };

        const descriptionValidator: Validatable = {
            value: this.descriptionElement.value,
            required: true,
            minLength: 2,
            maxLength: 300
        };

        const peopleValidator: Validatable = {
            value: this.peopleElement.value,
            required: true,
            min: 1,
            max: 7
        };

        if (
            validate(titleValidator) &&
            validate(descriptionValidator) &&
            validate(peopleValidator)
        ) {
            return [
                this.titleElement.value,
                this.descriptionElement.value,
                +this.peopleElement.value
            ];
        }

        if (document.querySelector('.project-warning')) {
            document.querySelector('.project-warning')!.remove()
        }

        const warningBlock = document.createElement('div');
        warningBlock.classList.add('project-warning');

        this.element.insertAdjacentElement('beforeend', warningBlock);

        Object.entries({
            title: validate(titleValidator),
            description: validate(descriptionValidator),
            people: validate(peopleValidator)
        })
        .forEach((warning: [string, boolean]) => {
            if (!warning[1]) {
                if (warning[0] in validatorExplanations) {
                    warningBlock.innerHTML += `${validatorExplanations[warning[0]]}</br>`;
                }
            }
        })
    }

    private clearForm(): void {
        this.titleElement.value = '';
        this.descriptionElement.value = '';
        this.peopleElement.value = '';
    }

    @Autobind
    private submitHandler(event: Event): void {
        event.preventDefault();
        if (Array.isArray(this.gatherUserInput())) {
            const [title, description, people ] = this.gatherUserInput() as formFields;
            projectState.addProject(title, description, people);
            this.clearForm();
        }
    }
}
