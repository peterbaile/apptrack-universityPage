import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getUniversityQuery } from '../queries/queries';

class UniversityDetails extends Component {
	displayUniversityDetails() {
		if (this.props.data.loading) {
			return <div> No University Selected </div>;
		}
		// const { universityId } = this.props;
		const { universities } = this.props.data;

		if (universities.length === 0) {
			return <div> No University Selected </div>;
        }
        
		return (
			<div>
				<h2> University Name: {universities.map(university => university.name)} </h2>
				<p> University Email: {universities.map(university => university.email)} </p>
			</div>
		);
	}

	render() {
		return <div>{this.displayUniversityDetails()}</div>;
	}
}

export default graphql(getUniversityQuery, {
	options: props => {
		return {
			variables: {
				id: props.universityId
			}
		};
	}
})(UniversityDetails);
