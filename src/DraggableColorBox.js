import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/DraggableColorBoxStyles';

const DraggableColorBox = SortableElement((props) => {
	const { classes, name, handleClick, color } = props;
	return (
		<div className={classes.root} style={{ backgroundColor: color }}>
			<div className={classes.boxContent}>
				<span>{name}</span>
				<DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
			</div>
		</div>
	);
});

export default withStyles(styles)(DraggableColorBox);

// import React from 'react';
// import { withStyles } from '@material-ui/styles';

// const styles = {
// 	root: {
// 		width: '100px',
// 		height: '100px'
// 	}
// };
// function DraggableColorBox(props) {
// 	return (
// 		<div className={props.classes.root} style={{ backgroundColor: props.color }}>
// 			{props.name}
// 		</div>
// 	);
// }
// export default withStyles(styles)(DraggableColorBox);
