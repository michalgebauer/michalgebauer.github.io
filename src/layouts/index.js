import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import '../css/bootstrap.css';
import './index.css';

import { Courses } from '../components/Courses';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Michal Gebauer Blog"
      meta={[
        { name: 'description', content: 'Programming blogs' },
        { name: 'keywords', content: 'java, javascript, Spring, JEE, React, Typescript, ECMA' }
      ]}
    >
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
        crossorigin="anonymous"
      />
      <link href="https://fonts.googleapis.com/css?family=Alegreya:400,700" rel="stylesheet" />
      <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
      <script>
        {`(adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: "ca-pub-5691001381659710",
          enable_page_level_ads: true
        });`}
      </script>
    </Helmet>
    <Header />
    <section style={{ marginTop: '25px' }}>{children()}</section>
    <Courses />
    <Footer />
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
