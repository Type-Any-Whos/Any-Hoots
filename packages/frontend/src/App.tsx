import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppBar, Grid, Typography } from "@material-ui/core";

import MainBar from "./layout/MainBar";
import LeftBar from "./layout/LeftBar";
import RightBar from "./layout/RightBar";

import AuthPage from "./auth/AuthPage";
import LogoutPage from "./auth/LogoutPage";
import FeedPage from "./feed/FeedPage";
import NotFoundPage from "./layout/NotFoundPage";

import StateProvider from "./StateProvider";

export default function App() {
  return (
    <StateProvider>
      <AppBar position="static" style={{ marginBottom: 24 }}>
        <Typography variant="h6" style={{ padding: 12 }}>
          Twitterbean
        </Typography>
      </AppBar>
      <Router>
        <Switch>
            {["/auth/login", "/auth/register"].map(path => (
                <Route
                    key={path}
                    exact path={path}
                    component={AuthPage}
                />
            ))}
          <Route>
            <Grid container>
              <LeftBar />
              <MainBar>
                <Switch>
                  <Route path="/" exact>
                    <FeedPage />
                  </Route>
                  <Route path="/auth/logout">
                    <LogoutPage />
                  </Route>
                  <Route component={NotFoundPage} />
                </Switch>
              </MainBar>
              <RightBar />
            </Grid>
          </Route>
        </Switch>
      </Router>
    </StateProvider>
  );
}
