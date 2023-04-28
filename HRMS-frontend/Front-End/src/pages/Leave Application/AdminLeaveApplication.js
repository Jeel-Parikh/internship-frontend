import { apiservice } from 'apiservice'
import React, { Component } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button, Label } from 'reactstrap'


function AdminLeaveApplication() {
    const [LeaveApplications, setLeaveApplications] = useState([])
    const [response, setResponse] = useState({})
    useEffect(() => {

        apiservice.callServiceGet('/leave/').then((res) => {
            console.log("===============", JSON.parse(res.data.result));
            setLeaveApplications(JSON.parse(res.data.result))
        })

    }, [])

    return (
        <>

            <div className="page-content">
                <br></br>
                <br></br>
                <h2> Show applications </h2>
                {LeaveApplications.map(leave => {
                    // console.log(leave)
                    return (
leave.admin_response==="pending"&&
                        <div className="leaveCard">
                            <div className="leaveDateWrapperHistory">
                                <label className="leaveDateLabelHistory" htmlFor="name">Name: </label>
                                <p className="leaveDateHistory" name="name">{leave?.userId?.name}</p>
                            </div>
                            <div className="leaveDateWrapperHistory">
                                <label className="leaveDateLabelHistory" htmlFor="email">Email:</label>
                                <p className="leaveDateHistory" name="email">{leave?.userId?.email}</p>
                            </div>

                            <div className="leaveDateWrapperHistory">
                                <label className="leaveDateLabelHistory" htmlFor="leaveDate">Start Date:</label>
                                <p className="leaveDateHistory">{leave?.startDate?.slice(0, 10)}</p>
                            </div>
                            <div className="leaveDateWrapperHistory">
                                <label className="leaveDateLabelHistory" htmlFor="leaveDate">End Date:</label>
                                <p className="leaveDateHistory">{leave?.endDate?.slice(0, 10)}</p>
                            </div>

                            <div className="leaveReasonWrapperHistory">
                                <label className="leaveReasonLabelHistory" htmlFor="leaveReason">Reason</label>
                                <p className="leaveReasonHistory">{leave?.reason}</p>
                            </div>
                            <div className="mb-3">
                                <select id={`adminResponse-${leave._id}`} name="response" className=""  list="details" 
                                // value={response}
                                    placeholder="Enter Response"
                                    // onChange={(e) => { setResponse(e.target.value) }} 
                                    >

                                {/* <datalist id="details"> */}
                                    <option value="pending" defaultChecked>pending</option>
                                    <option value="approved">approved</option>
                                    <option value="denied">denied</option>
                                    </select>
                                {/* </datalist> */}

                                {/* <Label className="form-label" htmlFor="status">Response</Label>
                                 <div className="col-md-10">
                              <select className="form-control" name='status' onChange={(e)=>{
                                setResponse(e.target.value)
                              }}
                            value={leave.admin_response || "pending"}>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="denied">Denied</option>
                            
                          </select> */}
                                {/* </div> */}
                                <button className="leaveBtn" type="submit" onClick={(e) => {
                                    e.preventDefault();
                                    console.log("this is selcted ",document.getElementById(`adminResponse-${leave._id}`).value);
                                    apiservice.callServicePut('/leave/' + leave._id, { admin_response: document.getElementById(`adminResponse-${leave._id}`).value })
                                }} style={{ "margin-bottom": 10 }}>Update</button>

                            </div>
                        </div>

                    )
                })}

            </div>


        </>
    )
}
export default AdminLeaveApplication;