import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";
import service from "service/constant";
// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// users
import user1 from "../../../assets/images/users/avatar-1.jpg";
// let user = localStorage.getItem('user');

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);

  // const [username, setusername] = useState("Admin");
  const [user, setUser] = useState({});

  
  useEffect(() =>{
    console.log("In use effect");
    let user = JSON.parse(localStorage.getItem('user'));
    // console.log("user>>>>",user);
    setUser(user);

  
},[]);
  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={service.API_URL + user.userPhoto}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-2 me-1">{user.name}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Profile")}{" "}
          </DropdownItem>
         
          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
};



export default withRouter(
  withTranslation()(ProfileMenu)
);
