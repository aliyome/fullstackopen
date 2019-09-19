import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './Note';
import noteService from '../services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService.getAll().then(response => {
      setNotes(response.data);
    });
  }, []);

  console.log('render', notes.length, 'notes');

  const notesToShow = showAll ? notes : notes.filter(x => x.important);

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };
    noteService.update(id, changedNote).then(res => {
      setNotes(notes.map(note => (note.id !== id ? note : res.data)));
    });
  };

  const rows = notesToShow.map(note => (
    <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
  ));

  const addNote = event => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    };

    noteService.create(noteObject).then(response => {
      setNotes(notes.concat(response.data));
      setNewNote('');
    });
  };

  const handleNoteChange = event => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>{rows}</ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
