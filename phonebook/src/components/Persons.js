import React from 'react';

const Persons = ({ persons, filter }) => {
  const personList = persons.map(x => (
    <div key={x.id}>
      {x.name} {x.number}
    </div>
  ));

  return <div>{personList}</div>;
};

export default Persons;
