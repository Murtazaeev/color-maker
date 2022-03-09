import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';

const drawerWidth = 400;

const styles = (theme) => ({
	root: {
		display: 'flex'
	},

	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth,
		display: 'flex',
		alignItems: 'center'
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end'
	},
	content: {
		flexGrow: 1,
		height: 'calc(100vh - 64px)',
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	},
	container: {
		width: '90%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttons: {
		width: '100%'
	},
	button: {
		width: '50%'
	}
});

class NewPaletteForm extends React.Component {
	// static defaultProps = {
	// 	maxColors: 20
	// };

	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		isDrawerOpen: false,
	// 		currentColor: 'teal',
	// 		newColorName: '',
	// 		colors: this.props.palettes[0].colors,
	// 		newPaletteName: ''
	// 	};
	// 	this.updateCurrColor = this.updateCurrColor.bind(this);
	// 	this.addNewColor = this.addNewColor.bind(this);
	// 	this.handleChange = this.handleChange.bind(this);
	// 	this.handleSubmit = this.handleSubmit.bind(this);
	// 	this.removeColor = this.removeColor.bind(this);
	// 	this.clearColor = this.clearColor.bind(this);
	// 	this.addRandomColor = this.addRandomColor.bind(this);
	// }
	// componentDidMount() {
	// 	ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
	// 		this.state.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
	// 	);
	// 	ValidatorForm.addValidationRule('isColorUnique', (value) =>
	// 		this.state.colors.every(({ color }) => color !== this.state.currentColor)
	// 	);
	// }
	// handleDrawerOpen = () => {
	// 	this.setState({ isDrawerOpen: true });
	// };

	// handleDrawerClose = () => {
	// 	this.setState({ isDrawerOpen: false });
	// };
	// updateCurrColor(newColor) {
	// 	this.setState({ currentColor: newColor.hex });
	// }
	// addNewColor() {
	// 	const newColor = { color: this.state.currentColor, name: this.state.newColorName };
	// 	this.setState({ colors: [ ...this.state.colors, newColor ], newColorName: '' });
	// }
	// handleChange(evt) {
	// 	this.setState({
	// 		[evt.target.name]: evt.target.value
	// 	});
	// }
	// handleSubmit() {
	// 	let newName = this.state.newPaletteName;
	// 	const newPalette = {
	// 		paletteName: newName,
	// 		id: newName.toLowerCase().replace(/ /g, '-'),
	// 		colors: this.state.colors
	// 	};
	// 	this.props.savePalette(newPalette);
	// 	this.props.history.push('/');
	// }
	// removeColor(colorName) {
	// 	this.setState({ colors: this.state.colors.filter((color) => color.name !== colorName) });
	// }
	// onSortEnd = ({ oldIndex, newIndex }) => {
	// 	this.setState(({ colors }) => ({
	// 		colors: arrayMove(colors, oldIndex, newIndex)
	// 	}));
	// };
	// clearColor() {
	// 	this.setState({ colors: [] });
	// }
	// addRandomColor() {
	// 	//pick random color from existing palettes
	// 	const allColors = this.props.palettes.map((p) => p.colors).flat();
	// 	var rand = Math.floor(Math.random() * allColors.length);
	// 	const randomColor = allColors[rand];
	// 	this.setState({ colors: [ ...this.state.colors, randomColor ] });
	// }

	static defaultProps = {
		maxColors: 20
	};

	constructor(props) {
		super(props);
		this.state = {
			open: true,
			colors: this.props.palettes[0].colors
		};
		this.addNewColor = this.addNewColor.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.removeColor = this.removeColor.bind(this);
		this.clearColors = this.clearColors.bind(this);
		this.addRandomColor = this.addRandomColor.bind(this);
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	addNewColor(newColor) {
		this.setState({ colors: [ ...this.state.colors, newColor ], newColorName: '' });
	}
	handleSubmit(newPaletteName) {
		const newPalette = {
			paletteName: newPaletteName,
			id: newPaletteName.toLowerCase().replace(/ /g, '-'),
			colors: this.state.colors
		};
		this.props.savePalette(newPalette);
		this.props.history.push('/');
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}

	removeColor(colorName) {
		this.setState({ colors: this.state.colors.filter((color) => color.name !== colorName) });
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ colors }) => ({
			colors: arrayMove(colors, oldIndex, newIndex)
		}));
	};

	clearColors() {
		this.setState({ colors: [] });
	}

	addRandomColor() {
		//pick random color from existing palettes
		const allColors = this.props.palettes.map((p) => p.colors).flat();
		var rand = Math.floor(Math.random() * allColors.length);
		const randomColor = allColors[rand];
		this.setState({ colors: [ ...this.state.colors, randomColor ] });
	}

	render() {
		const { classes, maxColors, palettes } = this.props;
		const { open, colors } = this.state;
		const paletteIsFull = colors.lenght >= maxColors;
		return (
			<div className={classes.root}>
				<PaletteFormNav
					open={open}
					palettes={palettes}
					handleSubmit={this.handleSubmit}
					handleDrawerOpen={this.handleDrawerOpen}
				/>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<div classes={classes.container}>
						<Typography variant="h4" gutterBottom>
							Design your Palette
						</Typography>
						<div className={classes.buttons}>
							<Button
								variant="contained"
								color="secondary"
								onClick={this.clearColors}
								className={classes.button}
							>
								Clear Palette
							</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={this.addRandomColor}
								disabled={paletteIsFull}
								className={classes.button}
							>
								Random Color
							</Button>
						</div>

						<ColorPickerForm paletteIsFull={paletteIsFull} addNewColor={this.addNewColor} colors={colors} />
					</div>
				</Drawer>
				<main
					className={classNames(classes.content, {
						[classes.contentShift]: open
					})}
				>
					<div className={classes.drawerHeader} />
					<DraggableColorList
						colors={colors}
						removeColor={this.removeColor}
						axis="xy"
						onSortEnd={this.onSortEnd}
					/>
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
