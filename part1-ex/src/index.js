import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

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

ReactDOM.render(<App course={course} />, document.getElementById('root'));
