import { withStyles } from '@mui/styles';
import styles from './styles/PaletteFooterStyles';
import React from 'react';

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
