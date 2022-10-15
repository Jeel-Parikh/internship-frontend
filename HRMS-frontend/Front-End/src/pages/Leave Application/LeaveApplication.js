import React, { useState } from "react";
import { Container } from "reactstrap"



const LeaveApplication = () => {
    const [leaveDate, setleaveDate] = useState("")
    const [leaveReason, setleaveReason] = useState("")

    let handleChangeDate = (e) => {
        // console.log(e.target.value);
        setleaveDate(e.target.value)
    }

    let handleChangeReason = (e) => {
        // console.log(e.target.value);
        setleaveReason(e.target.value)
    }

    let handleSubmit = () => {
        console.log(leaveDate, leaveReason);
        // TODO : API Call for leave Application
    }

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <h2> Apply for Leave </h2>
                    <div className="applyLeaveWrapper">
                        <div className="leaveDateWrapper">
                            <label className="leaveDateLabel" htmlFor="leaveDate">Date</label>
                            <input className="leaveDate" value={leaveDate} onChange={handleChangeDate} type="date" />
                        </div>
                        <div className="leaveReasonWrapper">
                            <label className="leaveReasonLabel" htmlFor="leaveReason">Reason</label>
                            <input className="leaveReason" value={leaveReason} onChange={handleChangeReason} type="text" />
                        </div>
                        <button className="leaveBtn" type="submit" onClick={handleSubmit}>Submit</button>
                    </div>


                    <div className="leaveHistory">
                        <h2> Show applications </h2>
                        <div className="leaveCard">
                            <div className="leaveDateWrapperHistory">
                                <label className="leaveDateLabelHistory" htmlFor="leaveDate">Date</label>
                                <p className="leaveDateHistory">Date is displayed here</p>
                            </div>
                            <div className="leaveReasonWrapperHistory">
                                <label className="leaveReasonLabelHistory" htmlFor="leaveReason">Reason</label>
                                <p className="leaveReasonHistory">Reason is displayed here</p>
                            </div>
                            <div className="leaveStatus">
                                <h5>Not Accepted</h5>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default LeaveApplication
