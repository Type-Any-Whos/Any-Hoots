import { ReactNode } from "react";


type ErrOrValsObj = {
    [key: string]: string | number;
}

type FormConsumerChildSetValueFn = {
    (name: string, value: string): void;
}

type FormConsumerChildProps = {
    errors: ErrOrValsObj;
    values: ErrOrValsObj;
    setValue: FormConsumerChildSetValueFn;
}


export interface IFormProps {
    validator?: () => {};
    onSubmit({ errors: { }, values: { } }): void;
    defaultValues?: {};
    children?: ReactNode;
}

export interface IFormConsumerChildren {
    children(arg0: FormConsumerChildProps): ReactNode;
}
