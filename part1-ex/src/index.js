import React from 'react';
import ReactDOM from 'react-dom';

const Header = props => <h1>{props.course}</h1>;
const Part = props => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);
const Content = props => (
  <div>
    <Part part={props.parts[0]} />
    <Part part={props.parts[1]} />
    <Part part={props.parts[2]} />
  </div>
);

const Total = props => (
  <p>
    Number of exercises{' '}
    {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
  </p>
);

const Course = props => (
  <>
    <Header course={props.course.name} />
    <Content parts={props.course.parts} />
    <Total parts={props.course.parts} />
  </>
);

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
