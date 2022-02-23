import React, { Component } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { generatePalette } from './colorHelpers';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';

class App extends Component {
	findPalette(id) {
		return seedColors.find(function(palette) {
			return palette.id === id;
		});
	}
	render() {
		return (
			<Switch>
				<Route exact path="/" render={() => <PaletteList palettes={seedColors} />} />
				<Route
					exact
					path="/palette/:id"
					render={(routeProps) => (
						<Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
					)}
				/>
				<PaletteList />
			</Switch>

			//       <div className="App">
			//   <Palette palette={generatePalette(seedColors[4])} />
			// </div>
		);
	}
}
export default App;
