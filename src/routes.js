import React, { Fragment } from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { ModalContainer } from "react-router-modal";
import "react-router-modal/css/react-router-modal.css";
import { isAuthenticated } from "./services/auth"

import SignUp from "./pages/SignUp/index.jsx"
import SignIn from "./pages/SignIn/index.jsx"
import Home from "./pages/Home/index.jsx"
import Maps from "./pages/Maps/index.jsx"
import Events from "./pages/Events/index.jsx"
// import Profile from "./pages/Profile/index.jsx"

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={
    props =>
      // isAuthenticated() ? (
      <Component {...props} />
    // ) : (
    //     <Redirect to={{ pathname: "/", state: { from: props.location } }} />
    //   )
  }
  />
);

const Routes = () => (
  <BrowserRouter >
    <Fragment >
      <Switch >
        <Route exact path="/" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/maps" component={Maps} />
        <PrivateRoute path="/events" component={Events} />
        {/* <PrivateRoute path="/profile" component={Profile} /> */}
        <Route path="*" component={() => < h1 > Page not found </h1>} />
      </Switch>
      <ModalContainer />
    </Fragment>
  </ BrowserRouter >
);

export default Routes;