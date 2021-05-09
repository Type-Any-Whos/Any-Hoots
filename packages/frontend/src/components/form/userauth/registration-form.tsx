import React, { useContext, useState } from 'react';
import { FormControl, Grid, Input, Box, Typography } from "@material-ui/core";
import { StateContext, ContextType } from "../../../StateProvider";

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
                <Input
                  id="handle"
                  name="handle"
                  placeholder="Handle"
                  value={handle}
                  onChange={(evt) => setHandle(evt.target.value)}
                />
            </FormControl>
            <FormControl fullWidth>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                />
            </FormControl>
            <FormControl fullWidth>
                <Input name="submit-btn" type="submit" value={customValue}></Input>
            </FormControl>
        </>
    );
}

export default RegistrationFormPart;
