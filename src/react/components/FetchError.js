import React, { PureComponent } from 'react';

export default class FetchError extends PureComponent {

	render() {
		return (
			<p class="text-danger">Could not retrieve comic image.</p>
		);
	}
}