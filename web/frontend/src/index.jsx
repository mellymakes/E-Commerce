import React from 'react'
import reactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import redux from './redux'
import './main-scss/main.scss'


reactDOM.render(<Provider store={redux}><App/></Provider>, document.getElementById('root'))