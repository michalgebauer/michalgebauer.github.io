import React from 'react';
import Link from 'gatsby-link';

export const Course = ({ course }) => {
  return (
    <div className="col-sm-4" style={{ paddingTop: '15px', fontSize: '18px' }}>
      <Link to="/">
        <div>
          <h2>
            <i className={`${course.icon} fa-2x`} style={{ marginRight: '15px' }} />
            {course.name}
          </h2>
        </div>
      </Link>
      <div style={{ color: '#777' }}>{course.description}</div>
    </div>
  );
};

export const Courses = () => {
  return (
    <section style={{ background: '#eee', paddingBottom: '40px' }}>
      <div className="container">
        <h1 style={{ color: '#777' }}>My offered Courses</h1>
        <div className="row">
          <Course
            course={{
              name: 'Java',
              icon: 'fab fa-java',
              description:
                "Java's been here for ages and is mature, stable language with huge community, standards and third party libs."
            }}
          />
          <Course
            course={{
              name: 'Javascript',
              icon: 'fab fa-js',
              description:
                'Javascript is becoming the most popular programming language. Since Nodejs introduction it expanded everywhere.'
            }}
          />
          <Course
            course={{
              name: 'Spring',
              icon: 'fas fa-leaf',
              description:
                'Spring is a java enterprise framework which helps you to create full production ready application in amazingly short time.'
            }}
          />
        </div>
        <div className="row">
          <Course
            course={{
              name: 'React',
              icon: 'fab fa-react',
              description:
                'React is a javascript library made by Facebook and used by half of the modern pages on internet. It is my personal favourite for frontent development.'
            }}
          />
          <Course
            course={{
              name: 'jQuery',
              icon: 'fas fa-dollar-sign',
              description:
                'jQuery is a library which used to be the only choice for front-end development in javascript. It is still used by plenty of (not only legacy) applications.'
            }}
          />
        </div>
      </div>
    </section>
  );
};
