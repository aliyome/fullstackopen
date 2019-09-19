import React from 'react';

const Header = ({ course }) => <h2>{course}</h2>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  const rows = parts.map(x => <Part key={x.name} part={x} />);

  return <div>{rows}</div>;
};

const Total = ({ parts }) => {
  const sum = parts.reduce((x, y) => x + y.exercises, 0);
  return (
    <p>
      <strong>Number of exercises {sum}</strong>
    </p>
  );
};

const Course = ({ course }) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
);

export default Course;
