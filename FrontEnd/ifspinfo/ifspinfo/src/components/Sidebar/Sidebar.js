import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Nav } from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";
import logo from "Instituto_Federal_de_São_Paulo_LOGO.svg";

var ps;

function Sidebar(props) {
  const location = useLocation();
  const sidebar = React.useRef();

  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div 
        className="logo"
      >
      
        <a
          href="https://ifsp.edu.br"
          className="simple-text logo-normal"
        >
          IFSP INFO
        </a>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {/* Renderiza a primeira rota */}
          {props.routes.length > 0 && (
            <li
              className={
                activeRoute(props.routes[0].path) + (props.routes[0].pro ? " active-pro" : "")
              }
            >
              <NavLink to={props.routes[0].layout + props.routes[0].path} className="nav-NavLink">
                <i className={props.routes[0].icon} />
                <p>{props.routes[0].name}</p>
              </NavLink>
            </li>
          )}

          {/* Renderiza a última rota */}
          {props.routes.length > 1 && (
            <li
              className={
                activeRoute(props.routes[props.routes.length - 1].path) + 
                (props.routes[props.routes.length - 1].pro ? " active-pro" : "")
              }
            >
              <NavLink to={props.routes[props.routes.length - 1].layout + props.routes[props.routes.length - 1].path} className="nav-NavLink">
                <i className={props.routes[props.routes.length - 1].icon} />
                <p>{props.routes[props.routes.length - 1].name}</p>
              </NavLink>
            </li>
          )}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
