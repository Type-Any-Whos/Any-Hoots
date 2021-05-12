import Grid from "@material-ui/core/Grid";

import image from '../../../../undraw_site_content_ihgn-removebg-preview.png';

export default function RightBar() {
  return (
    <Grid item xs={4}>
      <img src={image} style={{position: 'fixed'}} />
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={12} /> {/* Leave half the page */}
      </Grid>
    </Grid>
  );
}
