import { useContext, useState, FunctionComponent } from "react";
import { Redirect } from "react-router-dom";

import { StateContext, ContextType } from "../../../StateProvider";
import Form from "../../form";
import LoginFormPart from "./login-form";
import RegistrationFormPart from "./registration-form";

import { handleAuthSubmit } from "../../../utils/formApi";


const AuthForm: FunctionComponent = () => {
    const [credentialError, setCredentialError] = useState({
        user: null,
        password: null,
    });

    return (
        <Form onSubmit={handleAuthSubmit}>
            { window.location.pathname === "/auth/login" && <LoginFormPart customValue="Login"/>}
            { window.location.pathname === "/auth/register" && <RegistrationFormPart customValue="Register" />}
        </Form>
    );
}

export default AuthForm;
