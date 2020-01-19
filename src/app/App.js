import React, {useState} from 'react';

import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

import {AuthenticationProvider} from './auth/useAuthentication';
import Auth from './auth';
import Header from './header';
import Posts from './posts';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
})

const App = () => {

  const [login, setLogin] = useState(false);

  return (
    <ApolloProvider client={client} >
        <AuthenticationProvider>        
          <Header openLogin={() => setLogin(true)}/>
          <Auth open={login} close={() => setLogin(false)}/>
          <Posts />
      </AuthenticationProvider>
    </ApolloProvider>
  
  );
}

export default App;
