  <>
  <div className="d-lg-flex ">
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
                                                    />
                                                    <i className="bx bx-search-alt search-icon" />
                                                </div>
                                            </div>

                                            <div className="chat-leftsidebar-nav">

                                                <div>
                                                    <h5 className="font-size-14 mb-3"></h5>
                                                    <ul className="list-unstyled chat-list" id="recent-list">
                                                        <PerfectScrollbar style={{ height: "410px" }}>
                                                            {map(users, (user) => (


                                                                <li
                                                                    key={user._id}

                                                                >
                                                                    <Link
                                                                        onClick={async () => {
                                                                            let response = await apiservice.callServiceGet(TASK_ADD + "/" + user._id);
                                                                            response = response.data.result[0].task;
                                                                            console.log("==-=", response);
                                                                            setRes(response);
                                                                        }}

                                                                    >
                                                                        <div className="d-flex">
                                                                            <div className="align-self-center me-3">

                                                                            </div>

                                                                            <div className="align-self-center me-3">
                                                                                <img

                                                                                    src={service.API_URL + user.userPhoto}
                                                                                    className="rounded-circle avatar-xs"
                                                                                    alt=""
                                                                                />
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
                                </div>
                                <div className="w-50 user-chat">
                                    <Card>
                                        <div className="p-4 border-bottom ">
                                            <Row>
                                                <Col md="4" xs="9">
                                                    <h5 className="font-size-15 mb-1">

                                                    </h5>

                                                </Col>
                                            </Row>
                                        </div>

                                        <div>
                                            <div className="chat-conversation p-3">
                                                <ul className="list-unstyled">
                                                    <PerfectScrollbar
                                                        style={{ height: "470px", }}

                                                    >
                                                        <li>
                                                            <div className="chat-day-title">
                                                                <span className="title">Today</span>
                                                            </div>
                                                        </li>
                                                        {res &&
                                                            map(res, task => (
                                                                <li
                                                                    key={task.title}

                                                                >
                                                                    <div className="conversation-list">
                                                                        <div className="ctext-wrap">
                                                                            <div className="conversation-name">
                                                                                {task.title}
                                                                            </div>
                                                                            <p>{task.description}</p>
                                                                            {/* <p className="chat-time mb-0">
                                                                            <i className="bx bx-time-five align-middle me-1" />
                                                                            {moment(message.createdAt).format(
                                                                                "DD-MM-YY hh:mm"
                                                                            )}
                                                                        </p> */}
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                    </PerfectScrollbar>
                                                </ul>
                                            </div>
                                            <div className="p-3 chat-input-section">
                                            </div>
                                        </div>
                                    </Card>

                                </div>
                                <div className="mt-5">
                        <h5 className="font-size-14">Soft Badge</h5>
                        <Badge pill className="badge-soft-primary ms-1">
                          Primary
                        </Badge>
                        <Badge pill className="badge-soft-success me-1">
                          Success
                        </Badge>
                        <Badge pill className="badge-soft-info me-1">
                          Info
                        </Badge>
                        <Badge pill className="badge-soft-warning me-1">
                          Warning
                        </Badge>
                        <Badge pill className="badge-soft-danger me-1">
                          Danger
                        </Badge>
                        <Badge pill className="badge-soft-dark me-1">
                          Dark
                        </Badge>
                      </div>


  </>