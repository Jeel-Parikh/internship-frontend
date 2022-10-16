import React, { Fragment ,useState,useEffect} from "react";
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

  let obj={}
  // console.log('props,', data)
  let [attendance,setattendance]=useState(obj);
  let [userdata,setuserdata]=useState([])
  useEffect(() => {
    let temparr=data.map(item=>item._id )
  
    for (let iterator of temparr) {
      obj[iterator]=false
    }
    console.log("data",data);
    setattendance(obj)
setuserdata(data)
    
  }, [data])

  let handleattendance=(id)=>{
    setattendance({...attendance,[id]:!attendance[id]})
console.log("clicked");
  }

  let [selectall,setselectedall]=useState(false)
  let handleSelectAll= ()=>{
    if(selectall){
      let temparr=data.map(item=>item._id )
      
      for (let iterator of temparr) {
        obj[iterator]=false
      }
      setattendance(obj)
      setselectedall(false)
    }
    else{   
    let temparr=data.map(item=>item._id )
    
    for (let iterator of temparr) {
      obj[iterator]=true
    }
    setattendance(obj)
    setselectedall(true)
  }
  }

  let handelSubmit=async()=>{
    console.log("-0-0-0",attendance);
    axios.post("http://localhost:3001/attendance", {data:attendance}, { headers: { "Authorization": localStorage.getItem('token'), 'Content-Type': 'application/json' } })
                .then((res) => { 
                  console.log(res)
                  showToast("success", "Success", "Attendance Marked")
                })
                .catch((e) => { console.log(e) })

    
  }
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

              userdata.map(item=>{
                return(
                  <tr key={item._id}>
              <td><input type="checkbox" name={item._id} id=""  onClick={()=>handleattendance(item._id)} checked={attendance[item._id]}/></td>
              <td>{item.name}</td>
              <td>{item.designation}</td>
              <td>{item.email}</td>
            </tr>
              )
              })
            }
          </tbody>
        </Table>
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
