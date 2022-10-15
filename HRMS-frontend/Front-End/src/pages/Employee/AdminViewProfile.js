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
import service from  "service/constant.js"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { userSchema } from "helpers/validationSchemas";
import { apiservice } from "apiservice";
import axios from "axios";
// import { useState } from "react"

function AdminViewProfile() {
//   console.log(props)
  document.title = "View Profile | HRMS ";
  let user = localStorage.getItem('profile-employee')

  
  
//   user = JSON.parse(user);
  console.log("--------------->",typeof user)
  const [name, setName] = useState(user.name);
  const [contactNumber, setContactNumber] = useState(user.contactNumber);
  const [dob, setDob] = useState();
  const [address, setAddress] = useState();
  const [bankAccount, setBankAccount] = useState();
  const [bankName, setBankName] = useState();
  const [ifsc, setIfsc] = useState();
  const [userDetails,setUserDetails] = useState({})

  apiservice.callServiceGet("/user/"+user).then((res)=>{
    
    console.log("-------->",res.data);
    console.log(res.data.result._id)

    setUserDetails(res.data.result);


})
  

    // apiservice.callServiceGet(service.API_URL+userdata._id,)
  
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
                            {userDetails.name}

                            
                          </td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td>
                            <p>{userDetails.email}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>Contact Number</td>
                          <td>
                            {userDetails.contactNumber}
                               </td>
                        </tr>

                        <tr>
                          <td>Date of Birth</td>
                          <td>
                            {userDetails.dob}
                           </td>
                        </tr>
                        <tr>
                          <td>Address</td>
                          <td>
                            {userDetails.address}
                             </td>
                        </tr>
                        <tr>
                          <td>Joining Date</td>
                          <td>
                            <p>{userDetails.joiningDate}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>Designation</td>
                          <td>
                            <p>{userDetails.designation}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>BankName</td>
                          <td>
                            {userDetails.bankName}
                            
                          </td>
                        </tr>
                        <tr>
                          <td>IFSC</td>
                          <td>
                            {userDetails.ifsc}
                           
                          </td>
                        </tr>
                        <tr>
                          <td>Bank AC No.</td>
                          <td>
                            {userDetails.bankAccount}
                               </td>
                        </tr>



                      </tbody>
                    </Table>

                  </div>
                </CardBody>

              </Card>
             
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}


export default AdminViewProfile;