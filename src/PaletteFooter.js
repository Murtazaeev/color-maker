import { withStyles } from '@mui/styles';
import React from 'react';

const styles = {
	paletteFooter: {
		backgroundColor: 'white',
		height: '5vh',
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		fontWeight: 'bold'
	},
	emoji: {
		fontSize: '1.5rem',
		margin: '0 1rem'
	}
};

function PaletteFooter(props) {
	const { paletteName, emoji } = props;
	const { classes } = props;
	return (
		<footer className={classes.paletteFooter}>
			{paletteName}
			<span className={classes.emoji}>{emoji}</span>
		</footer>
	);
}
export default withStyles(styles)(PaletteFooter);
