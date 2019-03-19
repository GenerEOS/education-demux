import React from 'react'
import ReactDOM from 'react-dom'
import App from 'App'
import registerServiceWorker from 'utils/registerServiceWorker'
import 'assets/styles/core.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
