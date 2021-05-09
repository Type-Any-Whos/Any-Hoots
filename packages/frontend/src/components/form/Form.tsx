import React, { useContext, useState, FunctionComponent, FormEvent } from 'react';
import { StateContext, ContextType } from "../../StateProvider";
import { register, login } from "../../auth/authApi";


interface FormProps {
    formType?: "isLogin" | "isRegistration" | undefined;
}

const Form: FunctionComponent<FormProps> = ({ children, formType }) => {
    const { state, dispatch } = useContext<ContextType>(StateContext);

    async function handleSubmit(evt: any) {
        evt.preventDefault();

    //     try {
    //       const user = await register(handle, password);
    //       dispatch({
    //         type: "setUser",
    //         payload: user,
    //       });
    //     } catch (e) {
    //       console.log(e);
    //       alert("Failed to login.");
    //     }
    //   }

    //   if (state.user) {
    //     return <Redirect to="/" />;
    //   }
    }

    return (
        <form
            data-formtype={formType}
            onSubmit={(evt: FormEvent) => handleSubmit(evt)}
        >{ children }</form>
    );
}

export default Form;
