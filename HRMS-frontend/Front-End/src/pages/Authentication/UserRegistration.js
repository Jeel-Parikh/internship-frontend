import React, { useEffect } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";


import { Link } from "react-router-dom";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo-dark.png";
import { partnerSignup } from "helpers/validationSchemas";

const UserRegistration = props => {

   //meta title
   document.title="Register | BLIV Partner";


  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      hiringFor : 'myOwnCompany',
      companyName : '',
      companyWebsite : '',
      consultancyName : '',
      consultancyWebsite : '',
      numbersOfEmployees : '',
      clients : '',
    },
    validationSchema: Yup.object().shape({}),
    onSubmit: (values) => {
        console.log("here")
        props.history.push('/register',{values:values})
      //dispatch(registerUser(values));
    }
  });

  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = validation


  useEffect(() => {
    console.log("values",values)
    console.log("errors",errors)
    console.log("props",props)

  }, [values,errors])


  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col">
                      <div className="text-primary p-5">
                        <h5 className="text-primary text-center m-1">Personal Details</h5>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logoImg}
                            alt=""
                            //className="rounded-circle"
                            height="44"
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
                      {user && user ? (
                        <Alert color="success">
                          Register User Successfully
                        </Alert>
                      ) : null}

                      {registrationError && registrationError ? (
                        <Alert color="danger">{registrationError}</Alert>
                      ) : null}
                      <div className="mb-3">
                        <Label className="form-label">First Name</Label>
                        <Input
                          id="companyName"
                          name="companyName"
                          className="form-control"
                          placeholder="First Name "
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.companyName || ""}
                          invalid={
                            touched.companyName && errors.companyName ? true : false
                          }
                        />
                        {touched.companyName && errors.companyName ? (
                          <FormFeedback type="invalid">{errors.companyName}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Last Name <small className="text-muted">(optional)</small></Label>
                        <Input
                          name="companyWebsite"
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.companyWebsite || ""}
                          invalid={
                            touched.companyWebsite && errors.companyWebsite ? true : false
                          }
                        />
                        {touched.companyWebsite && errors.companyWebsite ? (
                          <FormFeedback type="invalid">{errors.companyWebsite}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Mobile Number</Label>
                        <Input
                          name="clients"
                          type="clients"
                          className="form-control"
                          placeholder="Mobile Number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.clients || ""}
                          invalid={
                            touched.clients && errors.clients ? true : false
                          }
                        />
                        {touched.clients && errors.clients ? (
                          <FormFeedback type="invalid">{errors.clients}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">PanCard Number</Label>
                        <Input
                          id="consultancyName"
                          name="consultancyName"
                          className="form-control"
                          placeholder="PanCard Number"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.consultancyName || ""}
                          invalid={
                            touched.consultancyName && errors.consultancyName ? true : false
                          }
                        />
                        {touched.consultancyName && errors.consultancyName ? (
                          <FormFeedback type="invalid">{errors.consultancyName}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">GSTIN Number</Label>
                        <Input
                          id="consultancyWebsite"
                          name="consultancyWebsite"
                          type="text"
                          className="form-control"
                          placeholder="GSTIN Number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.consultancyWebsite || ""}
                          invalid={
                            touched.consultancyWebsite && errors.consultancyWebsite ? true : false
                          }
                        />
                        {touched.consultancyWebsite && errors.consultancyWebsite ? (
                          <FormFeedback type="invalid">{errors.consultancyWebsite}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mt-4">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Next
                        </button>
                      </div>

                      {/* <div className="mt-4 text-center">
                        <p className="mb-0">
                          By registering you agree to the Skote{" "}
                          <Link to="#" className="text-primary">
                            Terms of Use
                          </Link>
                        </p>
                      </div> */}
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Skote. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Themesbrand
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserRegistration;
