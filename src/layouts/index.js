import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import '../css/bootstrap.css';
import './index.css';
import Link from 'gatsby-link';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { Courses } from '../components/Courses';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Michal Gebauer Blog"
      meta={[
        { name: 'description', content: 'Programming blogs' },
        { name: 'keywords', content: 'java, javascript, Spring, JEE, React, Typescript, ECMA' }
      ]}
      link={[
        { href: 'https://fonts.googleapis.com/css?family=Alegreya:400,700', rel: 'stylesheet' },
        {
          href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css',
          rel: 'stylesheet',
          integrity: 'sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ',
          crossorigin: 'anonymous'
        }
      ]}
    />
    <header>
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <span className="mi3o-logo">
                <span className="bracket">&#123;</span>mI3O<span className="bracket">&#125;</span>
              </span>
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight={true}>
          <NavItem eventKey={1} href="#">
            <Link to="/" activeClassName="active-menu">
              Blog
            </Link>
          </NavItem>
          <NavItem eventKey={2} href="#">
            <Link to="/courses" activeClassName="active-menu">
              Courses
            </Link>
          </NavItem>
          <NavItem eventKey={3} href="#">
            <Link to="/about" activeClassName="active-menu">
              About me
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
    </header>
    <section style={{ marginTop: '25px' }}>{children()}</section>
    <Courses />
    <footer style={{ background: '#444', color: '#fff', padding: '100px' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3>Contact</h3>
            <ul>
              <li>
                <a href="https://twitter.com/michal_gebauer">
                  <i className="fab fa-twitter" />
                </a>
                <a href="https://www.linkedin.com/in/michal-gebauer-0a929696">
                  <i className="fab fa-linkedin-in" />
                </a>
                <a href="https://github.com/michalgebauer">
                  <i className="fab fa-github" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
