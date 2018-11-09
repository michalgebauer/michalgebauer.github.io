import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="Footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h2>Contact</h2>
            <ul>
              <li>
                <a href="https://twitter.com/michal_gebauer">
                  <i className="fab fa-twitter fa-lg" />
                </a>
                <a href="https://www.linkedin.com/in/michal-gebauer-0a929696">
                  <i className="fab fa-linkedin-in fa-lg" />
                </a>
                <a href="https://github.com/michalgebauer">
                  <i className="fab fa-github fa-lg" />
                </a>
                <a href="https://www.facebook.com/mI3O-237104290338776">
                  <i className="fab fa-facebook fa-lg" />
                </a>
              </li>
              <li>Nitra, Slovakia</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h2>RSS</h2>
            <ul>
              <li>
                <a href="/rss.xml">
                  <i className="fas fa-rss fa-lg" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
