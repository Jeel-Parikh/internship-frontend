import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback, CardTitle, Button } from "reactstrap";
import service from "service/constant";
import axios from "axios";
import { apiservice } from "service/apiservice";
import { USERS } from "../../service/url_helper"
import { getUrlWithId } from "../../service/url_helper";
import { ADMIN_USER_REGISTER } from "service/url_helper";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { ADD_EMPLOYEE } from "../../helpers/AuthTypes/BackEndHelper";
import showToast from 'helpers/Toast';


import { Link } from "react-router-dom";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo-dark.png";
import { partnerSignup, userSchema } from "helpers/validationSchemas";

const AddUser = props => {

    //meta title
    document.title = "User Registration | BLIV Partner";


    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            dob: '',
            contactNumber: '',
            skills: '',
            address: '',
            gender: 'male',
            bankAccount: '',
            aadharCard: '',
            panCard: '',
            userPhoto: '',
            ifsc: '',
            bankName: ''

        },
        validationSchema: userSchema,
        onSubmit: (values) => {

            console.log(values);
            let formdata = new FormData();
            formdata.append("contactNumber", values.contactNumber)
            formdata.append("gender", values.gender)
            formdata.append("dob", values.dob)
            formdata.append("address", values.address)
            formdata.append("skills", values.skills)
            formdata.append("bankAccount", values.bankAccount)
            formdata.append("ifsc", values.ifsc)
            formdata.append("bankName", values.bankName)
            formdata.append("aadharCard", aadharCard)
            formdata.append("panCard", panCard)
            formdata.append("userPhoto", userPhoto)
            console.log("-------_id", JSON.parse(localStorage.getItem('user'))._id);
            apiservice.callServicePutWithFile(getUrlWithId(USERS), formdata)
                .then((res) => {
                    console.log(res);
                    if (res.data.response) {
                        showToast("Success", "Inserted Successfully", 'Login to continue :)');
                        props.history.push('/logout');
                    }
                    else {
                        showToast('error', 'An error occured')
                    }
                })
                .catch((err) => {
                    console.log("err", err)
                });

            console.log("Datasent")

        }


    });




    const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = validation

    const [aadharCard, setAadharCard] = useState();
    const [panCard, setPanCard] = useState();
    const [userPhoto, setUserPhoto] = useState();
    useEffect(() => {
        // dispatch(apiError(""));
    }, []);

    useEffect(() => {
        // console.log("values", values)
        // console.log("errors", errors)
        // console.log("company-register props", props)

    }, [values, errors])



    if (!JSON.parse(localStorage.getItem('user')).contactNumber) {
        let user = JSON.parse(localStorage.getItem('user'));
        return (
            <React.Fragment>
                <div className="home-btn d-none d-sm-block">
                    <Link to="/" className="text-dark">
                        <i className="fas fa-home h2" />
                    </Link>
                </div>
                <div className="account-pages my-5 pt-sm-5">
                    <Container>

                        <Row className="justify-content-left">
                            <h3>Hello {user.name}, Please complete the following details</h3>
                            <h4>User Registration Page</h4>

                            <Col md={8} lg={6} xl={5}>

                                <div className="p-w">
                                    <Card style={{ width: "50vw" }}>
                                        <CardBody>

                                            <Form className="form-horizontal"
                                                encType="multipart/form-data"
                                                onSubmit={(e) => {
                                                    console.log("clicked")
                                                    e.preventDefault();
                                                    handleSubmit();
                                                    return false;
                                                }}
                                            >
                                                <div className="mb-3">
                                                    <Label className="form-label">Date of Birth</Label>
                                                    <Input
                                                        name="dob"
                                                        className="form-control"
                                                        // placeholder="Enter email"
                                                        type="date"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.dob || ""}
                                                        invalid={
                                                            validation.touched.dob && validation.errors.dob ? true : false
                                                        }
                                                    />
                                                    {validation.touched.dob && validation.errors.dob ? (
                                                        <FormFeedback type="invalid">{validation.errors.dob}</FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label" htmlFor="gender">Gender</Label>
                                                    <div className="col-md-10">
                                                        <select className="form-control" name='gender' onChange={handleChange} value={validation.values.gender || ""}>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                        </select>
                                                    </div>
                                                </div>



                                                <div className="mb-3">
                                                    <Label className="form-label">Contact</Label>
                                                    <Input
                                                        name="contactNumber"
                                                        className="form-control"
                                                        placeholder="Enter Contact Number"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.contactNumber || ""}
                                                        invalid={
                                                            validation.touched.contactNumber && validation.errors.contactNumber ? true : false
                                                        }
                                                    />
                                                    {validation.touched.contactNumber && validation.errors.contactNumber ? (
                                                        <FormFeedback type="invalid">{validation.errors.contactNumber}</FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3">
                                                    <Label className="form-label">Address</Label>
                                                    <Input
                                                        name="address"
                                                        className="form-control"
                                                        placeholder="Enter Address"
                                                        type="text"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.address || ""}
                                                        invalid={
                                                            validation.touched.address && validation.errors.address ? true : false
                                                        }
                                                    />
                                                    {validation.touched.address && validation.errors.address ? (
                                                        <FormFeedback type="invalid">{validation.errors.address}</FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">Skills</Label>
                                                    <Input
                                                        name="skills"
                                                        className="form-control"
                                                        placeholder="Enter Skills"
                                                        type="text"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.skills || ""}
                                                        invalid={
                                                            validation.touched.skills && validation.errors.skills ? true : false
                                                        }
                                                    />
                                                    {validation.touched.skills && validation.errors.skills ? (
                                                        <FormFeedback type="invalid">{validation.errors.skills}</FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">Bank Account</Label>
                                                    <Input
                                                        name="bankAccount"
                                                        className="form-control"
                                                        placeholder="Enter Bank Account Number"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.bankAccount || ""}
                                                        invalid={
                                                            validation.touched.bankAccount && validation.errors.bankAccount ? true : false
                                                        }
                                                    />
                                                    {validation.touched.bankAccount && validation.errors.bankAccount ? (
                                                        <FormFeedback type="invalid">{validation.errors.bankAccount}</FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3">
                                                    <Label className="form-label">IFSC Number</Label>
                                                    <Input
                                                        name="ifsc"
                                                        className="form-control"
                                                        placeholder="Enter IFSC Number"
                                                        type="text"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.ifsc || ""}
                                                        invalid={
                                                            validation.touched.ifsc && validation.errors.ifsc ? true : false
                                                        }
                                                    />
                                                    {validation.touched.ifsc && validation.errors.ifsc ? (
                                                        <FormFeedback type="invalid">{validation.errors.ifsc}</FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">Bank Name</Label>
                                                    <Input
                                                        name="bankName"
                                                        className="form-control"
                                                        placeholder="Enter Bank Name"
                                                        type="text"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.bankName || ""}
                                                        invalid={
                                                            validation.touched.bankName && validation.errors.bankName ? true : false
                                                        }
                                                    />
                                                    {validation.touched.bankName && validation.errors.bankName ? (
                                                        <FormFeedback type="invalid">{validation.errors.bankName}</FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div>

                                                    <div className="mt-3">
                                                        <Label htmlFor="formFile" className="form-label">Aadhar Card</Label>
                                                        <Input className="form-control" type="file" id="aadharCard" onChange={(e) => { setAadharCard(e.target.files[0]) }} />
                                                    </div>
                                                    <div className="mt-3">
                                                        <Label htmlFor="formFile" className="form-label">Pan Card</Label>
                                                        <Input className="form-control" type="file" id="panCard" onChange={(e) => { setPanCard(e.target.files[0]) }} />
                                                    </div>
                                                    <div className="mt-3">
                                                        <Label htmlFor="formFile" className="form-label">User Photo</Label>
                                                        <Input className="form-control" type="file" id="userPhoto" onChange={(e) => { setUserPhoto(e.target.files[0]) }} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="d-flex justify-content-sm-center" style={{ padding: "15px" }}>
                                                        <Button
                                                            type="submit"
                                                            color="primary"
                                                            className="btn btn-primary btn-block">
                                                            Submit
                                                        </Button>

                                                    </div>
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
    }
    else {
        props.history.push("/dashboard");
    }

};

export default AddUser;
