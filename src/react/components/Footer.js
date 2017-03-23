import React from 'react';

export default class Footer extends React.Component {

	render() {
		const loading = <span class="glyphicon glyphicon-refresh spinning"></span>

		return (
			<blockquote class="blockquote-reverse">
				<p class="griffy"><em>by</em> Bill Watterson</p>
				<small>Comic Image Host @ <cite title="GoComics.com">http://www.gocomics.com/calvinandhobbes</cite></small>
			</blockquote>
			);
	}
}