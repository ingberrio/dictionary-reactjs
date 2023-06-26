import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavbarCss from './Navbar.module.css';
import { MDBSwitch } from 'mdb-react-ui-kit';

const NavbarColl = ({ onSelectFont }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleFontSelect = (selectedKey) => {
    onSelectFont(selectedKey);
  };

  const switchLabel = theme === 'light' ? 'Light' : 'Dark';


  return (
    <Navbar collapseOnSelect expand="lg" className={theme === 'dark' ? `${NavbarCss.navbar} ${NavbarCss.dark}` : `${NavbarCss.navbar}`}>
      <Container>
        <Navbar.Brand href="#home">
          <img alt="Dictionary" src="logo.png" width="40" height="40" className="logo" />{' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <NavDropdown title="Select Font" className={NavbarCss.collasible} onSelect={handleFontSelect}>
              <NavDropdown.Item eventKey="serif">Serif</NavDropdown.Item>
              <NavDropdown.Item eventKey="sans-serif">Sans-serif</NavDropdown.Item>
              <NavDropdown.Item eventKey="monospace">Monospace</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <MDBSwitch
          className="switchTheme"
          defaultChecked
          onClick={toggleTheme}
          label={switchLabel}
        />
      </Container>
    </Navbar>
  );
};

export default NavbarColl;
