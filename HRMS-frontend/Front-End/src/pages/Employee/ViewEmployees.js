import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom"
import { Col, Container, Row } from "reactstrap"
import { map } from "lodash"
import service from "../../service/constant";
import { LOGIN_SERVER, ADMIN_USER_REGISTER, USERS } from "../../service/url_helper";
import axios from "axios"
import { fetchUsers } from "helpers/AuthTypes/BackEndHelper";
import { apiservice } from "../../service/apiservice";
//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import Card
import CardEmployee from "./card-Employee"

const ViewEmployees = () => {

  const [users, setUser] = useState()

  document.title = "User Employees|Hrms@Simform";

  useEffect(() => {
    console.log(localStorage.getItem('token'));
    
    apiservice.callServiceGet(USERS)
      .then((user) => {
        console.log(user.data.result);
        setUser(user.data.result)
      })
      .catch((e) => { console.log(e) })

  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Employee" breadcrumbItem="View Employee" />

          <Row>
            {map(users, (user, key) => (
              <CardEmployee user={user} key={"_user_" + key} />
            ))}
          </Row>

          <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <Link to="#" className="text-success">
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(ViewEmployees)