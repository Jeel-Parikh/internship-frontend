import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = props => {
  const ref = useRef();
  let user = localStorage.getItem('user')
  user = JSON.parse(user);
  // console.log(user.designation)
  let isadmin = user.designation==='admin'?true:false
  // console.log("admin:",isadmin)
  // if(user.desig)
  // Use ComponentDidMount and ComponentDidUpdate method simultaneously
  useEffect(() => {
    const pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname]);

  useEffect(() => {
    ref.current.recalculate();
  });

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{isadmin?props.t("Menu(Admin)"):props.t("Menu")} </li>
            <li>
              <Link to="/dashboard" >
                <span>{props.t("Dashboards")}</span>
              </Link>

            </li>
            {
              isadmin?
              <li>
              <Link to="/view-employee" className="has-arrow ">
                <i className="bx bxs-user-detail"></i>
                <span>{props.t("Employee")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/view-employee">{props.t("View Employee")}</Link>
                </li>

                <li>
                  <Link to="/add-employee">{props.t("Add Employee")}</Link>
                </li>
              </ul>
            </li>:<></>
}
            <li>
              <Link to="/leave-application">
                <i className="bx bx-file"></i>
                <span>{props.t("Leave Applications")}</span>
              </Link>

            </li>
           {isadmin? <li>
              <Link to="/attendance" >
                <svg className="attendanceIcon" width={20} height={20} xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 506.49"><path fill-rule="nonzero" d="m371.06 415.61-43.25 11.52 6.23-46.41 37.02 34.89zm6.76-177.5c36.98 0 70.56 15.04 94.83 39.35C496.96 301.7 512 335.25 512 372.31c0 37.02-15.02 70.61-39.3 94.88l-.68.64c-24.23 23.88-57.5 38.66-94.2 38.66-37.06 0-70.61-15.04-94.88-39.31l-.64-.69c-23.9-24.24-38.68-57.53-38.68-94.18 0-37.06 15.04-70.61 39.32-94.89 24.27-24.27 57.85-39.31 94.88-39.31zm78.74 55.41c-20.09-20.11-47.96-32.58-78.74-32.58-30.75 0-58.61 12.47-78.75 32.62-20.15 20.14-32.62 48-32.62 78.75 0 30.5 12.25 58.14 32.02 78.19l.6.55c20.14 20.14 48 32.61 78.75 32.61 30.48 0 58.12-12.25 78.21-32.02l.54-.58c20.15-20.15 32.61-48 32.61-78.75s-12.48-58.61-32.62-78.79zM294.24 17.11C294.24 7.69 303.52 0 315.1 0c11.57 0 20.87 7.64 20.87 17.11v74.85c0 9.42-9.3 17.11-20.87 17.11-11.58 0-20.86-7.65-20.86-17.11V17.11zM56.8 242.28c-1.17 0-2.23-5.2-2.23-11.57 0-6.38.92-11.53 2.23-11.53h56.94c1.18 0 2.24 5.2 2.24 11.53 0 6.39-.92 11.57-2.24 11.57H56.8zm90.77 0c-1.17 0-2.23-5.2-2.23-11.57 0-6.38.92-11.53 2.23-11.53h56.94c1.18 0 2.24 5.2 2.24 11.53 0 6.39-.92 11.57-2.24 11.57h-56.94zm90.77 0c-1.16 0-2.22-5.2-2.22-11.57 0-6.38.92-11.53 2.22-11.53h56.94c1.19 0 2.25 5.15 2.25 11.49-5.7 3.55-11.2 7.44-16.43 11.61h-42.76zm-181.4 66.24c-1.18 0-2.24-5.2-2.24-11.57 0-6.38.93-11.58 2.24-11.58h56.94c1.18 0 2.22 5.2 2.22 11.58 0 6.37-.91 11.57-2.22 11.57H56.94zm90.77 0c-1.18 0-2.24-5.2-2.24-11.57 0-6.38.93-11.58 2.24-11.58h56.94c1.18 0 2.23 5.2 2.23 11.58 0 6.37-.92 11.57-2.23 11.57h-56.94zM57.06 374.8c-1.18 0-2.24-5.2-2.24-11.59 0-6.36.94-11.56 2.24-11.56H114c1.19 0 2.24 5.2 2.24 11.56 0 6.39-.93 11.59-2.24 11.59H57.06zm90.78 0c-1.19 0-2.25-5.2-2.25-11.59 0-6.36.94-11.56 2.25-11.56h56.94c1.18 0 2.24 5.2 2.24 11.56 0 6.39-.94 11.59-2.24 11.59h-56.94zM106.83 17.11C106.83 7.69 116.1 0 127.69 0c11.57 0 20.86 7.64 20.86 17.11v74.85c0 9.42-9.34 17.11-20.86 17.11-11.59 0-20.86-7.65-20.86-17.11V17.11zM22.97 163.64h397.39V77.46c0-2.94-1.19-5.53-3.09-7.43-1.9-1.9-4.59-3.08-7.42-3.08h-38.1c-6.39 0-11.59-5.2-11.59-11.57 0-6.38 5.2-11.58 11.59-11.58h38.1c9.32 0 17.7 3.77 23.82 9.88 6.12 6.14 9.88 14.5 9.88 23.83v136.81c-7.61-2.62-15.41-4.73-23.44-6.29v-21.38h.25H22.97v223.17c0 2.94 1.18 5.52 3.08 7.42 1.91 1.9 4.61 3.08 7.44 3.08h188.85c2.16 8.02 4.86 15.84 8.11 23.36H33.71c-9.3 0-17.7-3.75-23.84-9.89C3.75 427.72 0 419.36 0 410.02V77.55c0-9.29 3.75-17.7 9.87-23.82 6.14-6.13 14.5-9.89 23.84-9.89h40.67c6.38 0 11.57 5.2 11.57 11.57C85.95 61.8 80.76 67 74.38 67H33.71c-2.96 0-5.54 1.18-7.44 3.08-1.9 1.9-3.09 4.59-3.09 7.43v86.16h-.21v-.03zm158.95-96.69c-6.39 0-11.57-5.2-11.57-11.57 0-6.38 5.18-11.58 11.57-11.58h77.55c6.39 0 11.57 5.2 11.57 11.58 0 6.37-5.18 11.57-11.57 11.57h-77.55zm161.66 303.24 45.37-51.33c.72-.84 1.78-1.34 2.85-1.36.69-.01 1.37.13 1.98.45l32.94 29.96c.66.59 1.05 1.46 1.06 2.35.02 1-.39 1.98-1.16 2.66l-46.15 52.16-36.95-34.89h.06z"/></svg>
                <span className="p-2">{props.t("Mark Attendance")}</span>
              </Link>

            </li>:<></>}
            <li>
              <Link to={`/ViewAttendace/${JSON.parse(localStorage.getItem("user"))._id}`} >
              <svg className="attendanceIcon" width={20} height={20} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.87 122.88"><title>date-27</title><path d="M81.6,4.73C81.6,2.12,84.18,0,87.37,0s5.77,2.12,5.77,4.73V25.45c0,2.61-2.58,4.73-5.77,4.73s-5.77-2.12-5.77-4.73V4.73ZM27.89,103.41V94.12L41.83,79.88a27.45,27.45,0,0,0,2.23-2.47,11.79,11.79,0,0,0,1.42-2.23A5.22,5.22,0,0,0,46,73a4.09,4.09,0,0,0-.48-2.09A2.74,2.74,0,0,0,44,69.69a7.67,7.67,0,0,0-2.57-.36H28.61V60c2-.44,4.18-.85,6.61-1.23a55.44,55.44,0,0,1,8.48-.58,19.84,19.84,0,0,1,8.35,1.45A8.74,8.74,0,0,1,56.4,64a16.68,16.68,0,0,1,1.29,6.93,17.37,17.37,0,0,1-.78,5.37,17.15,17.15,0,0,1-2.26,4.53A31.37,31.37,0,0,1,51.06,85l-7.73,7.91H58.9v10.49Zm40.24,0L79.84,70.29H63.13V58.59h29L95,63.29,81.16,103.41ZM29.61,4.73C29.61,2.12,32.19,0,35.38,0s5.77,2.12,5.77,4.73V25.45c0,2.61-2.58,4.73-5.77,4.73s-5.77-2.12-5.77-4.73V4.73ZM6.4,38.76H116.46V21.47a3,3,0,0,0-.86-2.07,2.92,2.92,0,0,0-2.07-.86H103a3.2,3.2,0,1,1,0-6.4h10.55a9.36,9.36,0,0,1,9.33,9.33v92.08a9.36,9.36,0,0,1-9.33,9.33H9.33A9.36,9.36,0,0,1,0,113.54V21.47a9.36,9.36,0,0,1,9.33-9.33H20.6a3.2,3.2,0,1,1,0,6.4H9.33a3,3,0,0,0-2.07.86,2.92,2.92,0,0,0-.86,2.07V38.76Zm110.07,6.41H6.4v68.37a3,3,0,0,0,.86,2.07,2.92,2.92,0,0,0,2.07.86H113.54a3,3,0,0,0,2.07-.86,2.92,2.92,0,0,0,.86-2.07V45.17Zm-66-26.63a3.2,3.2,0,0,1,0-6.4H71.91a3.2,3.2,0,1,1,0,6.4Z"/></svg>
                <span className="p-2">{props.t("View Attendance")}</span>
              </Link>

            </li>
            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-briefcase-alt-2"></i>
                <span>{props.t("Projects")}</span>
              </Link>
              <ul className="sub-menu">

                <li>
                  <Link to="/projects-overview">
                    {props.t("Project Overview")}
                  </Link>
                </li>
                <li>
                  <Link to="/projects-create">{props.t("Create New")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-task"></i>
                <span>{props.t("Tasks")}</span>
              </Link>
              <ul className="sub-menu">

                {isadmin?<li>
                  <Link to="/viewtask">{props.t("View Task")}</Link>
                </li>:<></>
                }{!isadmin?<li>
                  <Link to="/viewtasks">{props.t("View Task")}</Link>
                </li>:<></>
}
                {isadmin?<li>
                  <Link to="/task">{props.t("Create Task")}</Link>
                </li>:<></>}
              </ul>
            </li>


          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
