import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addUniversityMutation, getUniversitiesQuery } from '../queries/queries';

// import components

// import style
import styled from 'styled-components';
import '../index.css';

// Styling
const Button = styled.button`
  color: white;
  margin: 1em;
  border: 2px solid palevioletred;
  border-radius: 50%;
  background-color: palevioletred;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  :hover{
      background-color: white;
      color: black;
  };
`;

const SaveButton = styled.button`
  color: white;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  border: 2px solid palevioletred;
  background-color: palevioletred;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  :hover{
      background-color: white;
      color: black;
  };
`;

const type = {
	id: null,
	submitType: '',
	email: '',
	portalEmail: '',
	name: '',
	status: '',
	createdBy: '',
	createdDT: '',
	modifiedBy: '',
	modifiedDT: '',
	admissions: null,
};

const inputType = [
	"name",
	"email",
	"portalEmail",
	"submitType",
	"status",
	"admissions"
];

function updateState(state) {
	var obj = {};
	for (var x in type) {
		obj[x] = state[x];
	}
	return obj;
};

class AddUniversity extends Component {
	constructor(props) {
		super(props);
		this.state = type;
		this.state.errorMessage = null;
		this.state.displayAdd = false;
	}

	submitForm(event) {
		event.preventDefault();
		this.props.addUniversityMutation({
			variables: updateState(this.state),
			refetchQueries: [{ query: getUniversitiesQuery }]
		})
			.then((result) => {
				return result;
			})
			.catch((res) => {
				console.log("------RESPONSE-----");
				let errormessage = null;
				res.graphQLErrors.map(error => errormessage = error.message);
				this.setState({ errorMessage: errormessage });
			});
	}

	displayFields() {
		return (
			inputType.map(field => {
				return (
					<div className="field">
						<label> {field}:  </label>
						<input type="text" onChange={e => this.setState({ [field]: e.target.value })} />
					</div>
				)
			})

		)
	}

	displayForm() {
		console.log(this.state);
		if (!this.state.displayAdd) {
			return (
				<div>
					<Button onClick={e => this.setState({ displayAdd: true })}> + </Button>
					<label> Add a new University </label>
				</div>
			)
		}

		return (
			<div>
				<Button onClick={e => this.setState({ displayAdd: true })}> + </Button>
				<label> Add a new University </label>

				<form onSubmit={this.submitForm.bind(this)}>
					{/* <div className="field">
						<label> University name: </label>
						<input type="text" onChange={(event) => this.setState({ name: event.target.value })} />
					</div>

					<div className="field">
						<label> Email: </label>
						<input type="text" onChange={(event) => this.setState({ email: event.target.value })} />
					</div> */}
					{this.displayFields()}
					<SaveButton> Save </SaveButton>
				</form>
			</div>
		)
	}

	displayError() {
		if (this.state.errorMessage) {
			return <label> {this.state.errorMessage} </label>
		}
	}

	render() {
		return (
			<div> {this.displayForm()}
				{this.displayError()}
			</div>
		);
	}
}

export default compose(
	graphql(addUniversityMutation, { name: 'addUniversityMutation' }))
	(AddUniversity);

// export default graphql(getUniversitiesQuery)(AddUniversity);
