import axios from 'axios'
import cheerio from 'cheerio'

import dispatcher from '../dispatcher.js'

export function fetchComics() {

	dispatcher.dispatch({ type: "FETCHING_IMAGE" })

	axios.get('/curler.php')
		.then((response) => {
			const curledHtml = cheerio.load(response.data)
			const stripUrl = curledHtml('.img-fluid.item-comic-image');
			const imgSrc = stripUrl.find('img').attr('src')

			dispatcher.dispatch({
				type: 'FETCHING_IMAGE_SUCCESS',
				payload: imgSrc
			})
		})
		.catch((error) => {

			dispatcher.dispatch({
				type: 'FETCHING_IMAGE_ERROR',
				payload: error
			})
		});
}
