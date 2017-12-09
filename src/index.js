import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import CreatePost from './components/CreatePost'
import CreateUser from './components/CreateUser'
import LoginUser from './components/LoginUser'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'tachyons'
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'

const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cjax3rfxo0prm01426vyoyplj' })
const client = new ApolloClient({ networkInterface })

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
