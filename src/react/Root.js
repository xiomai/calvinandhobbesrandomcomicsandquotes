import axios from 'axios'
import React from 'react'

import CalvinAndHobbes from './store/CalvinAndHobbes'
import calvinAndHobbesQuotes from 'calvin-and-hobbes-quotes'

export default class Root extends React.Component {
  constructor() {
		super()
		this.getImgSrc = this.getImgSrc.bind(this)
		this.state = {
			imgSrc: CalvinAndHobbes.getImgSrc()
		}
	}

	componentWillMount() {
		CalvinAndHobbes.on('change', this.getImgSrc)
	}

	componentWillUnmount() {
		CalvinAndHobbes.removeListener('change', this.getImgSrc)
	}

	getImgSrc() {
		this.setState({
			imgSrc: CalvinAndHobbes.getImgSrc()
		})
	}
  
  renderImage() {
		const imgUrlState = this.state.imgSrc.url
		const imgStyle = {
			'maxWidth': '100%'
		}
		return (imgUrlState.length != 0) ? (
			<div class="row">
				<img src={this.state.imgSrc.url} class="img-responive" style={imgStyle} />
			</div>
		) : (
			<p>Loading comics...</p>
		)
	}

  render() {
    const imageHeader = <img title={quote} class="calvinandhobbes" src={require('../images/calvin-and-hobbes.png')} />
    const comicImage = this.renderImage()
    const quote = calvinAndHobbesQuotes.random()

    return (
      <div class="jumbotron">
        {imageHeader}
        <p>{quote}</p>
        {comicImage}
      </div>
    )
  }
}