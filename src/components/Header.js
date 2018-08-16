import React from 'react';
import Link from 'gatsby-link';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import './Header.css';

export const Header = () => {
  return (
    <header className="Header">
      <Navbar fixedTop collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <span className="mi3o-logo">
                <span className="bracket">&#123;</span>mI3O<span className="tld">.com</span>
                <span className="bracket">&#125;</span>
              </span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight={true}>
            <NavItem eventKey={1} href="/">
              Blog
            </NavItem>
            <NavItem eventKey={2} href="/courses">
              Courses
            </NavItem>
            <NavItem eventKey={3} href="/about">
              About me
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};
