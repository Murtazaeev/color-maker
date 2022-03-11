import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class PaletteMetaForm extends Component {
	state = {
		open: false
	};
	constructor(props) {
		super(props);
		this.state = {
			open: true,
			newPaletteName: ''
		};
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		ValidatorForm.addValidationRule('isPlaetteNameUnique', (value) =>
			this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
		);
	}
	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { newPaletteName } = this.state;
		return (
			<Dialog open={this.state.open} aria-labelly="form-dialog-title" onClose={this.handleClose}>
				<DialogTitle>Choose a Palette Name</DialogTitle>
				<ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
					<DialogContent>
						<DialogContentText>
							Please Enter a name for your Palette. Make sure it is unique
						</DialogContentText>

						<TextValidator
							label="Palette Name"
							value={newPaletteName}
							name="newPaletteName"
							onChange={this.handleChange}
							fullWidth
							margin="normal"
							validators={[ 'required', 'isPlaetteNameUnique' ]}
							errorMessages={[ 'This field is required', 'This Palette name has already been taken' ]}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.props.hideForm} color="primary">
							Cancel
						</Button>
						<Button variant="contained" type="submit" color="primary">
							Save Palette
						</Button>
					</DialogActions>
				</ValidatorForm>
			</Dialog>
		);
	}
}
export default PaletteMetaForm;
