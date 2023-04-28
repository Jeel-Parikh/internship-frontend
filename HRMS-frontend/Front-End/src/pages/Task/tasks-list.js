import React, { useEffect, useState } from "react"
import { isEmpty, map, size } from "lodash"
import { Link, withRouter } from "react-router-dom"
import classNames from "classnames"
import { Card, CardBody, Collapse, CardTitle, Col, Container, Row } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import ReactApexChart from "react-apexcharts"
//Import Images
import images from "../../assets/images"
import { tasks } from "common/data/tasks"
import classnames from "classnames";
import Accordion from "reactstrap";
import service from "service/constant"
import UiTabsAccordions1 from "./accordion"
import { apiservice } from "service/apiservice"
import { TASK_ADD } from "service/url_helper"


import { options, series, statusClasses } from "common/data/tasks";


const TasksList = props => {
  //meta title
  document.title = "Task List | Skote - React Admin & Dashboard Template"


  const [activeTab1, setactiveTab1] = useState("5");
  const [activeTab2, setactiveTab2] = useState("1");
  const [activeTab3, setactiveTab3] = useState("1");
  const [verticalActiveTab, setverticalActiveTab] = useState("1");
  const [verticalActiveTabWithIcon, setverticalActiveTabWithIcon] =
    useState("1");
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const [customIconActiveTab, setcustomIconActiveTab] = useState("1");
  const [col1, setcol1] = useState(true);
  const [col2, setcol2] = useState(false);
  const [col3, setcol3] = useState(false);

  const [col5, setcol5] = useState(true);
  const [col6, setcol6] = useState(true);
  const [col7, setcol7] = useState(true);

  const [col8, setcol8] = useState(true);
  const [col9, setcol9] = useState(true);
  const [col10, setcol10] = useState(false);
  const [col11, setcol11] = useState(false);



  const t_col9 = () => {
    setcol9(!col9);
    setcol10(false);
    setcol11(false);
  };
  const t_col10 = () => {
    setcol10(!col10);
    setcol9(false);
    setcol11(false);
  };
  let user = JSON.parse(localStorage.getItem('user'))
  const [res, setRes] = useState();
  const [fullResponse, setFullResponse] = useState();

  let responseTask = () => {
    apiservice.callServiceGet(TASK_ADD + "/" + user._id).then((reply) => {
      console.log(reply);
      setFullResponse(reply.data.result);

      let response = reply.data.result[0].task;
      console.log("==-=     this is response from get task", reply.data.result);
      setRes(response);
    }).catch((e) => { console.log("error occured", e) })
// console.log(props);
//     setRes(props.task)

  }
  // responseTask();
  useEffect(() => {
    responseTask();
  }, [])



  return (


    <React.Fragment>


      <Container fluid>
        <Breadcrumbs title="Tasks" breadcrumbItem="Task List" />
        <br></br>
        <Row>
          <Col lg={12}>
            {map(fullResponse, (responses) => (
              <Card key={responses.date}>
                {console.log(new Date(responses.date).toISOString().split('T')[0])}
                <CardBody>
                  <CardTitle className="mb-4">{new Date(responses.date).toISOString().split('T')[0]}
                  </CardTitle>
                  <div className="table-responsive">
                    <table className="table table-nowrap align-middle mb-0">
                      <tbody>
                        {responses.task.map((task) => (
                          <tr key={task.date}>
                            {/* <td >
                              <div>
                                {user.name}
                              </div>
                            </td>
                            <td>
                            </td>
                            <td>
                              <div className="team">
                                <img className='rounded-circle avatar-sm' src={service.API_URL + user.userPhoto}
                                />
                              </div>
                            </td> */}
                            <td>
                              <UiTabsAccordions1 id={task._id} title={task.title} description={task.description} time={task.date} status={task.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </CardBody>
              </Card>
            ))}
          </Col>

        </Row>
      </Container>

    </React.Fragment >
  )
}

export default withRouter(TasksList)
