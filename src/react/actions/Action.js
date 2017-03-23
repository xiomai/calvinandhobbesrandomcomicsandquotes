import axios from 'axios'
import dispatcher from '../dispatcher.js'

export function fetchComics(random = true) {

	const link = (random) ? 'random/calvinandhobbes' : 'calvinandhobbes'
	
	dispatcher.dispatch({ type: "FETCHING_IMAGE" })

	const comicUrl = 'http://www.gocomics.com/' + link
	const query = `select src from html where url='${comicUrl}' and compat='html5' and xpath='//a[contains(@class,"item-comic-link")]/picture/img'`
	const yql = "https://query.yahooapis.com/v1/public/yql?q="+ query +"&format=json&diagnostics=true"
	
	const imgSrc = axios.get(yql)
		.then(function (response) {
			const imgSrc = response.data.query.results.img.src
			dispatcher.dispatch({
				type: 'FETCHING_IMAGE_SUCCESS',
				payload: imgSrc
			})
		})
		.catch(function (error) {
			console.log(error);
			dispatcher.dispatch({
				type: 'FETCHING_IMAGE_ERROR',
				payload: error
			})
		});
}
