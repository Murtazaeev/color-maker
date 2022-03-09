import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
	root: {
		width: '100px',
		height: '100px'
	}
};
function DraggableColorBox(props) {
	return (
		<div className={props.classes.root} style={{ backgroundColor: props.color }}>
			{props.name}
		</div>
	);
}
export default withStyles(styles)(DraggableColorBox);

// import React from 'react';
// import { SortableElement } from 'react-sortable-hoc';
// import { withStyles } from '@material-ui/styles';
// import DeleteIcon from '@material-ui/icons/Delete';

// const styles = {
// 	root: {
// 		width: '20%',
// 		height: '25%',
// 		margin: '0 auto',
// 		marginBottom: '-3.5px',
// 		display: 'inline-block',
// 		position: 'relative',
// 		cursor: 'pointer',
// 		'&:hover svg': {
// 			color: 'white',
// 			transform: 'scale(1.3)'
// 		}
// 	},
// 	boxContent: {
// 		position: 'absolute',
// 		width: '100%',
// 		left: '0px',
// 		bottom: '0px',
// 		padding: '10px',
// 		color: 'black',
// 		letterSpacing: '1px',
// 		textTransform: 'uppercase',
// 		fontSize: '12px',
// 		display: 'flex',
// 		justifyContent: 'space-between'
// 	},
// 	deleteIcon: {
// 		transition: 'all 0.3s ease-out'
// 	}
// };
// const DraggableColorBox = SortableElement((props) => {
// 	const { classes, name, handleClick, color } = props;
// 	return (
// 		<div className={classes.root} style={{ backgroundColor: color }}>
// 			<div className={classes.boxContent}>
// 				<span>{name}</span>
// 				<DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
// 			</div>
// 		</div>
// 	);
// });

// export default withStyles(styles)(DraggableColorBox);
