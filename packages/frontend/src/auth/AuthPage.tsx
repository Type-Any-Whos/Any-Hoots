import { Grid, Typography, FormControl } from "@material-ui/core";
import { useContext, FormEvent } from "react";
import { StateContext, ContextType } from "../StateProvider";
import { Link, Redirect } from "react-router-dom";
import Form, { FormInput } from "../components/form";
import { handleAuthSubmit } from "../utils/formApi";

import image from '../../../../undraw_Social_networking_re_i1ex-removebg-preview.png';

export default function AuthPage() {
    const AuthFormFooter = window.location.pathname === "/auth/register"
        ? <>Already have an account? <Link to="/auth/login">Sign in</Link>.</>
        : <>Don't have an account? <Link to="/auth/register">Sign Up</Link>.</>;

    const AuthFormSubmitBtnValue = window.location.pathname === "/auth/register"
        ? "Register"
        : "Login";

    const { state, dispatch } = useContext<ContextType>(StateContext);

    if (state.user) {
        return <Redirect to="/" />;
    }

    return (
        <Grid container>
            <Grid item xs={8}>
                <Grid container>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={10}>
                        <Typography variant="h4">Welcome to AnyHoots!</Typography>
                        <img src={image} />
                        <Typography variant="h6">Make new friends!</Typography>
                        <Typography variant="h6">Talk about things!</Typography>
                        <Typography variant="h6">Be part of a community!</Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={4}>
                <Grid container>
                    <Grid item xs={1}>
                        {/* Empty grid for spacing */}
                    </Grid>
                    <Grid item xs={4}>
                        <Form onSubmit={(evt) => handleAuthSubmit(evt, dispatch)}>
                            <FormControl fullWidth>
                                <FormInput
                                    id="handle"
                                    name="handle"
                                    type="text"
                                    placeholder="Handle"
                                />
                            </FormControl>

                            <FormControl fullWidth>
                                <FormInput
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                />
                            </FormControl>

                            <FormControl fullWidth>
                                <FormInput
                                    name="submit-btn"
                                    type="submit"
                                    value={AuthFormSubmitBtnValue}
                                />
                            </FormControl>
                        </Form>
                        {AuthFormFooter}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
