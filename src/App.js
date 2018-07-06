
import React, { Component } from 'react'
import './App.css'
import Sidebar from './Sidebar'
import Header from './Header'
import Map from './Map'

class App extends Component {
  state = {
    map: undefined,
    sidebar: false,
    markers: [],
    filter: '0',
    pois: [ // local database of Points of Interest
      {
        placeID: 'ChIJIzwXZuzvJA0ROaxWynCX6fw',
        lat: 41.447894,
        lng: -8.290319,
        wiki: 'Castelo_de_Guimarães',
        wiki_id: '71058',
        title: 'Castelo de Guimarães',
        class: "1"
      },
      {
        placeID: 'ChIJq52uv5jlJA0RbHxYi2q2xlw',
        lat: 41.446482,
        lng: -8.291008,
        wiki: 'Paço_dos_Duques_de_Bragança_(Guimarães)',
        wiki_id: '104093',
        title: 'Paço dos Duques de Bragança',
        class: "1"
      },
      {
        placeID: 'ChIJyc7e9OnvJA0Rbta6gqMxVnI',
        lat: 41.442945,
        lng: -8.292607,
        wiki: 'Igreja_de_Nossa_Senhora_da_Oliveira_(Guimarães)',
        wiki_id: '2064317',
        title: 'Igreja de Nossa Senhora da Oliveira',
        class: '1'
      },
      {
        placeID: 'ChIJifisHervJA0RmvBrAft9ToQ',
        lat: 41.442664,
        lng: -8.292274,
        wiki: 'Museu_de_Alberto_Sampaio',
        wiki_id: '4341555',
        title: 'Museu Alberto Sampaio',
        class: '2'
      },
      {
        placeID: 'ChIJ19TaQejvJA0R4FEqeB4dFAA',
        lat: 41.442751,
        lng: -8.296453,
        wiki: 'Igreja_de_Nossa_Senhora_da_Oliveira_(Guimarães)',
        wiki_id: '2064317',
        title: 'Sociedade Martins Sarmento',
        class: '2'
      },
      {
        placeID: 'ChIJST6AkenvJA0RJ_E70wnNUiU',
        lat: 41.443273,
        lng: -8.293272,
        wiki: '',
        wiki_id: '',
        title: 'El Rock Bar',
        class: '3'
      },
      {
        placeID: 'ChIJYxC_lunvJA0RL2ptJqy2O-Y',
        lat: 41.443321,
        lng: -8.293519,
        wiki: '',
        wiki_id: '',
        title: 'Cara e Coroa',
        class: "3"
      },
      {
        placeID: 'ChIJ0_HddOnvJA0RbLbt1ie-pzI',
        lat: 41.445695,
        lng: -8.292358,
        wiki: '',
        wiki_id: '',
        title: 'Dona Maria',
        class: '4'
      },
      {
        placeID: 'ChIJf0iNjOnvJA0RpidB75NV8eg',
        lat: 41.444428,
        lng: -8.291737,
        wiki: '',
        wiki_id: '',
        title: 'Buxa',
        class: '4'
      },
    ]
  }

  updateMarkers = () => {
    this.state.markers.forEach((m) => {m.setMap(null)})

    let markers = []
    let filtered = this.state.pois.filter((m) => {
      return (
        (this.state.filter === "0" || this.state.filter === m.class) ? true : false
      )
    })

    filtered.forEach((p) => {
      let marker = new window.google.maps.Marker({
       position: {lat: p.lat, lng: p.lng},
       animation: window.google.maps.Animation.DROP,
       icon: 'imgs/icons/'+p.class+'.png',
       map: this.state.map,
       title: p.title,
       placeID: p.placeID,
       my_class: p.class,
       my_wiki: p.wiki,
       wiki_id: p.wiki_id
      })
      marker.addListener('click', () => {
        this.showInfoWindow(marker)
      })

      markers.push(marker)
    })

    this.setState({markers: markers})
  }

  showInfoWindow = (m) => {
    const url = 'https://pt.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1&format=json&pageids=' + m.wiki_id
    const base = 'https://pt.wikipedia.org/wiki/'

    if (m.wiki_id) {
      fetch(url)
        .then((resp) => {
          return resp.json()
        })
        .then((data) => {
          this.myWikiInfo(m, data.query.pages[m.wiki_id].extract.split("\n\n")[0], base + m.my_wiki)
        })
        .catch((err) => {
          console.log('Error fetching: ' + url)
        })
      }
      else {
        this.myWikiInfo(m, 'Não disponível!', '')
      }
  }

  myWikiInfo = (m, cnt, url) => {
    let content = '<div class="App-info-box">'
    if (m.title)
      content += '<span class="App-info-box-title">' + m.title + '</span>'
    if (cnt)
      content += '<p>' + cnt + '</p>'
    if (url) 
      content += '<p><a href="' + url + '">' + url + '</a></p>'
    content += '</div>'

    let iw = new window.google.maps.InfoWindow({
      content: content,
      closeBoxURL: '',
      closeBoxMargin : ''
    })
    iw.open(this.state.map, m)
  }

  toogleSidebar = (e) => {
    this.setState({sidebar: !this.state.sidebar})
    e.preventDefault()
  }

  setFilter = (e) => {
    this.setState({filter: e.target.value},this.updateMarkers)
    e.preventDefault()
  }

  centerMap = (e, p) => {
    this.state.map.setCenter(p)
    e.preventDefault()
  }

  componentDidMount() {
    this.setState({
      map: new window.google.maps.Map(document.getElementById('App-map-canvas'), {
        center: { lat: 41.44344, lng: -8.293243 },
        mapTypeId: 'hybrid',
        mapTypeControl: false,
        mapTypeControlOptions: {
          style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          position: window.google.maps.ControlPosition.LEFT_BOTTOM
        },
        fullscreenControl: false,
        zoom: 16,
        styles: [{"featureType": "poi","stylers": [{"visibility": "off"}]},]
      })
    }, () => { this.updateMarkers() })
  }

  render() {
    return (
      <div className="App">
        <Sidebar
          visible       = {this.state.sidebar}
          toogleSidebar = {this.toogleSidebar}
          markers       = {this.state.markers}
          setFilter     = {this.setFilter}
          centerMap     = {this.centerMap}
        />
        <Header
          toogleSidebar = {this.toogleSidebar}
        />
        <Map />
      </div>
    );
  }
}

export default App
