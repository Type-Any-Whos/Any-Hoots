import React, { FunctionComponent, createContext, useContext, useState, FormEvent, ReactNode, ReactElement } from "react";
import { StateContext, ContextType } from "../../../StateProvider";

const ValuesContext = createContext({});
const ErrorsContext = createContext({});
const SetValueContext = createContext((name: string, value: string) => {});
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
    onSubmit({errors: {}, values: {}}): void;
    defaultValues?: {};
    children?: ReactNode;
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

interface IErrors {
    [key: string]: string | number;
    [index: number]: string; // Can be a subset of string indexer
}

type IValues = {
    [key: string]: string | number;
    [index: number]: string; // Can be a subset of string indexer
}

type FormConsumerChildren = {
    //! TODO - Refactor type declaration for maintainability
    children(
        { errors: {}, values: {}, setValue: {} }: {errors: IErrors, values: IValues, setValue: (name: string, value: string) => void}
    ): ReactElement; // or ReactElement?
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
