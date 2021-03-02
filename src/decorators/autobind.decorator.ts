/* Autobind deocrator */
export const Autobind = (
    _: any,
    _2: string,
    descriptor: PropertyDescriptor
) => {
    return {
        configurable: true,
        get() {
            return descriptor.value.bind(this);
        }
    } as PropertyDescriptor;
}