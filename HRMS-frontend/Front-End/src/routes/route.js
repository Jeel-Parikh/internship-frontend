import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import AddUser from "pages/Employee/ExtraEmployeeDetails"
import NonAuthLayout from "components/NonAuthLayout"

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      // console.log("Props");
      if (isAuthProtected && !localStorage.getItem("user")) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }


      return (
        <Layout>
          <Component {...props} />
        </Layout>
      )
    }}
  />
)

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}

export default Authmiddleware;
