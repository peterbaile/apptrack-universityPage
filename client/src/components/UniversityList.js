import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getUniversitiesQuery} from '../queries/queries';
import styled from 'styled-components';

// import CSS documents
import '../index.css';


// import components
// import UniversityDetails from './UniversityDetail';
import UpdateUniversity from './UpdateUniversity';

const Wrapper = styled.section`
  padding: 1em;
  background: papayawhip;
`;

class UniversityList extends Component{
    constructor (props){
        super(props);
        this.state = {
            selected: null,
            selectedUniversity: null
        }
    }
    
    displayUniversities(){
        var data = this.props.data;
        if (data.loading){
            return (<div> Loading Universities... </div>);
        } else {
            return data.universities.map(university => {
                return <li key={university.id} onClick = {event => {this.setState({selected: university.id})}}> {university.name} </li>
            })
        }
    }

    displayUpateUniversitiesForm(){
        var data = this.props.data;
        if (data.loading){
            return (<div> Loading Universities... </div>);
        }

        const {universities} = this.props.data;
        return universities.map(element => {
            return (
                <div class="universityform">
                <Wrapper>
                    <UpdateUniversity university = {element}/>
                </Wrapper>
                </div>
            )
            
        })
    }

    render(){
        return (
            <div> 
                {this.displayUpateUniversitiesForm()}
            </div>

        )
    }
}

export default graphql(getUniversitiesQuery)(UniversityList);