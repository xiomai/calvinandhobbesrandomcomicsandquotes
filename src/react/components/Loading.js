import React from 'react';

export default class Loading extends React.Component {

	render() {
		const loading = <span class="glyphicon glyphicon-refresh spinning"></span>

		return (
			<p>{ loading }</p>
			);
	}
}