import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Project from './pages/Project';
import NotFound from './pages/NotFound';
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
                <Router>
                    <Header />
                    <div className="container">
                        <Routes>
                            <Route path="/" element={ <Home /> }></Route>
                            <Route path="/project/:id" element={ <Project /> } />
                            <Route path="*" element={ <NotFound /> }></Route>
                        </Routes>
                    </div>
                </Router>
            </ApolloProvider>
        </>
    );
};

export default App;
