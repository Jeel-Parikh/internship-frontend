import { now } from 'lodash';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import {
    Container,
} from "reactstrap"
const ViewAttendance = () => {

    let { id } = useParams()
    function daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }
    console.log("date",daysInMonth(2,2022));
    function getDayName(dateStr, locale)
{
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}
var dateStr = '01/2/2022';
var day = getDayName(dateStr, "nl-NL");

// console.log(firstOfMonth.getDay());

console.log();
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
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div> 
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                    <div className='att-box'>hey</div>
                </div>

                </Container>
            </div>
        </div>
    )
}

export default ViewAttendance
