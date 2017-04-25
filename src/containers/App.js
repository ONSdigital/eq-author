import React from 'react'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import routes from 'routes'

const RouteWithLayout = (route) => {
  if (route.layout) {
    return (
      <Route exact path={route.path} render={(props) => (
        <route.layout {...route}>
          <route.component />
        </route.layout>
      )}/>
    )
  }
  else {
    return <route.component />
  }
}

export default ({history}) =>
  <ConnectedRouter history={history}>
    <div>
      {routes.map(route => (
        <RouteWithLayout key={route.path} {...route} />
      ))}
    </div>
  </ConnectedRouter>
