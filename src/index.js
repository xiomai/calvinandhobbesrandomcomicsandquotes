
var sass = require('./styles/sass/style.scss')

import * as ComicActions from './react/actions/Action'
import React from 'react';
import ReactDOM from 'react-dom'
import Root from './react/Root.js'

ComicActions.fetchComics()
var app = document.getElementById('app');

ReactDOM.render(
    <Root />,
    app);

if (DEVELOPMENT) {
    if (module.hot) {
        module.hot.accept();
    }
}