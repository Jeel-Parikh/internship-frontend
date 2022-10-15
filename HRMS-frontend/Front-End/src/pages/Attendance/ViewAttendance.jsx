import { apiservice } from 'apiservice';
import { now } from 'lodash';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {
    Container,
} from "reactstrap"
const ViewAttendance = () => {

    let { _id } = JSON.parse(localStorage.getItem("user"))
    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
    // function getDayName(dateStr, locale) {
    //     var date = new Date(dateStr);
    //     return date.toLocaleDateString(locale, { weekday: 'long' });
    // }
    // var dateStr = '01/2/2022';
    // var day = getDayName(dateStr, "nl-NL");

    // console.log(firstOfMonth.getDay());

    let [month, setmonth] = useState("2022-10")
    let [dateobj, setdateobj] = useState({})
    let [daysarr, setdaysarr] = useState([])
    let fetchdate = async (d) => {
        console.log("this is date", d);
        let o = {}
        let totaldays = daysInMonth(d.split("-")[1], d.split("-")[0])
        for (let i = 1; i <= totaldays; i++) {
            o[i] = false
        }
        let res = await apiservice.callServiceGet(`/attendance/${_id}/${d.split("-")[0]}/${d.split("-")[1]}`);
        console.log("this is reponce after fetchdate", res.data.firstDay);
        let datearr = new Array(res.data.firstDay).fill(0);
        for (let i = 1; i <= totaldays; i++) {
            datearr.push(i)
        }
        for (let i = datearr.length; i < 42; i++) {
            datearr.push(0)
        }
        console.log("lebgth", datearr);

        console.log(datearr);
        for (let i in res.data.result) {
            o[i] = res.data.result[i]
        }
        console.log("final o", o);
        setdateobj(o)
        setdaysarr(datearr)
    }
    let handlechangemonth = async (e) => {
        console.log("heyye", e.target.value);
        setmonth(e.target.value)
        let res = await fetchdate(e.target.value)
        console.log("this is after fetch of date", res);
    }


    useEffect(() => {
        fetchdate("2022-10")

    }, [])
    return (
        <div>
            <div className="page-content attendance-container">
                <Container fluid>

                    <div className='attendace-grid'>
                        <div>Sunday</div>
                        <div>Monday</div>
                        <div>Tuseday</div>
                        <div>Wednessday</div>
                        <div>Thursday</div>
                        <div>Friday</div>
                        <div>Saturday</div>
                        {
                            daysarr.map(item => {
                                if (item === 0) {
                                    return (
                                        <div className='att-box' style={{ background: "gray" }}></div>
                                        )
                                    }else{
                                       return (
                                           dateobj[item]?
                                           <div className='att-box' style={{ background: "green" }}>{item}</div>:
                                           <div className='att-box' style={{ background: "red" }}>{item}</div>
                                           )
                                }
                            })
                        }

                    </div>
                    <div className='month-selcter'>
                        <input type="month" value={month} onChange={handlechangemonth} />
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default ViewAttendance
