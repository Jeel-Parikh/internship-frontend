import React, { useState, useEffect } from "react"
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Input,
    FormGroup,
    Label,
    Button,
} from "reactstrap";
import showToast from "helpers/Toast";


// Import Editor
import { Editor } from "react-draft-wysiwyg"
import { EditorState, convertToRaw } from "draft-js"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

//Import Date Picker
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { apiservice } from "../../service/apiservice"
import { TASK_ADD } from "service/url_helper"
import { getUrlWithId } from "service/url_helper"
import service from "service/constant";

const TasksAdd = () => {

    //meta title
    document.title = "Create Task | Skote - React Admin & Dashboard Template";

    const inpRow = [{ name: "", file: "" }]

    const [inputFields, setinputFields] = useState(inpRow);
    const [title, setTitle] = useState();
    const [email, setEmail] = useState();
    const [users, setUsers] = useState([]);
    const [description, setDescription] = useState();
    const [status, setStatus] = useState("inProgress");
    // const [editorState, setEditorState] = useState(EditorState.createEmpty())

    let fun = async () => {
        let res = await apiservice.callServiceGet("/user")
        setUsers(res.data.result)
    }
    useEffect(() => {
        fun()
    }, [])

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
    }

    // let handleSelect = async (id) => {

    // }


    // Function for Create Input Fields
    function handleAddFields() {
        const item1 = { name: "", file: "" }
        setinputFields([...inputFields, item1])
    }

    // Function for Remove Input Fields
    function handleRemoveFields(idx) {
        document.getElementById("nested" + idx).style.display = "none"
    }

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Tasks" breadcrumbItem="Create Task" />

                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <CardTitle className="mb-4">Create New Task</CardTitle>
                                    <form className="outer-repeater">
                                        <div data-repeater-list="outer-group" className="outer">
                                            <div data-repeater-item className="outer">

                                                <FormGroup className="mb-4" row>
                                                    <Label
                                                        htmlFor="userEmail"
                                                        className="col-form-label col-lg-2"
                                                    >
                                                        User Email
                                                    </Label>
                                                    <Col lg="10">
                                                        <input id="userEmail" name="userEmail" className="form-control" type="text" list="detail" value={email}
                                                            placeholder="Enter Employee Email..."
                                                            onChange={(e) => { setEmail(e.target.value) }} />
                                                        <datalist id="detail">
                                                            {
                                                                users.length !== 0 &&
                                                                users?.map(item => {
                                                                    return (
                                                                        <option data-value={item._id}>{item.email}</option>
                                                                    )
                                                                })
                                                            }

                                                        </datalist>
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup className="mb-4" row>

                                                    <Label
                                                        htmlFor="taskname"
                                                        className="col-form-label col-lg-2"
                                                    >
                                                        Title
                                                    </Label>
                                                    <Col lg="10">
                                                        <Input
                                                            id="taskname"
                                                            name="taskname"
                                                            type="text"
                                                            className="form-control"
                                                            value={title}
                                                            placeholder="Enter Task Name..."
                                                            onChange={(e) => { setTitle(e.target.value) }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup className="mb-4" row>
                                                    <Label className="col-form-label col-lg-2">
                                                        Description
                                                    </Label>
                                                    <Col lg="10">
                                                        <Input type="textarea" placeholder="Task description" name="description" id="description" onChange={(e) => { setDescription(e.target.value) }} />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <div className="mb-3">
                                                        <Label className="form-label" htmlFor="status">Status</Label>
                                                        <select className="form-control" name='status' onChange={(e) => { setStatus(e.target.value) }}
                                                        >
                                                            <option value="inProgress">In Progress</option>
                                                            <option value="completed">Complete</option>

                                                        </select>

                                                    </div>

                                                </FormGroup>


                                            </div>
                                        </div>
                                    </form>
                                    <Row className="justify-content-end">
                                        <Col lg="10">
                                            <Button type="submit" color="primary" onClick={(e) => {
                                                e.preventDefault();
                                                apiservice.callServicePostFormdata(getUrlWithId(TASK_ADD),
                                                    { title: title, description: description, status: status }).then(() => {
                                                        showToast("Success", 'Task added Successfully');
                                                        setTimeout(() => { window.location.href = 'http://localhost:4400/viewtasks' }, 500);

                                                    }).catch(() => { showToast("error", 'Something went wrong'); })
                                            }}>
                                                Add Task
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default TasksAdd;

