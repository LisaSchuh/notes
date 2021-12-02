
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
  } from "@apollo/client";

import Notes from '@notes/notes';

const client = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache()
  });

export default function App() {    

    return <ApolloProvider client={client}>    
        <Notes/>
    </ApolloProvider>
}