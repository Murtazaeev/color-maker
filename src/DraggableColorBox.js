import React from 'react';
import { withStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';

const styles = {
	root: {
		width: '20%',
		height: '25%',
		margin: '0 auto',
		marginBottom: '-3.5px',
		display: 'inline-block',
		position: 'relative',
		cursor: 'pointer',
		'&:hover svg': {
			color: 'white',
			transform: 'scale(1.3)'
		}
	},
	boxContent: {
		position: 'absolute',
		width: '100%',
		left: '0px',
		bottom: '0px',
		padding: '10px',
		color: 'black',
		letterSpacing: '1px',
		textTransform: 'uppercase',
		fontSize: '12px',
		display: 'flex',
		justifyContent: 'space-between'
	},
	deleteIcon: {
		transition: 'all 0.3s ease-out'
	}
};
function DraggableColorBox(props) {
	const { classes, name } = props;
	return (
		<div className={classes.root} style={{ backgroundColor: props.color }}>
			<div className={classes.boxContent}>
				<span>{name}</span>
				<DeleteIcon className={classes.deleteIcon} />
			</div>
		</div>
	);
}

export default withStyles(styles)(DraggableColorBox);
