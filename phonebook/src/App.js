import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: 'Arto Hellas', number: '01234' }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const personList = persons.map(x => (
    <div key={x.id}>
      {x.name} {x.number}
    </div>
  ));

  const addPerson = event => {
    event.preventDefault();
    if (persons.some(x => x.name === newName)) {
      alert(`${newName} is already added to phonebook.`);
      return;
    }

    const personObject = { id: persons.length + 1, name: newName, number: newNumber };
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  };

  const handleNewNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = event => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNewNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNewNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personList}
    </div>
  );
};

export default App;
