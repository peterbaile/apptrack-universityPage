import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getUniversitiesQuery, getUniversityQuery, updateUniversityMutation } from '../queries/queries';

// import style
import styled from 'styled-components';
import '../index.css';

// Styling
const Button = styled.button`
display: inline-block
  color: white;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
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
    "id",
	"name",
	"email",
	"portalEmail",
	"submitType",
	"status",
	"admissions"
];

const displayType = [
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

class UpdateUniversity extends Component {
    constructor(props) {
        super(props);
        this.state = type;
		this.state.errorMessage = null;
    }

    submitForm(e) {
        e.preventDefault();
        this.props.updateUniversityMutation({
            variables: updateState(this.state),
            refetchQueries: [{ query: getUniversitiesQuery }]
        })
            .then((result) => {
            })
            .catch((res) => {
                console.log("------RESPONSE-----");
                let errormessage = null;
                res.graphQLErrors.map(error => errormessage = error.message);
                this.setState({ errorMessage: errormessage });
            });
    }

    displayFields(university) {
		return (
			displayType.map(field => {
				return (
					<div className="field">
						<label> {field}:  </label>
						<input name={university.id} type="text" disabled defaultValue={university[field]} onChange={e => this.setState({ [field]: e.target.value })} />
					</div>
				)
			})

		)
	}

    displayForm() {
        console.log(this.state);
        if (this.props.getUniversityQuery.loading) {
            return <div> Loading... </div>;
        }
        const { university } = this.props;

        if (!university) {
            return <div> No University Selected </div>;
        }

        // console.log(this.state);
        return (
            <div>
                <form onSubmit={this.submitForm.bind(this)}>
                    {this.displayFields(university)}
                    <Button type="button" onClick={e => this.onEditButton(university.id)}> Edit </Button>
                    <Button onClick={e => this.onSaveButton(university.id)}> Save </Button>
                </form>


            </div>
        )
    }

    onEditButton(id) {
        if (this.props.getUniversityQuery.loading && !this.props.university) {
            return;
        }
        const { university } = this.props;
        if (document.getElementsByName(id)) {
            document.getElementsByName(id).forEach(field => { field.disabled = false });
            inputType.map(field => {
                this.setState({[field]: university[field]})
            });
        }
    }

    onSaveButton(id) {
        this.setState({errorMessage:null});
        if (document.getElementsByName(id)) {
            document.getElementsByName(id).forEach(field => { field.disabled = true });
        };
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

export default compose(graphql(getUniversityQuery, {
    name: "getUniversityQuery",
    options: props => {
        return {
            variables: {
                university: props.university
            }
        }
    }
}),
    graphql(updateUniversityMutation, { name: "updateUniversityMutation" })
)(UpdateUniversity);