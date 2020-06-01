import React from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { isAuthenticated } from "./services/auth"

import SignUp from "./pages/SignUp/index.jsx"
import SignIn from "./pages/SignIn/index.jsx"
import Home from "./pages/Home/index.jsx"
import Maps from "./pages/Maps/index.jsx"

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute path="/maps" component={Maps} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;