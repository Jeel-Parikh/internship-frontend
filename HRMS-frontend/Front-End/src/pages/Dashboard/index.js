import React from "react"
import {
  Card,
  CardBody,
  Container,
} from "reactstrap"
import WelcomeComp from "./WelcomeComp";
const Dashboard = (props) => {
  //meta title
  document.title = "Dashboard | Hrms@Pyther";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Dashboard</h4>
          <div>
            <Card>
              <CardBody>
                <WelcomeComp />
              </CardBody>
            </Card>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
