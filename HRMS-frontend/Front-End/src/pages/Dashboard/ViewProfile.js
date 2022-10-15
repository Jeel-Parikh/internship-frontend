import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
} from "reactstrap"

import Editable from "react-bootstrap-editable"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { userSchema } from "helpers/validationSchemas";
// import { useState } from "react"

function ViewProfile() {
  // const [user,setUser]=useState();

  //meta title
  document.title = "View Profile | HRMS ";
  let user = localStorage.getItem('user');

  user = JSON.parse(user);
  const [name, setName] = useState(user.name);
  const [contactNumber, setContactNumber] = useState(user.contactNumber);
  const [dob, setDob] = useState();
  const [address, setAddress] = useState();
  const [bankAccount, setBankAccount] = useState();
  const [bankName, setBankName] = useState();
  const [ifsc, setIfsc] = useState();

  //  console.log(user);
  // setUser(obj);
  // console.log(user);

  /** Confirm button */
  const confirmElement = (
    <button type="submit" className="btn btn-success editable-submit btn-sm me-1"><i className="mdi mdi-check"></i></button>
  );

  /** Cancel button */
  const cancelElement = (
    <button type="button" className="btn btn-danger editable-cancel btn-sm"><i className="mdi mdi-close"></i></button>
  );
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="profile" breadcrumbItem="View Profile" />

          <Row>
            <Col>
              <Card>
                <CardBody>

                  <div className="table-responsive">
                    <Table responsive striped className="table-nowrap mb-0">

                      <tbody>
                        <tr>
                          <td>Name</td>
                          <td>

                            <Editable
                              ajax={null}
                              alwaysEditing={false}
                              className={null}
                              disabled={false}
                              initialValue={user.name}
                              onChange={(e) => { setName(e.target.value) }}
                              id={null}
                              isValueClickable={false}
                              label={null}
                              mode="inline"
                              onSubmit={null}
                              onValidated={null}
                              placement="top"
                              showText
                              type="textfield"
                              // validate={userSchema.validate.address}
                              renderConfirmElement={confirmElement}
                              renderCancelElement={cancelElement} />

                            {/* </Editable> */}

                          </td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td>
                            <p>{user.email}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>Contact Number</td>
                          <td>
                            <Editable
                              ajax={null}
                              alwaysEditing={false}
                              className={null}
                              disabled={false}
                              initialValue={user.contactNumber}
                              onChange={(e) => { setContactNumber(e.target.value) }}
                              id={null}
                              isValueClickable={false}
                              label={null}
                              mode="inline"
                              onSubmit={null}
                              onValidated={null}
                              placement="top"
                              showText
                              type="textfield"
                              validate={userSchema.validate.address}
                              renderConfirmElement={confirmElement}
                              renderCancelElement={cancelElement}
                            />
                          </td>
                        </tr>

                        <tr>
                          <td>Date of Birth</td>
                          <td>
                            <Editable
                              ajax={null}
                              alwaysEditing={false}
                              className={null}
                              disabled={false}
                              initialValue={new Date(user.joiningDate).toISOString().split('T')[0]}
                              id={null}
                              isValueClickable={false}
                              label={null}
                              onChange={(e) => { setDob(e.target.value) }}
                              mode="inline"
                              onSubmit={null}
                              onValidated={null}
                              placement="top"
                              showText
                              type="date"
                              validate={null}
                              renderConfirmElement={confirmElement}
                              renderCancelElement={cancelElement}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Address</td>
                          <td>
                            <Editable
                              ajax={null}
                              alwaysEditing={false}
                              className={null}
                              disabled={false}
                              initialValue={user.address}
                              onChange={(e) => { setAddress(e.target.value) }}
                              id={null}
                              isValueClickable={false}
                              label={null}
                              mode="inline"
                              onSubmit={null}
                              onValidated={null}
                              placement="top"
                              showText
                              type="textarea"
                              validate={userSchema.validate.address}
                              renderConfirmElement={confirmElement}
                              renderCancelElement={cancelElement}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Joining Date</td>
                          <td>
                            <p>{new Date(user.joiningDate).toISOString().split('T')[0]}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>Designation</td>
                          <td>
                            <p>{user.designation}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>BankName</td>
                          <td>
                            <Editable
                              ajax={null}
                              alwaysEditing={false}
                              className={null}
                              disabled={false}
                              initialValue={user.bankName}
                              id={null}
                              isValueClickable={false}
                              label={null}
                              mode="inline"
                              onSubmit={null}
                              onValidated={null}
                              onChange={(e) => { setAddress(e.target.value) }}
                              placement="top"
                              showText
                              type="textfield"
                              validate={userSchema.validate.address}
                              renderConfirmElement={confirmElement}
                              renderCancelElement={cancelElement}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>IFSC</td>
                          <td>
                            <Editable
                              ajax={null}
                              alwaysEditing={false}
                              className={null}
                              disabled={false}
                              initialValue={user.ifsc}
                              onChange={(e) => { setIfsc(e.target.value) }}
                              id={null}
                              isValueClickable={false}
                              label={null}
                              mode="inline"
                              onSubmit={null}
                              onValidated={null}
                              placement="top"
                              showText
                              type="textfield"
                              validate={userSchema.validate.address}
                              renderConfirmElement={confirmElement}
                              renderCancelElement={cancelElement}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Bank AC No.</td>
                          <td>
                            <Editable
                              ajax={null}
                              alwaysEditing={false}
                              className={null}
                              disabled={false}
                              initialValue={user.bankAccount}
                              onChange={(e) => { setBankAccount(e.target.value) }}
                              id={null}
                              isValueClickable={false}
                              label={null}
                              mode="inline"
                              onSubmit={null}
                              onValidated={null}
                              placement="top"
                              showText
                              type="textfield"
                              validate={userSchema.validate.address}
                              renderConfirmElement={confirmElement}
                              renderCancelElement={cancelElement}
                            />
                          </td>
                        </tr>



                      </tbody>
                    </Table>

                  </div>
                </CardBody>

              </Card>
              <div className="d-flex justify-content-sm-center">
                <Button
                  type="submit"
                  color="primary"
                  className="btn btn-primary btn-block">
                  Update
                </Button>

              </div>

            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ViewProfile;