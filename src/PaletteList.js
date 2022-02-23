import React, { Component } from 'react';

class PaletteList extends Component {
	render() {
		const { palettes } = this.props;
		return (
			<div>
				<h1>Colors</h1>
				{palettes.map((palette) => <h1>{palette.paletteName}</h1>)}
			</div>
		);
	}
}

export default PaletteList;
