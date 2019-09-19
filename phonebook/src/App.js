import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(x => {
      setPersons(x.data);
    });
  }, []);

  const filteredPersons = persons.filter(x => x.name.toLowerCase().includes(filter.toLowerCase()));

  const addPerson = event => {
    event.preventDefault();
    if (persons.some(x => x.name === newName)) {
      alert(`${newName} is already added to phonebook.`);
      return;
    }

    const personObject = { id: persons.length + 1, name: newName, number: newNumber };

    axios.post('http://localhost:3001/persons', personObject).then(res => {
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
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
      <Filter handleFilterChange={handleFilterChange} filter={filter} />

      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handleNewNameChange={handleNewNameChange}
        handleNewNumberChange={handleNewNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
