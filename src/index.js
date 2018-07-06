
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';
import App from './App'

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

document.addEventListener('DOMContentLoaded', (event) => {
  // register service worker if feature available in browser
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
  }
})
