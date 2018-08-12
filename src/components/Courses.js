import React from 'react';
import Link from 'gatsby-link';
import './Courses.css';

export const Course = ({ course }) => {
  return (
    <div className="Course col-sm-4">
      <Link to="/">
        <div>
          <h2>
            <i className={`${course.icon} fa-2x`} />
            {course.name}
          </h2>
        </div>
      </Link>
      <div className="course-description">{course.description}</div>
    </div>
  );
};

export const Courses = () => {
  return (
    <section className="Courses">
      <div className="container">
        <h1>My offered Courses</h1>
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
                'Java enterprise framework which helps you to create full production ready application in amazingly short time.'
            }}
          />
        </div>
        <div className="row">
          <Course
            course={{
              name: 'React',
              icon: 'fab fa-react',
              description:
                'A javascript library made by Facebook and used by half of the modern pages on the internet. It is my personal favourite for frontend development.'
            }}
          />
          <Course
            course={{
              name: 'jQuery',
              icon: 'fas fa-dollar-sign',
              description:
                'A library which used to be the only choice for front-end development in javascript. It is still used by plenty of (not only legacy) applications.'
            }}
          />
        </div>
      </div>
    </section>
  );
};
