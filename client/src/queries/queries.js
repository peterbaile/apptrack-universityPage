import { gql } from 'apollo-boost';

const getUniversitiesQuery = gql`
	{
		universities {
			id
			submitType
			email
			portalEmail
			name
			status
			createdBy
			createdDT
			modifiedBy
			modifiedDT
			admissions {
				year
				numOfChoice
				rounds {
					id
					title
					deadline
					createdBy
					createdDT
					modifiedBy
					modifiedDT
				}
				programs {
					id
					code
					faculty
					course
					createdBy
					createdDT
					modifiedBy
					modifiedDT
				}
			}
		}
	}
`;

const getUniversityQuery = gql`
	query($id: ID) {
		universities(filter: { id: { EQ: $id } }) {
			id
			submitType
			email
			portalEmail
			name
			status
			createdBy
			createdDT
			modifiedBy
			modifiedDT
			admissions {
				year
				numOfChoice
				rounds {
					id
					title
					deadline
					createdBy
					createdDT
					modifiedBy
					modifiedDT
				}
				programs {
					id
					code
					faculty
					course
					createdBy
					createdDT
					modifiedBy
					modifiedDT
				}
			}
		}
	}
`;
const addUniversityMutation = gql`
	mutation ($name: String!, $email: String, $submitType: String, $portalEmail: String, $status: String) {
		addUniversity(filter: {}, update: { set: { name: $name, email: $email, submitType: $submitType, portalEmail: $portalEmail, status: $status } }) {
			id
			submitType
			email
			portalEmail
			name
			status
			createdBy
			createdDT
			modifiedBy
			modifiedDT
			admissions {
				year
				numOfChoice
				rounds {
					id
					title
					deadline
					createdBy
					createdDT
					modifiedBy
					modifiedDT
				}
				programs {
					id
					code
					faculty
					course
					createdBy
					createdDT
					modifiedBy
					modifiedDT
				}
			}
		}
	}
`;

const updateUniversityMutation = gql `
mutation ($name: String!, $id: ID!, $email: String, $submitType: String, $portalEmail: String, $status: String){
	updateUniversity(filter:{id:{EQ:$id}}, update: {set: {name: $name, email: $email, submitType: $submitType, portalEmail: $portalEmail, status: $status}}){
		id
		submitType
		email
		portalEmail
		name
		status
		createdBy
		createdDT
		modifiedBy
		modifiedDT
		admissions{
		  year
		  numOfChoice
		  rounds{
			id
			title
			deadline
			createdBy
			createdDT
			modifiedBy
			modifiedDT
		  }
		  programs{
			id
			code
			faculty
			course
			createdBy
			createdDT
			modifiedBy
			modifiedDT
		  }
		}
	  }
  }
`

export { getUniversitiesQuery, getUniversityQuery, addUniversityMutation
, updateUniversityMutation };
