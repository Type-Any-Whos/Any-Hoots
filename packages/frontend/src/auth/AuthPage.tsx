import { Grid, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { StateContext, ContextType } from "../StateProvider";
import { register, login } from "./authApi";
import { Link, Redirect } from "react-router-dom";
import AuthForm from "../components/form/userauth/AuthForm";

export default function AuthPage() {
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");

  const AuthFormFooter = window.location.pathname === "/auth/register"
    ? <>Already have an account? <Link to="/auth/login">Sign in</Link>.</>
    : <>Don't have an account? <Link to="/auth/register">Sign Up</Link>.</>;

  return (
    <Grid container>
      <Grid item xs={8}>
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={10}>
            <Typography variant="h4">Welcome to Twitterbean!</Typography>
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
            <AuthForm />
            {AuthFormFooter}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
