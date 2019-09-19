import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then(returnedPerson => setPersons(returnedPerson));
  }, []);

  const filteredPersons = persons.filter(x => x.name.toLowerCase().includes(filter.toLowerCase()));

  const addPerson = event => {
    event.preventDefault();
    if (persons.some(x => x.name === newName)) {
      alert(`${newName} is already added to phonebook.`);
      return;
    }

    const personObject = { name: newName, number: newNumber };

    personsService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');

      setMessage(`Added ${returnedPerson.name}.`);
      setTimeout(() => setMessage(null), 1000);
    });
  };

  const deletePerson = person => event => {
    event.preventDefault();
    if (!window.confirm(`Delete ${person.name}?`)) {
      return;
    }
    personsService.remove(person.id).then(_ => {
      setPersons(persons.filter(x => x.id !== person.id));
    });
  };

  const handleNewNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <Filter handleFilterChange={handleFilterChange} filter={filter} />

      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handleNewNameChange={handleNewNameChange}
        newName={newName}
        handleNewNumberChange={handleNewNumberChange}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
