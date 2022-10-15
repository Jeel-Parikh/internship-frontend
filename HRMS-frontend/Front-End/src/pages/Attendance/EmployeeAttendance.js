// src/components/filter.
import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

//import components
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableContainer from "../../components/Common/TableContainer";
import { apiservice } from "service/apiservice";
import { USERS } from "service/url_helper";
import { get, reject } from "lodash";

const Attendance = () => {
  const [users, setUser] = useState();
  
  useEffect(() => {
    console.log("Use Effect")
    console.log(localStorage.getItem('token'));
    apiservice.callServiceGet(USERS)
      .then((user) => {
        console.log(user.data.result);
        setUser(user.data.result)
      })
      .catch((e) => { console.log(e) })

  }, [])

  let data;
  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: () => {
          return <input type="checkbox" />;
        },
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Designation",
        accessor: "designation",
      },
      {
        Header: "email address",
        accessor: "email",
      },
    ],
    []
  );

  data = [
    
  ];
  // data = users;

  //meta title
  document.title = "Attendance | HRMS";
        return (
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs title="Tables" breadcrumbItem="Data Tables" />
            {
              users?<TableContainer
              columns={columns}
              data={users}
              isGlobalFilter={true}
              isAddOptions={true}
              customPageSize={10}
              className="custom-header-css"
            />:
            <TableContainer
              columns={columns}
              data={data}
              isGlobalFilter={true}
              isAddOptions={true}
              customPageSize={10}
              className="custom-header-css"
            />
            }
            
            

            
          </div>
        </div>
        )
   
};
Attendance.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default Attendance;
