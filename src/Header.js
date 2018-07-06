import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <ul>
          <li><a href="#open-menu" onClick={this.props.toogleSidebar}>&#9776;</a></li>
          <li id="App-title"><h1>Map App</h1></li>
        </ul>
      </header>
    )
  }
}

export default Header
