import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  Badge,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Collapse,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

import { Link } from "react-router-dom";
import "../../index.css"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import classnames from "classnames";
import { apiservice } from "service/apiservice";
function UiTabsAccordions1(props) {
  console.log("props", props)

  //meta title
  document.title = "Tabs & Accordions | Skote - React Admin & Dashboard Template";

  const [col9, setcol9] = useState(true);
  const [col10, setcol10] = useState(false);

  const [taskStatus, setTaskStatus] = useState(props.status)

  const t_col9 = () => {
    setcol9(!col9);
    setcol10(false);
    // setcol11(false);
  };
  const t_col10 = () => {
    setcol10(!col10);
    setcol9(false);
    // setcol11(false);
  };

  let handleTaskStatus = async () => {
    // console.log("!!!!!!!!!!!!!!!!!!!", taskStatus)
    // callServicePut(`/task/${id}`)
    let res = await apiservice.callServicePut(`/task/${props.id}`, { status: taskStatus })
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!@", res.data.response)
    if (res.data.response) {
     if (taskStatus == "inProgress") {
      setTaskStatus("completed")
    }
    else { 
      setTaskStatus("inProgress")
    } 
    }
    else {
      alert("Something went wrong!")
    }
  }


  return (
    <React.Fragment>

      <Container fluid={true}>
        
        <Row>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingFlushTwo">
                        <button
                          className={classnames(
                            "accordion-button",
                            "fw-medium",
                            { collapsed: !col10 }
                          )}
                          type="button"
                          onClick={t_col10}
                          style={{ cursor: "pointer" }}
                        >{props.title}

                        </button>
                      </h2>

                      <Collapse
                        isOpen={col10}
                        className="accordion-collapse"
                      >
                        <div className="accordion-body">
                          <div className="text-muted">
                            <strong className="text-dark">
                              {props.title}
                            </strong>{" "}
                            {props.description}
                            <p>{new Date(props.time).toLocaleTimeString('en-US')}
                              <br />
                              <strong> {taskStatus} </strong>
                              <div className="switch-button" onClick={()=>{handleTaskStatus()}}>
                                <input className="switch-button-checkbox" type="checkbox"></input>
                                <label className="switch-button-label" htmlFor="">
                                  <span className="switch-button-label-span">inProgress</span>
                                </label>
                              </div>
                            </p>
                          </div>
                        </div>
                      </Collapse>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Row>
      </Container>

    </React.Fragment >
  );
}
export default UiTabsAccordions1;