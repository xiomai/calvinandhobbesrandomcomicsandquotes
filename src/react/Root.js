import axios from 'axios'
import React from 'react'

import CalvinAndHobbes from './store/CalvinAndHobbes'
import Loading from './components/Loading'

export default class Root extends React.Component {
  constructor() {
		super()
		this.getComics = this.getComics.bind(this)
		this.state = {
			imgSrc: CalvinAndHobbes.getImgSrc(),
      quote: CalvinAndHobbes.getQuote()
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
      quote: CalvinAndHobbes.getQuote()
		})
	}
  
  renderImage() {
		const imgUrlState = this.state.imgSrc.url
		const imgStyle = {'maxWidth': '100%'}
    
		return (imgUrlState.length != 0) ? (
			<div class="row">
				<img src={this.state.imgSrc.url} class="img-responive" style={imgStyle} />
			</div>
		) : (
			<Loading />
		)
	}

  render() {
    const comicImage = this.renderImage()
    const quote = this.state.quote

    return (
      <div class="jumbotron">
        <img title={quote} class="calvinandhobbes" src={require('../images/calvin-and-hobbes.png')} />
        <p class='griffy'>{quote}</p>
        {comicImage}
      </div>
    )
  }
}