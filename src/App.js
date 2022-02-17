import React, { Component } from 'react';
import { generatePalette } from './colorHelpers';
import Palette from './Palette';
import seedColors from './seedColors';


class App extends Component {
  render() {
    console.log(generatePalette(seedColors[4]))
    return (
      <div className="App">
        <Palette {...seedColors[2]} />
      </div>
    );
  }
  
}

export default App;
