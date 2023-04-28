import React, { Component, useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { apiservice } from 'service/apiservice';
import { getUrlWithId, USERS } from 'service/url_helper';
import { TASK_ADD } from 'service/url_helper';


import {
    Badge,
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    Input,
    InputGroup,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
    UncontrolledDropdown,
    UncontrolledTooltip,
} from "reactstrap";
import classnames from "classnames";
import service from 'service/constant';

function ViewTask(props) {
    const [users, setUser] = useState();
    const [allUsers, setAllUser] = useState();
    const [res, setRes] = useState();
    const [search, setSearch] = useState("");
    const [fullResponse, setFullResponse] = useState();


    useEffect(() => {
        console.log(localStorage.getItem('token'));
        apiservice.callServiceGet(USERS)
            .then((user) => {
                // console.log(user);
                console.log(user.data.result);
                setUser(user.data.result);
                // console.log(allUsers);
                // let temp = allUsers.filter((user) => (user.contactNumber));
                // console.log(temp);
                // setUser(temp);
            })
            .catch((e) => { console.log(e) })
console.log("this is page");
    }, [])
    // useEffect(()=>{
    //     let temp = users.filter((user)=>{user.name === search});
    //     setUser(temp);

    // },[search])


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg="12">
                            <div className="d-lg-flex">
                                <div className="chat-leftsidebar me-lg-4">
                                    <div >

                                        <div className="search-box chat-search-box py-4">
                                            <div className="position-relative">
                                                <Input
                                                    // onKeyUp={searchUsers}
                                                    id="search-user"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search..."
                                                    onChange={(e) => (setSearch(e.target.value))}
                                                />
                                                <i className="bx bx-search-alt search-icon" />
                                            </div>
                                        </div>

                                        <div className="chat-leftsidebar-nav">
                                            {/* <Nav pills justified>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "1",
                            })}
                            onClick={() => {
                              toggleTab("1");
                            }}
                          >
                            <i className="bx bx-chat font-size-20 d-sm-none" />
                            <span className="d-none d-sm-block">Chat</span>
                          </NavLink>
                        </NavItem>
                      </Nav> */}
                                            <div>
                                                <h5 className="font-size-14 mb-3"></h5>
                                                <ul className="list-unstyled chat-list" id="recent-list">
                                                    <PerfectScrollbar style={{ height: "410px" }}>
                                                        {map(users, (user) => (
                                                            <li
                                                                key={user._id}
                                                            >
                                                                <Link
                                                                to="#"
                                                                    onClick={() => {
                                                                        apiservice.callServiceGet(TASK_ADD + "/" + user._id).then((reply) => {
                                                                            console.log(reply);
                                                                            setFullResponse(reply.data.result);

                                                                            let response = reply.data.result[0].task;
                                                                            console.log("==-=", response);
                                                                            setRes(response);

                                                                        })
                                                                    }}
                                                                >
                                                                    <div className="d-flex">
                                                                        <div className="align-self-center me-3">

                                                                        </div>

                                                                        <div className="align-self-center me-3">
                                                                            {!user.userPhoto ? (
                                                                                <div className="avatar-sm mx-auto mb-4">
                                                                                    <span
                                                                                        className={
                                                                                            "avatar-title rounded-circle bg-soft bg-" +
                                                                                            user.color +
                                                                                            " text-" +
                                                                                            user.color +
                                                                                            " font-size-16"
                                                                                        }
                                                                                    >
                                                                                        {user.name.charAt(0)}
                                                                                    </span>
                                                                                </div>
                                                                            ) : (
                                                                                <div className="mb-4">
                                                                                    <img
                                                                                        className="rounded-circle avatar-sm"
                                                                                        src={service.API_URL + user.userPhoto}
                                                                                        alt=""
                                                                                    />
                                                                                </div>
                                                                            )}
                                                                        </div>

                                                                        <div className="flex-grow-1 overflow-hidden">
                                                                            <h5 className="text-truncate font-size-14 mb-1">
                                                                                {user.name}
                                                                            </h5>
                                                                            <p className="text-truncate mb-0">
                                                                                {user.designation}
                                                                            </p>
                                                                        </div>

                                                                    </div>
                                                                </Link>
                                                            </li>))}
                                                    </PerfectScrollbar>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-100 user-chat">
                                    <Card>
                                        <div className="p-4 border-bottom ">
                                            <Row>
                                                <Col md="4" xs="9">
                                                    <h5 className="font-size-15 mb-1">
                                                        {/* {user.name} */}
                                                    </h5>

                                                </Col>
                                            </Row>
                                        </div>

                                        <div>
                                            {map(fullResponse, (responses) => (
                                                <Card key={responses.date}>
                                                    {console.log(new Date(responses.date).toISOString().split('T')[0])}
                                                    <CardBody>
                                                        <CardTitle className="mb-4">{new Date(responses.date).toISOString().split('T')[0]}
                                                        </CardTitle>

                                                        <div className="chat-conversation p-3">
                                                            <ul className="list-unstyled">
                                                                <PerfectScrollbar
                                                                    // style={{ height: "470px" }}
                                                                // containerRef={ref => setMessageBox(ref)}
                                                                >

                                                                    {responses &&
                                                                        map(responses.task, task => (
                                                                            <li
                                                                                key={task.title}

                                                                            >
                                                                                <div className="card">
                                                                                    <div className="card-body">

                                                                                        {task.title}

                                                                                        <pre>{task.description}</pre>
                                                                                        <p className="chat-time mb-0">
                                                                                            <i className="bx bx-time-five align-middle me-1" />
                                                                                            {new Date(task.date).toLocaleTimeString('en-US')
                                                                                            }
                                                                                            <br />

                                                                                            <strong>{task.status}</strong>





                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        ))}
                                                                </PerfectScrollbar>
                                                            </ul>
                                                        </div>
                                                    </CardBody>
                                                </Card>))}
                                            <div className="p-3 chat-input-section">
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>

                        </Col>
                    </Row>

                </Container>
            </div>





        </React.Fragment>
    )

}
export default ViewTask;