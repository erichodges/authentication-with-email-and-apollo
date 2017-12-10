import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink} from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './components/App'
import CreatePost from './components/CreatePost'
import CreateUser from './components/CreateUser'
import LoginUser from './components/LoginUser'
import 'tachyons'

// __SIMPLE_API_ENDPOINT__ looks like: 'https://api.graph.cool/simple/v1/__SERVICE_ID__'
const httpLink = createHttpLink({ uri: 'https://api.graph.cool/simple/v1/cjazmytmu00040141lxx6ywgt' })

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('graphcoolToken')
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  })
  return forward(operation)
})

const httpLinkWithAuthToken = middlewareLink.concat(httpLink)

const client = new ApolloClient({ 
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
})

// const client = new ApolloClient({
//   link: new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjazmytmu00040141lxx6ywgt' }),
//   cache: new InMemoryCache()
// });

ReactDOM.render((
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={App} />
          <Route exact path='/create' component={CreatePost} />
          <Route exact path='/login' component={LoginUser} />
          <Route exact path='/signup' component={CreateUser} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  ),
  document.getElementById('root')
)
