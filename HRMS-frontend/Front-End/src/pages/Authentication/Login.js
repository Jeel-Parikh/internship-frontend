import PropTypes from "prop-types";
import React, { useEffect } from "react";


import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";
import axios from "axios";
import { Dispatch } from "react";

import { withRouter, Link } from "react-router-dom";
import showToast from '../../helpers/Toast.js'


// Formik validation
import { useFormik } from "formik";
import { loginSchema } from "helpers/validationSchemas";
import { LOGIN } from "../../helpers/AuthTypes/BackEndHelper";
import { apiservice } from "../../service/apiservice";

import profile from "assets/images/profile-img.png";
// import logo from "assets/images/logo.svg";
import logo from "assets/images/logo-dark.png";

// import { facebook, google } from "../../config";
import service from "service/constant";
import { LOGIN_SERVER } from "service/url_helper";
import { resolveConfig } from "prettier";
import { useNavigate } from "react-router";
// import showToast from "helpers/Toast";

const Login = props => {
  if (localStorage.getItem('data') || localStorage.getItem('user')) {
    localStorage.clear();
  }

  //meta title
  document.title = "Login | Welcome to Pyther";
  // let navigate = useNavigate();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "" || '',
      password: "123456" || '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      console.log("here");
      // console.log(values);
      apiservice.PostLoginPreJwt(LOGIN_SERVER, values)
        .then((res) => {
          console.log(res.data);
          if (res.data.response) {
            localStorage.setItem("token", res.data.result.token);
            localStorage.setItem("user", JSON.stringify(res.data.result.data))
            console.log('------', JSON.parse(localStorage.getItem('user')).contactNumber);
            if (JSON.parse(localStorage.getItem('user')).contactNumber) {
              showToast("Success", 'Login Successful');

              props.history.push('/dashboard')
            }
            else {
              props.history.push('/remaining')

            }
          }
        })
        .catch((err) => {
          console.log("err", err);
          showToast("error", 'failed to login', 'Please verify your credentials')
        })
    }
  });


  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = validation
  // const navigate = useNavigate();

  useEffect(() => {
    // console.log("values", values)
  }, [values])


  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home fa-lg" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to HRMS</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            //className="rounded-circle"
                            height="25"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                        return false;
                      }}
                    >
                      {/* {error ? <Alert color="danger">{error}</Alert> : null} */}

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email ? true : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          value={values.password || ""}
                          type="password"
                          placeholder="Enter Password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={
                            touched.password && errors.password ? true : false
                          }
                        />
                        {touched.password && errors.password ? (
                          <FormFeedback type="invalid">{errors.password}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-success btn-block"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>


                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="text-center">
                <p>
                  © {new Date().getFullYear()} Made with {" "}
                  <i className="mdi mdi-heart text-danger" /> by Pyther Innovations
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
