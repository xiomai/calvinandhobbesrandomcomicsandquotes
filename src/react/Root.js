import axios from 'axios'
import React from 'react'

import * as ComicActions from './actions/Action'
import CalvinAndHobbes from './store/CalvinAndHobbes'
import Footer from './components/Footer'
import Loading from './components/Loading'
import Random from './components/Random'

export default class Root extends React.Component {
  constructor() {
		super()
		this.getComics = this.getComics.bind(this)
		this.state = {
			imgSrc: CalvinAndHobbes.getImgSrc(),
      quote: CalvinAndHobbes.getQuote(),
			fetching: CalvinAndHobbes.getFetchStatus()
		}
	}

	componentWillMount() {
		CalvinAndHobbes.on('change', this.getComics)
	}

	componentWillUnmount() {
		CalvinAndHobbes.removeListener('change', this.getComics)
	}

	getComics() {
		this.setState({
			imgSrc: CalvinAndHobbes.getImgSrc(),
      quote: CalvinAndHobbes.getQuote(),
			fetching: CalvinAndHobbes.getFetchStatus()
		})
	}
  
  renderImage() {
		const isFetching = this.state.fetching
		const imgUrlState = this.state.imgSrc.url
		const imgStyle = {'maxWidth': '100%'}
    
		return (isFetching) ? (
			<Loading />
		) : (
			<div class="row">
				<img src={this.state.imgSrc.url} class="img-responive" style={imgStyle} />
			</div>
		)
	}

	random() {
		ComicActions.fetchComics()
	}

  render() {
    const comicImage = this.renderImage()
    const quote = this.state.quote
		const randomComponent = (!this.state.fetching) ? <Random random={this.random.bind(this)} /> : ''

    return (
      <div class="jumbotron">
        <img title={quote} class="calvinandhobbes" src={require('../images/calvin-and-hobbes.png')} />
        <p class='griffy'>{quote}</p>
        {comicImage}
				{randomComponent}
				<Footer />
      </div>
    )
  }
}