import { Dispatch } from "react";
import { login, register } from "../auth/authApi";


export async function handleLogin(
    handle: string,
    password: string,
    callback: Dispatch<Action>
) {
    try {
        const user = await login(handle, password);
        callback({
            type: "setUser",
            payload: user,
        });
    } catch (e) {
        console.log(e);
        alert("Failed to login.");
    }
}

export async function handleRegistration(
    handle: string,
    password: string,
    callback: Dispatch<Action>
) {
    try {
        const user = await register(handle, password);
        callback({
            type: "setUser",
            payload: user,
        });
    } catch (e) {
        console.log(e);
        alert("Failed to login.");
    }
}

export function handleAuthSubmit({ errors, values }: any, dispatch: Dispatch<Action>) {
    console.log("handleSubmit_Callback-vals", values);

    switch (window.location.pathname) {
        case "/auth/login":
            handleLogin(values.handle, values.password, dispatch);
            break;

        case "/auth/register":
            handleRegistration(values.handle, values.password, dispatch);
            break;
        default:
            break;
    }

}
