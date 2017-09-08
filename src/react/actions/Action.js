import axios from 'axios'
import cheerio from 'cheerio'

import dispatcher from '../dispatcher.js'

export function fetchComics() {

	dispatcher.dispatch({ type: "FETCHING_IMAGE" })

	axios.get('/curler.php')
		.then((response) => {

			/**
			 * Use Cheeriojs to parse the html passed from php curling it.
			 * Traverse on class `.img-fluid.item-comic-image` which
			 * contains an img element, then get the src link to dispatch it.
			 */
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
