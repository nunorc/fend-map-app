
import React, { Component } from 'react'

class Sidebar extends Component {
  render() {
    const { visible, toogleSidebar, markers, setFilter, centerMap } = this.props
    var sidebarClass = visible ? 'App-sidebar open' : 'App-sidebar'

    return (
      <div className={sidebarClass}>
        <div className="App-sidebar-header">
          <h2>Filters</h2>
          <a onClick={toogleSidebar} href="#close-menu">&#10006;</a>
        </div>
        <select className="App-filter" onChange={setFilter}>
          <option value="0">Show all..</option>
          <option value="1">Historic Places</option>
          <option value="2">Museums</option>
          <option value="3">Bars</option>
          <option value="4">Restaurants</option>
        </select>
        <div className="App-divider"></div>
        <ul aria-label="locations-list">
          {markers.map((m) => (
            <li key={m.placeID}>
              <img
                src       = {'imgs/icons/'+m.my_class+'.png'}
                className = "App-sidebar-icon"
                alt       = {m.title}
              />
              <a onClick={(e) => centerMap(e, m)} href="#center-map">{m.title}</a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Sidebar
