import { withStyles } from '@mui/styles';
import React, { Component } from 'react';

const styles = {
	main: {
		backgroundColor: 'purple',
		border: '3px solid teal'
	}
};
function MiniPalette(props) {
	const { classes } = props;
	console.log(classes);
	return (
		<div>
			<h1 className={classes.main}>Hello Im Mini palette</h1>
		</div>
	);
}
export default withStyles(styles)(MiniPalette);
// class MiniPalette extends Component {
// 	render() {
// 		return <div>MiniPalette</div>;
// 	}
// }
// export default MiniPalette;
