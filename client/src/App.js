import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

// import components
import UniversityList from './components/UniversityList';
import AddUniversity from './components/AddUniversity';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql' 
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1> AppTrack Asia University Page </h1>
          <UniversityList/>
          <AddUniversity/>
          
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
