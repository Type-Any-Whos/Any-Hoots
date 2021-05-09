import { useState, FunctionComponent, createContext, FormEvent } from "react";
import { IFormProps, IFormConsumerChildren } from './context.interface';

const ValuesContext = createContext({});
const ErrorsContext = createContext({});
const SetValueContext = createContext((name: string, value: string) => {});
ValuesContext.displayName = "FormValues";
ErrorsContext.displayName = "FormErrors";
SetValueContext.displayName = "FormValueSetter";

const INITIAL_ERRORS_STATE = {};

const defaultFormStateValues = {
    validator: () => INITIAL_ERRORS_STATE,
    onSubmit: () => null,
    defaultValues: {},
};

const Form: FunctionComponent<IFormProps> = ({
    validator,      // removing validator prop from 'rest'
    onSubmit,       // removing validator prop from 'rest'
    defaultValues,  // removing validator prop from 'rest'
    children,
    ...rest
}) => {
    const [formValues, setFormValues] = useState(defaultFormStateValues.defaultValues);
    const [formErrors, setFormErrors] = useState(INITIAL_ERRORS_STATE);

    const _setValue = (name: string, value: string) => {
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const _onSubmit = (evt: FormEvent) => {
        evt.preventDefault();
        const values = formValues;
        const errors = formErrors;
        // TODO - form validation logic
        // const errors = _validate();
        // setFormErrors(errors);
        onSubmit({errors, values});
    }


    // TODO - form validation logic
    const _validate = () => {
        // const errors = validator();
        // return Object.keys(errors).length ? errors : INITIAL_ERRORS_STATE;
    }

    return (
        <ValuesContext.Provider value={formValues}>
            <ErrorsContext.Provider value={formErrors}>
                <SetValueContext.Provider value={_setValue}>
                    <form onSubmit={_onSubmit} {...rest}>
                        {children}
                    </form>
                </SetValueContext.Provider>
            </ErrorsContext.Provider>
        </ValuesContext.Provider>
    );
}

Form.displayName = "CustomForm";

export const FormConsumer: FunctionComponent<IFormConsumerChildren> = ({ children }) => (
    <ErrorsContext.Consumer>
        {errors => (
            <ValuesContext.Consumer>
                {values => (
                    <SetValueContext.Consumer>
                        {setValue => children({ errors, values, setValue })}
                    </SetValueContext.Consumer>
                )}
            </ValuesContext.Consumer>
        )}
    </ErrorsContext.Consumer>
);

export default Form;
