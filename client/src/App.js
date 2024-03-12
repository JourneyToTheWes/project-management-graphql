import Header from './components/Header';
import Clients from './components/Clients';
import Projects from './components/Projects';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import AddClientModal from './components/AddClientModal';

// Fixes Cache data lost error message when replacing clients field of
// a Query object. Prevents console problems when network requests are
// made to fetch data that were cached.
const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                clients: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                },
                projects: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                }
            }
        }
    }
});

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache
});

const App = () => {
    return (
        <>
            <ApolloProvider client={client}>
                <Header />
                <div className="container">
                <AddClientModal />
                <Projects />
                <Clients />
                </div>
            </ApolloProvider>
        </>
    );
};

export default App;
