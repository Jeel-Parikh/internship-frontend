import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"



const Logout = props => {

  console.log('hello');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  props.history.push('/login');
}

Logout.propTypes = {
  history: PropTypes.object,
}

export default withRouter(Logout)
