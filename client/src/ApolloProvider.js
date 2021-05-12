import React from 'react';
import App from './App';
import {ApolloClient, InMemoryCache, createHttpLink, ApolloProvider} from '@apollo/client';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: 'https://desolate-bastion-84066.herokuapp.com/' //REPLACE THIS FOR DEPLOYMENT
});

const authLink = setContext(() => {
    const token = localStorage.getItem("jwtToken");
    return{
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const client = new ApolloClient({
    connectToDevTools: true,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});


export default(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
);