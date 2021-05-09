import React from "react";
import { FormControl } from "@material-ui/core";
import FormInput from "../FormInput";

type FormPartProps = {
    customValue: string;
}

const LoginFormPart = ({customValue}: FormPartProps) => {
    return (
        <>
            <FormControl fullWidth>
                <FormInput
                    id="handle"
                    name="handle"
                    placeholder="Handle"
                />
            </FormControl>

            <FormControl fullWidth>
                <FormInput
                    name="password"
                    type="password"
                    id="password"
                    placeholder="Password"
                />
            </FormControl>

            <FormControl fullWidth>
                <FormInput name="submit-btn" type="submit" value={customValue}></FormInput>
            </FormControl>
        </>
    );
}

export default LoginFormPart;
