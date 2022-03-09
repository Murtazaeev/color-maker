import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class PaletteFormNav extends Component {
	constructor(props) {
		super(props);
		this.state = { newPaletteName: '' };
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
			this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
		);
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

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}
	render() {
		const { classes, open } = this.props;
		const { newPaletteName } = this.state;
		return (
			<div>
				<CssBaseline />
				<AppBar
					position="fixed"
					color="default"
					className={classNames(classes.appBar, {
						[classes.appBarShift]: open
					})}
				>
					<Toolbar disableGutters={!open}>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.props.handleDrawerOpen}
							edge="start"
							className={classNames(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon />
						</IconButton>

						<Typography variant="h6" color="inherit" noWrap>
							Persistent drawer
						</Typography>
						<ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
							<TextValidator
								label="Palette Name"
								value={this.state.newPaletteName}
								name="newPaletteName"
								onChange={this.handleChange}
								validators={[ 'required', 'isPaletteNameUnique' ]}
								errorMessages={[ 'This field is required', 'This Palette name has already been taken' ]}
							/>
							<Button variant="contained" type="submit" color="primary">
								Save Palette
							</Button>
							<Link to="/">
								<Button variant="contained" color="primary">
									Go Back
								</Button>
							</Link>
						</ValidatorForm>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}
export default PaletteFormNav;
