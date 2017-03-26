import React, { PureComponent } from 'react';

export default class Loading extends PureComponent {

	render() {
		const loading = <span class="glyphicon glyphicon-refresh spinning"></span>

		return (
			<p>{ loading }</p>
			);
	}
}