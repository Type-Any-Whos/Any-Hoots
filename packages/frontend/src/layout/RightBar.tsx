import Grid from '@material-ui/core/Grid';

// import image from '../../../../';
import image from '../images/site.svg';
export default function RightBar() {
	return (
		<Grid item xs={4}>
			<img src={image} style={{ position: 'fixed', height: '20em' }} />
			<Grid container>
				<Grid item xs={6}></Grid>
				<Grid item xs={12} /> {/* Leave half the page */}
			</Grid>
		</Grid>
	);
}
