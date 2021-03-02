export interface Validatable {
    value: string | number;
    required?: true;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

export const validatorExplanations: {
    [key: string]: string
} = {
    title: 'Title should be a string from 2 to 80 chars.',
    description: 'Description should be a string from 2 to 300 chars.',
    people: 'The project can accommodate up to 7 people.'
}

export const validate = (input: Validatable) => {
    let isValid = true;
    
    if (input.required) {
        isValid = isValid && input.value.toString().trim().length !== 0;
    }

    if (input.minLength != null) {
        isValid = isValid && input.value.toString().trim().length > input.minLength;
    }

    if (input.maxLength != null) {
        isValid = isValid && input.value.toString().trim().length < input.maxLength;
    }

    if (input.maxLength != null) {
        isValid = isValid && input.value.toString().trim().length < input.maxLength;
    }

    if (input.min != null && typeof input.value === 'number') {
        isValid = isValid && input.value > input.min;
    }

    if (input.max != null && typeof input.value === 'number') {
        isValid = isValid && input.value < input.max;
    }

    return isValid;
}