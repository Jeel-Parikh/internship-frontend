import React, { useState, useEffect } from "react";
import { Container } from "reactstrap"
import { apiservice } from "service/apiservice";
import service from "service/constant";



const LeaveApplication = () => {

    const [leaves, setleaves] = useState([])
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const [type,setType] = useState("");
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

    

    let {_id} = JSON.parse(localStorage.getItem('user'))

    let handleSubmit = (e) => {
        e.preventDefault();
        console.log(startDate,endDate,type,reason)
        console.log(leaveDate, leaveReason);
        apiservice.callServicePostFormdata('/leave/'+_id ,{startDate:startDate,endDate:endDate,type:type,reason:reason} )
        // TODO : API Call for leave Application
    }
    let typeOfLeaves = {PL:'Parental Leave',EL:'Earned Leave',AL:'Annual Leave',CL:'Calsual Leave',SL:'Sick Leave',ML:'Maternity Leave'}

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
                        <div>
                        < input id="typeofleave" name="type" className="leaveDate" type="text" list="details" value={type}
                                                            placeholder="Select The type of leave"
                                                            onChange={(e) => { setType(e.target.value) }} />

                                                            <datalist id="details">
                                                                <option value="EL">Earned Leave</option>
                                                                <option value="AL">Annual Leave</option>
                                                                <option value="CL">Calsual Leave</option>
                                                                <option value="SL">Sick Leave</option>
                                                                <option value="ML">Maternity Leave</option>
                                                            </datalist>
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
                                    <div className="leaveDateWrapperHistory">
                                        <label className="leaveDateLabelHistory" htmlFor="leaveDate">Date</label>
                                        <p className="leaveDateHistory">{leave.startDate.slice(0, 10)}</p>
                                    </div>
                                    <div className="leaveDateWrapperHistory">
                                        <label className="leaveDateLabelHistory" htmlFor="leaveDate">Type</label>
                                        <p className="leaveDateHistory"> {typeOfLeaves[leave.type]}</p>
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
