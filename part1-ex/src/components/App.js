import React from 'react';
import Course from './Course';

const App = ({ courses }) => {
  const rows = courses.map(x => <Course key={x.id} course={x} />);

  return (
    <>
      <h1>Web development curriculum</h1>
      <div>{rows}</div>
    </>
  );
};

export default App;
