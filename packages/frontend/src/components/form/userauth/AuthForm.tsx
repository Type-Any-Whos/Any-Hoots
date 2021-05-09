import React, { useContext, useState, FunctionComponent } from "react";
import { Redirect } from "react-router-dom";

import { StateContext, ContextType } from "../../../StateProvider";
import Form from "../context/FormContext";
import LoginFormPart from "./login-form";
import RegistrationFormPart from "./registration-form";
import { login, register } from "../../../auth/authApi";

type IFormObj = {
    values: {
        handle: string;
        password: string;
    };
    errors: {};
}

const AuthForm: FunctionComponent = () => {
    const { state, dispatch } = useContext<ContextType>(StateContext);

    const [credentialError, setCredentialError] = useState({
        user: null,
        password: null,
    });

    async function handleLogin(handle: string, password: string) {
        try {
            const user = await login(handle, password);
            dispatch({
                type: "setUser",
                payload: user,
            });
        } catch (e) {
            console.log(e);
            alert("Failed to login.");
        }
    }

    async function handleRegistration(handle: string, password: string) {
        try {
            const user = await register(handle, password);
            dispatch({
                type: "setUser",
                payload: user,
            });
        } catch (e) {
            console.log(e);
            alert("Failed to login.");
        }
    }


    function handleSubmit({errors, values}: IFormObj) {
        console.log("handleSubmit_Callback-vals", values);

        switch (window.location.pathname) {
            case "/auth/login":
                handleLogin(values.handle, values.password);
                break;

            case "/auth/register":
                handleRegistration(values.handle, values.password);
                break;
            default:
                break;
        }

    }

    if (state.user) {
        return <Redirect to="/" />;
    }

    return (
        <Form onSubmit={handleSubmit}>
            { window.location.pathname === "/auth/login" && <LoginFormPart customValue="Login"/>}
            { window.location.pathname === "/auth/register" && <RegistrationFormPart customValue="Register" />}
        </Form>
    );
}

export default AuthForm;
