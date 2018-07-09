
import React, { Component } from 'react'

class Map extends Component {
  render() {
    const { map } = this.props

    return (
      <div id='App-map'>
        <div id='App-map-canvas'></div>
        {!map &&
          <p id='App-map-canvas-text'>Mapas não disponíveis, tente mais tarde.</p>
        }
      </div>
    )
  }
}

export default Map
