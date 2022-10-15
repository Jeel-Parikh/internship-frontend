import React, { useEffect } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback, CardTitle, Button } from "reactstrap";
import service from "service/constant";
import axios from "axios";
import { USERS } from "../../service/url_helper";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { ADD_EMPLOYEE } from "../../helpers/AuthTypes/BackEndHelper";
import { apiservice } from "../../service/apiservice";

import showToast from "../../helpers/Toast";
import { Link } from "react-router-dom";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo-dark.png";
import { partnerSignup, registerSchema } from "helpers/validationSchemas";
// import showToast from "helpers/Toast";

const AddEmployee = props => {

  //meta title
  document.title = "Add Employee|Hrms";


  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: '',
      email: "",
      password: '',
      designation: 'admin',
      joiningDate: ''

    },
    validationSchema: registerSchema,
    onSubmit: (values) => {

      console.log(values);
      console.log("here");
      console.log("Data to be Sent Sucessfully ")
      // console.log(values);
      // ADD_EMPLOYEE(values);
      apiservice.callServicePostFormdata(USERS, values)
        .then((res) => { console.log(res); if (res.data.response) { showToast("Success", "Inserted Successfully", 'You can see updated list to verify'); props.history.push("/view-employee") } else { showToast('error', 'An error occured') } })
        .catch((err) => { console.log("err", err); showToast("error", "An error occured", 'You can see updated list to verify') });

      console.log("Datasent")
      // props.history.push("/");
    }


  });

  // let handleRegister = async () => {
  //   let res = await axios.post(service.API_URL + ADMIN_USER_REGISTER, { values })
  //   const person = res.data.person;
  //   console.log("Data Sent");
  //   console.log(person);

  // }




  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = validation


  useEffect(() => {
    // dispatch(apiError(""));
  }, []);

  useEffect(() => {
    console.log("values", values)
    console.log("errors", errors)
    console.log("company-register props", props)

  }, [values, errors])


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
            <h4>Registration Page</h4>

            <Col md={8} lg={6} xl={5}>

              <div className="p-2">
                <Card >
                  <CardBody>

                    <Form className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label">Name</Label>
                        <Input
                          name="name"
                          className="form-control"
                          placeholder="Enter Name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={
                            validation.touched.name && validation.errors.name ? true : false
                          }
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
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
                          value={validation.values.password || ""}
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
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="designation">designation</Label>
                        <div className="col-md-10">
                          <select className="form-control" name='designation' onChange={handleChange}
                            value={validation.values.designation || "admin"}>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                            <option value="project_manager">Project Manager</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">JOINING DATE</Label>
                        <Input
                          name="joiningDate"
                          className="form-control"
                          // placeholder="Enter email"
                          type="date"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.joiningDate || ""}
                          invalid={
                            validation.touched.joiningDate && validation.errors.joiningDate ? true : false
                          }
                        />
                        {validation.touched.joiningDate && validation.errors.joiningDate ? (
                          <FormFeedback type="invalid">{validation.errors.joiningDate}</FormFeedback>
                        ) : null}
                      </div>





                      <div className="d-flex justify-content-sm-center">
                        <Button
                          type="submit"
                          color="primary"
                          className="btn btn-primary btn-block">
                          Add Employee
                        </Button>

                      </div>
                    </Form>
                  </CardBody>

                </Card>


              </div>

            </Col>
          </Row>
        </Container>
      </div >
    </React.Fragment >
  );
};

export default AddEmployee;
