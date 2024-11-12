import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";

import routes from "routes.js";

function Header({ onSearchChange, filteredCampuses, handleZoomToCampus }) { // Passamos os campi filtrados e função de zoom como props
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState("transparent");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const sidebarToggle = React.useRef();
  const location = useLocation();


  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };

  const dropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const getBrand = () => {
    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  };

  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };

  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });

  useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);

  return (
    <Navbar
      color={color === "transparent" ? "navbar-transparent " : ""}
      expand="lg"
      className="navbar-absolute fixed-top"
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={openSidebar}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand href="/">{getBrand()}</NavbarBrand>
        </div>

        {/* Campo de busca */}
        <form>
          <InputGroup className="justify-content-end">
            <Input
              placeholder="Procure por Campus ou Curso"
              onChange={onSearchChange} // Função passada como prop
              onFocus={() => setDropdownOpen(true)} // Abre o dropdown ao focar no campo
              onBlur={() => setTimeout(() => setDropdownOpen(false), 200)} // Fecha após perder o foco com atraso
            />
            <InputGroupAddon addonType="append">
              <InputGroupText>
                <i className="nc-icon nc-zoom-split" />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>

          {dropdownOpen && (
            <div className="dropdown-menu show" style={{ width: '100%' }}>
              {filteredCampuses.length > 0 ? (
                filteredCampuses.map((campus) => (
                  <div
                    key={campus.id}
                    className="dropdown-item"
                    onClick={() => handleZoomToCampus(campus)}
                    style={{ cursor: 'pointer' }}
                  >
                    <strong>{campus.nome}</strong> {/* Nome do campus */}
                    {campus.cursos && campus.cursos.length > 0 ? (
                        ` - ${campus.cursos.map((curso) => curso.nome).join(", ")}`
                      ) : (
                        " - Nenhum curso disponível"
                      )}
                  </div>
                ))
              ) : (
                <div className="dropdown-item disabled">Nenhum resultado encontrado</div>
              )}
            </div>
          )}

        </form>
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <Nav navbar />
        </Collapse>
        
      </Container>
    </Navbar>
  );
}

export default Header;
