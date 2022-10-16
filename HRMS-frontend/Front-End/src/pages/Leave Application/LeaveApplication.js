import React, { useState, useEffect } from "react";
import { Container } from "reactstrap"
import { apiservice } from "service/apiservice";
import service from "service/constant";



const LeaveApplication = () => {

    const [leaves, setleaves] = useState([])
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const [title,setTitle] = useState("");
    const [reason,setReason] = useState("")
    

    let callApi = async () => {
        let res = await apiservice.callServiceGet("/leave/"+_id)
        setleaves(res.data.result);
        console.log(res.data.result);
    }

    useEffect(() => {
        callApi()
    }, []);

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

    let {_id} = JSON.parse(localStorage.getItem('user'))

    let handleSubmit = (e) => {
        e.preventDefault();
        console.log(startDate,endDate,title,reason)
        console.log(leaveDate, leaveReason);
        apiservice.callServicePostFormdata('/leave/'+_id ,{startDate:startDate,endDate:endDate,title:title,reason:reason} )
        // TODO : API Call for leave Application
    }

    return (
        <>
        
            <div className="page-content">
                <Container fluid>
                    <h2> Apply for Leave </h2>
                    
                    <div className="applyLeaveWrapper">
                        <div className="leaveDateWrapper">
                            <label className="leaveDateLabel" htmlFor="leaveDate">StartDate</label>
                            <input className="leaveDate" name="startDate" value={startDate} onChange={(e)=>{
                                setStartDate(e.target.value)
                            }} type="date" />

                            <label className="leaveDateLabel" htmlFor="leaveDate">EndDate</label>
                            <input className="leaveDate" name="endDate" value={endDate} onChange={(e)=>{
                                setEndDate(e.target.value)
                            }} type="date" />
                        </div>
                        <div className="leaveReasonWrapper">
                            <label className="leaveReasonLabel" htmlFor="leaveReason">Title</label>
                            <input className="leaveReason" name = "title" value={title} onChange={(e)=>{
                                setTitle(e.target.value)}} type="text" />
                        </div>
                        
                        
                        <div className="leaveReasonWrapper">
                            <label className="leaveReasonLabel" htmlFor="leaveReason">Reason</label>
                            <input className="leaveReason" name = "reason" value={reason} onChange={(e)=>{
                                setReason(e.target.value)}} type="text" />
                        </div>
                        <button className="leaveBtn" type="submit" onClick={handleSubmit} style={{"margin-bottom":10}}>Submit</button>
                        <br></br>
                    </div>
                    </Container>
            

                    <div>
                        
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    
                    <h2> Show My applications </h2>
                        {leaves.map(leave => {
                            return (
                                <div className="leaveCard">
                                    <div className="leaveDateWrapperHistory">
                                        <label className="leaveDateLabelHistory" htmlFor="leaveDate">Date</label>
                                        <p className="leaveDateHistory">{leave.startDate.slice(0, 10)}</p>
                                    </div>
                                    <div className="leaveReasonWrapperHistory">
                                        <label className="leaveReasonLabelHistory" htmlFor="leaveReason">Reason</label>
                                        <p className="leaveReasonHistory">{leave.reason}</p>
                                    </div>
                                    <div className="leaveStatus">
                                        <h5>{leave.admin_response}</h5>
                                    </div>
                                </div>)})}
                   
                    </div>
                    
                    
                    
                </div>
        </>
    )
}

export default LeaveApplication
