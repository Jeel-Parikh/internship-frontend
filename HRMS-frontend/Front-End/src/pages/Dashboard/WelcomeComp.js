import React from "react"

import { Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

import avatar1 from "../../assets/images/users/avatar-1.jpg"
import profileImg from "../../assets/images/profile-img.png"
import service from "service/constant"

const WelcomeComp = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <div className="bg-primary bg-soft">
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
                <h5 className="text-primary">Welcome Back !</h5>
                <p>HRMS  Dashboard</p>
              </div>
            </Col>
            <Col xs="5" className="align-self-end">
              <img src={profileImg} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="4">
              <div className="avatar-md profile-user-wid mb-4">
                <img
                  src={service.API_URL + user.userPhoto}
                  alt=""
                  className="img-thumbnail rounded-circle"
                />
              </div>
              <h5 className="font-size-15 text-truncate">{user.name}</h5>
              <p className="text-muted mb-0 text-truncate">{user.designation}</p>
            </Col>

            <Col sm="8">


              <div className="mt-4">
                <Link
                  to="/profile"
                  className="btn btn-primary  btn-sm"
                >
                  View Profile <i className="mdi mdi-arrow-right ms-1"></i>
                </Link>

              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
export default WelcomeComp
