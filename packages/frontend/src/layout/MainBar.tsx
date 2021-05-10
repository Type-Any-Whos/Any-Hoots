import { FunctionComponent } from "react";
import Grid from "@material-ui/core/Grid";

const LeftBar: FunctionComponent = ({ children }) => {
  return (
    <Grid item xs={4}>
      {children}
    </Grid>
  );
}

export default LeftBar;
