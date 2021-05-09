import React, { FunctionComponent, createContext, useContext, useState, FormEvent, ReactNode, ReactElement } from "react";
import { StateContext, ContextType } from "../../../StateProvider";

const ValuesContext = createContext({});
const ErrorsContext = createContext({});
const SetValueContext = createContext((name: string, value: {}) => {});
ValuesContext.displayName = "FormValues";
ErrorsContext.displayName = "FormErrors";
SetValueContext.displayName = "FormValueSetter";

const INITIAL_ERRORS_STATE = {};

const defaultFormStateValues = {
    validator: () => INITIAL_ERRORS_STATE,
    onSubmit: (evt: FormEvent) => null,
    defaultValues: {
        handle: "",
        password: "",
    }
};

type FormProps = {
    validator?: () => {};
    onSubmit: ({errors: {}, values: {}}, evt: FormEvent ) => {};
    // onSubmit: ({errors: {}, values: {[key: string]: any}}) => void;
    defaultValues?: {};
}

const Form: FunctionComponent<FormProps> = ({
    validator,      // removing validator prop from 'rest'
    onSubmit,       // removing validator prop from 'rest'
    defaultValues,  // removing validator prop from 'rest'
    children,
    ...rest
}) => {
    const [formValues, setFormValues] = useState(defaultFormStateValues.defaultValues);
    const [formErrors, setFormErrors] = useState(INITIAL_ERRORS_STATE);
    const { state, dispatch } = useContext<ContextType>(StateContext);

    const _setValue = (name: string, value: {}) => {
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const _onSubmit = (evt: FormEvent) => {
        console.log("hi")
        evt.preventDefault();
        const values = formValues;
        const errors = formErrors;
        // TODO - form validation logic
        // const errors = _validate();
        // setFormErrors(errors);
        onSubmit({errors, values}, evt);
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

type FormConsumerChildren = {
    //! TODO - setValue needs to be properly defined
    //! TODO - Add indexing signature to errors and values
    //! TODO - Refactor type declaration for maintainability
    //? Investigate onSubmit type error on AuthForm.tsx, if aforementioned doesn't resolve
    children({errors: {}, values: {}, setValue: any}): ReactElement; // or ReactElement?
};

export const FormConsumer: FunctionComponent<FormConsumerChildren> = ({ children }) => (
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
