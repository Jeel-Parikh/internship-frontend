import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import { Table, Row, Col, Button, Input } from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filters";
import { apiservice } from "apiservice";
import showToast from "helpers/Toast";
import DatePicker from 'react-date-picker';
import { format } from 'date-fns'
// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Col sm={4}>
      <div className="search-box me-2 mb-2 d-inline-block">
        <div className="position-relative">
          <label htmlFor="search-bar-0" className="search-label">
            <span id="search-bar-0-label" className="sr-only">
              Search this table
            </span>
            <input
              onChange={e => {
                setValue(e.target.value);
                onChange(e.target.value);
              }}
              id="search-bar-0"
              type="text"
              className="form-control"
              placeholder={`${count} records...`}
              value={value || ""}
            />
          </label>
          <i className="bx bx-search-alt search-icon"></i>
        </div>
      </div>
    </Col>
  );
}

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  isAddOptions,
  isAddUserList,
  handleOrderClicks,
  handleUserClick,
  handleCustomerClick,
  isAddCustList,
  customPageSize,
  className,
  customPageSizeOptions
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        sortBy: [
          {
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const generateSortingIndicator = column => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = event => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = event => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  let obj = {}
  // console.log('props,', data)
  let [selecteddate, setselecteddate] = useState(new Date())
  let [attendance, setattendance] = useState(obj);
  let [userdata, setuserdata] = useState([]);
  let [oldattendancedata, setoldattendancedata] = useState({})
  useEffect(() => {
    let temparr = data.map(item => item._id)

    for (let iterator of temparr) {
      obj[iterator] = false
    }
    console.log("data", data);
    setattendance(obj)
    setoldattendancedata(obj)
    setuserdata(data)

  }, [data])



  let handleattendance = (id) => {
    setattendance({ ...attendance, [id]: !attendance[id] })
    console.log("clicked");
  }

  let handleselecteddatechange = (d) => {
    // console.log(format(d, 'yyyy-MM-dd'));
    setselecteddate(d.target.value)
  }

  let [selectall, setselectedall] = useState(false)
  let handleSelectAll = () => {
    if (selectall) {
      let temparr = data.map(item => item._id)

      for (let iterator of temparr) {
        obj[iterator] = false
      }
      setattendance(obj)
      setselectedall(false)
    }
    else {
      let temparr = data.map(item => item._id)

      for (let iterator of temparr) {
        obj[iterator] = true
      }
      setattendance(obj)
      setselectedall(true)
    }
  }

  let handelSubmit = async () => {
    // console.log("-0-0-0", attendance);
    axios.post("http://localhost:3001/attendance", { data: attendance, date: selecteddate }, { headers: { "Authorization": localStorage.getItem('token'), 'Content-Type': 'application/json' } })
      .then((res) => {
        console.log(res)
        showToast("success", "Success", "Attendance Marked")
      })
      .catch((e) => { console.log(e) })
  }
  useEffect(() => {
    axios.get(`http://localhost:3001/attendance/date/${selecteddate}`, 
    { headers: { 
      "Authorization": localStorage.getItem('token'), 
    'Content-Type': 'application/json' } })
      .then((res) => {
        console.log("this is after selcted date chnage", res)
        if (res.data.count !== 0) {
          let obj = {};
          for (let iterator of res.data.result) {
            obj[iterator.userId._id] = iterator.status
          }
          setattendance(obj)
          console.log("tis is obj", obj, userdata);
        } else {
          setattendance(oldattendancedata)
        }
      })
      .catch((e) => { console.log(e) })
  }, [selecteddate])
  useEffect(() => {
    console.log("hey this is something");
    axios.get(`http://localhost:3001/attendance/date/${new Date()}`, { headers: { "Authorization": localStorage.getItem('token'), 'Content-Type': 'application/json' } })
      .then((res) => {
        console.log("this is res after gettting current selected date ", res)
        if (res.data.count !== 0) {
          let obj = {};
          for (let iterator of res.data.result) {
            obj[iterator.userId._id] = iterator.status
          }
          setattendance(obj)
          console.log("tis is obj", obj, userdata);
        } else {
          setattendance(oldattendancedata)
        }
      })
      .catch((e) => { console.log(e, "hey this is error"); })
  }, [])

  return (
    <Fragment>

      <div className="table-responsive react-table">
        <Table bordered hover {...getTableProps()} className={className}>
          <thead className="table-light table-nowrap">
            {headerGroups.map(headerGroup => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th key={column.id}>
                    <div className="mb-2" {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                    </div>
                    <Filter column={column} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            <td className="d-flex w-100 px-2">
              <button className="btn btn-primary bg-primary" onClick={handleSelectAll}>Select All</button>
            </td>
            <td></td>
            <td></td>

            <td className="d-flex w-100 justify-content-end px-2">
              <button className="btn btn-primary bg-primary" onClick={handelSubmit}>Submit</button>
            </td>

            {/* {page.map(row => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map((cell,index) => {
                      return (
                        <td key={cell.id} {...cell.getCellProps()} onClick={()=>handleattendance(row.cells[index].row.original._id)}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                </Fragment>
              );
            })} */}

            {

              userdata.map(item => {
                return (
                  <tr key={item._id}>
                    <td><input type="checkbox" name={item._id} id="" onClick={() => handleattendance(item._id)} checked={attendance[item._id]} /></td>
                    <td>{item.name}</td>
                    <td>{item.designation}</td>
                    <td>{item.email}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>

        {/* <DatePicker maxDate={new Date()} format={"y-MM-dd"} value={selecteddate} onChange={(value) => handleselecteddatechange(value)} /> */}
        <input type="date" name="" id="" maxDate={new Date()} value={selecteddate} onChange={(value) => handleselecteddatechange(value)} />
      </div>

      <Row className="justify-content-md-end justify-content-center align-items-center">
        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button
              color="primary"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            <Button
              color="primary"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
          </div>
        </Col>
        <Col className="col-md-auto d-none d-md-block">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col className="col-md-auto">
          <Input
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>

        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
              {">"}
            </Button>
            <Button
              color="primary"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </Button>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TableContainer;
