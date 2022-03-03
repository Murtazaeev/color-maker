import React, { Component } from 'react';
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
import DraggableColorBox from './DraggableColorBox';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';

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
		}),
		marginLeft: 0
	})
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
	transition: theme.transitions.create([ 'margin', 'width' ], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
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
	constructor(props) {
		super(props);
		this.state = {
			isDrawerOpen: false,
			currentColor: 'teal',
			newName: '',
			colors: [ { color: 'blue', name: 'blue' } ]
		};
		this.updateCurrColor = this.updateCurrColor.bind(this);
		this.addNewColor = this.addNewColor.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
			this.state.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
		);
		ValidatorForm.addValidationRule('isColorUnique', (value) =>
			this.state.colors.every(({ color }) => color !== this.state.currentColor)
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
		const newColor = { color: this.state.currentColor, name: this.state.newName };
		this.setState({ colors: [ ...this.state.colors, newColor ], newName: '' });
	}
	handleChange(evt) {
		this.setState({ newName: evt.target.value });
	}

	render() {
		return (
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar position="fixed" open={this.state.isDrawerOpen}>
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
							Persistent drawer
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							width: drawerWidth,
							boxSizing: 'border-box'
						}
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
					<Typography variant="h4">Design Your Palette</Typography>
					<div>
						<Button variant="contained" color="secondary">
							Clear Palette
						</Button>
						<Button variant="contained" color="primary">
							Random Palette
						</Button>
					</div>
					<ChromePicker color={this.state.currentColor} onChange={this.updateCurrColor} />
					<ValidatorForm onSubmit={this.addNewColor}>
						<TextValidator
							value={this.state.newName}
							onChange={this.handleChange}
							validators={[ 'required', 'isColorNameUnique', 'isColorUnique' ]}
							errorMessages={[
								'this field is required',
								'color name must be unique',
								'color has already been used'
							]}
						/>
						<Button
							variant="contained"
							type="submit"
							color="primary"
							style={{ backgroundColor: this.state.currentColor }}
						>
							Add Color
						</Button>
					</ValidatorForm>
				</Drawer>
				<Main open={this.state.isDrawerOpen}>
					<DrawerHeader />
					{this.state.colors.map((color) => <DraggableColorBox color={color.color} name={color.name} />)}
				</Main>
			</Box>
		);
	}
}
