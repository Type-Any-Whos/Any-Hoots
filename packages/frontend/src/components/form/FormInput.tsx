import React, { useState, FunctionComponent } from "react";
import { Input } from "@material-ui/core";
import { FormConsumer } from "./context/FormContext";

type FormInputProps = {
    name: string;
    type?: "submit" | "password";
    id?: string;
    placeholder?: string;
    value?: string;
}


const FormInput: FunctionComponent<FormInputProps> = ({id, name, placeholder, type, value}) => (
    <FormConsumer>
        {({values, setValue}) => {
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
        }}
    </FormConsumer>
);

export default FormInput;
