global.jQuery = require('jquery');

var cosmo =  require("./styles/themes/bootswatch/cosmo/bootstrap.css")
var bootstrapjs = require('./styles/themes/bootswatch/bootstrap.min.js')

import React from 'react';
import ReactDOM from 'react-dom'
import Root from './react/root.js'

var app = document.getElementById('app');

ReactDOM.render(
    <Root />,
    app);

if (DEVELOPMENT) {
    if (module.hot) {
        module.hot.accept();
    }
}