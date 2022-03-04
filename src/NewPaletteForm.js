import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';
import DraggableColorList from './DraggableColorList';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { arrayMove } from 'react-sortable-hoc';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
	flexGrow: 1,
	height: 'calc(100vh - 64px)',
	padding: theme.spacing(3),
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	marginLeft: `-${drawerWidth}px`,
	...(open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	})
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
	transition: theme.transitions.create([ 'margin', 'width' ], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	flexDirection: 'row',
	height: '64px',
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	})
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end'
}));

export default class NewPaletteForm extends React.Component {
	static defaultProps = {
		maxColors: 20
	};

	constructor(props) {
		super(props);
		this.state = {
			isDrawerOpen: false,
			currentColor: 'teal',
			newColorName: '',
			colors: this.props.palettes[0].colors,
			newPaletteName: ''
		};
		this.updateCurrColor = this.updateCurrColor.bind(this);
		this.addNewColor = this.addNewColor.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.removeColor = this.removeColor.bind(this);
		this.clearColor = this.clearColor.bind(this);
		this.addRandomColor = this.addRandomColor.bind(this);
	}
	componentDidMount() {
		ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
			this.state.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
		);
		ValidatorForm.addValidationRule('isColorUnique', (value) =>
			this.state.colors.every(({ color }) => color !== this.state.currentColor)
		);
		ValidatorForm.addValidationRule('isPlaetteNameUnique', (value) =>
			this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
		);
	}
	handleDrawerOpen = () => {
		this.setState({ isDrawerOpen: true });
	};

	handleDrawerClose = () => {
		this.setState({ isDrawerOpen: false });
	};
	updateCurrColor(newColor) {
		this.setState({ currentColor: newColor.hex });
	}
	addNewColor() {
		const newColor = { color: this.state.currentColor, name: this.state.newColorName };
		this.setState({ colors: [ ...this.state.colors, newColor ], newColorName: '' });
	}
	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}
	handleSubmit() {
		let newName = this.state.newPaletteName;
		const newPalette = {
			paletteName: newName,
			id: newName.toLowerCase().replace(/ /g, '-'),
			colors: this.state.colors
		};
		this.props.savePalette(newPalette);
		this.props.history.push('/');
	}
	removeColor(colorName) {
		this.setState({ colors: this.state.colors.filter((color) => color.name !== colorName) });
	}
	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ colors }) => ({
			colors: arrayMove(colors, oldIndex, newIndex)
		}));
	};
	clearColor() {
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
		const { maxColors, classes } = this.props;
		const { colors } = this.state;
		const isPaletteFull = colors.length >= maxColors;
		return (
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar position="fixed" color="default" open={this.state.isDrawerOpen}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={this.handleDrawerOpen}
							edge="start"
							sx={{ mr: 2, ...(this.state.isDrawerOpen && { display: 'none' }) }}
						>
							<MenuIcon />
						</IconButton>

						<Typography variant="h6" noWrap component="div">
							Create a Palette
						</Typography>
					</Toolbar>
					<div>
						<ValidatorForm onSubmit={this.handleSubmit}>
							<TextValidator
								label="Palette Name"
								value={this.state.newPaletteName}
								name="newPaletteName"
								onChange={this.handleChange}
								validators={[ 'required', 'isPlaetteNameUnique' ]}
								errorMessages={[ 'This field is required', 'This Palette name has already been taken' ]}
							/>
							<Button variant="contained" type="submit" color="primary">
								Save Palette
							</Button>
						</ValidatorForm>
						<Link to="/">
							<Button variant="contained" color="primary">
								Go Back
							</Button>
						</Link>
					</div>
				</AppBar>
				<Drawer
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							width: drawerWidth,
							boxSizing: 'border-box'
						},
						justifyContent: 'space-between',
						display: 'flex',
						alignItems: 'center'
					}}
					variant="persistent"
					anchor="left"
					open={this.state.isDrawerOpen}
				>
					<DrawerHeader>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</DrawerHeader>
					<Divider />

					<div
						style={{
							width: '90%',
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Typography variant="h4" gutterBottom>
							Design Your Palette
						</Typography>
						<div style={{}}>
							<Button variant="contained" color="secondary" onClick={this.clearColor}>
								Clear Palette
							</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={this.addRandomColor}
								disabled={isPaletteFull}
							>
								{isPaletteFull ? 'Palette Full' : 'Random Palette'}
							</Button>
						</div>
						<ChromePicker color={this.state.currentColor} onChange={this.updateCurrColor} />
						<ValidatorForm onSubmit={this.addNewColor}>
							<TextValidator
								value={this.state.newColorName}
								name="newColorName"
								variant="filled"
								placeholder="Color Name"
								onChange={this.handleChange}
								validators={[ 'required', 'isColorNameUnique', 'isColorUnique' ]}
								errorMessages={[
									'this field is required',
									'color name must be unique',
									'color has already been used'
								]}
								style={{
									width: '100%',
									padding: '1rem',
									marginTop: '0rem',
									fontSize: '1rem'
								}}
							/>
							<Button
								variant="contained"
								type="submit"
								color="primary"
								style={{ backgroundColor: isPaletteFull ? 'grey' : this.state.currentColor }}
								disabled={isPaletteFull}
								style={{
									width: '100%',
									padding: '1rem',
									marginTop: '0rem',
									fontSize: '1rem'
								}}
							>
								{isPaletteFull ? 'Palette Full' : 'Add Palette'}
							</Button>
						</ValidatorForm>
					</div>
				</Drawer>

				<Main open={this.state.isDrawerOpen}>
					<DrawerHeader />
					<DraggableColorList
						colors={this.state.colors}
						removeColor={this.removeColor}
						axis="xy"
						onSortEnd={this.onSortEnd}
					/>
				</Main>
			</Box>
		);
	}
}
