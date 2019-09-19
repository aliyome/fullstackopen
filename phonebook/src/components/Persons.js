import React from 'react';

const Persons = ({ persons, deletePerson }) => {
  const personList = persons.map(person => (
    <div key={person.id}>
      {person.name} {person.number}
      <button onClick={deletePerson(person)}>delete</button>
    </div>
  ));

  return <div>{personList}</div>;
};

export default Persons;
