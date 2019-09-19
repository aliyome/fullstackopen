import React from 'react';

// TODO: どう考えてもこれは良くない
const PersonForm = ({
  addPerson,
  handleNewNameChange,
  handleNewNumberChange,
  newName,
  newNumber,
}) => {
  return (
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
  );
};

export default PersonForm;
