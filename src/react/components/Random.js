import React from 'react';

export default class Random extends React.Component {

	render() {
		return (
			<p>
				<button 
					class="btn btn-warning btn-sm" 
					onClick={this.props.random}>
					<span class="glyphicon glyphicon-refresh"></span>
				</button>
			</p>
			);
	}
}