import { FunctionComponent } from "react";
import { Input } from "@material-ui/core";
import { useFormContext } from "./context/FormContext";

type FormInputProps = {
    name: string;
    type?: string;
    id?: string;
    placeholder?: string;
    value?: string;
}


const FormInput: FunctionComponent<FormInputProps> = ({id, name, placeholder, type, value}) => {
    const {values, errors, setValue} = useFormContext();

    return (
        <Input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={values[name] || value || ""}
            onChange={(evt) => {
                evt.preventDefault();
                setValue(name, evt.target.value);
            }}
        />
    );
};

export default FormInput;
