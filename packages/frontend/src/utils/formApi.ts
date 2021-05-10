import { useContext } from "react";
import { login, register } from "../auth/authApi";
import { StateContext, ContextType } from "../StateProvider";

const { dispatch } = useContext<ContextType>(StateContext);

export async function handleLogin(handle: string, password: string) {
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

export async function handleRegistration(handle: string, password: string) {
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

export function handleAuthSubmit({ errors, values }: any) {
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
