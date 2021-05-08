import Grid from "@material-ui/core/Grid";
import React, { FunctionComponent } from "react";

const LeftBar: FunctionComponent = ({ children }) => {
  return (
    <Grid item xs={4}>
      {children}
    </Grid>
  );
}

export default LeftBar;
