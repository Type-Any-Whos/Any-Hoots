import React, { useContext, useState } from 'react';
import { FormControl, Grid, Input, Box, Typography } from "@material-ui/core";
import { StateContext, ContextType } from "../../../StateProvider";
import FormInput from "../FormInput";

type FormPartProps = {
    customValue: string;
}

const RegistrationFormPart = ({ customValue }: FormPartProps) => {
    const [handle, setHandle] = useState("");
    const [password, setPassword] = useState("");
    const { state, dispatch } = useContext<ContextType>(StateContext);

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
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
            </FormControl>
            <FormControl fullWidth>
                <FormInput name="submit-btn" type="submit" value={customValue}/>
            </FormControl>
        </>
    );
}

export default RegistrationFormPart;
