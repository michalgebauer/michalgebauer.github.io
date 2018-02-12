import React from 'react'
import Link from 'gatsby-link'
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Header = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link
            to="/"
          >
            Michal Gebauer Blog
        </Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav pullRight>
      <NavItem>
        <Link
              to="/"
            >
              Author
          </Link>
        </NavItem>
    </Nav>
  </Navbar>
)

export default Header
