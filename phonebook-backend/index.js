const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(morgan('tiny'));

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(x => x.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(x => x.id === id);
  if (person) {
    persons = persons.filter(x => x.id !== id);
  }
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const body = req.body;
  const uid = Math.floor(Math.random() * 10000);
  const person = {
    name: body.name,
    number: body.number,
    id: uid,
  };

  let error = '';

  if (!person.name) {
    error += 'name is required.';
  }
  if (persons.find(x => x.name === person.name)) {
    error += 'name must be unique.';
  }

  if (error.length > 0) {
    return res.status(400).json({ error });
  }

  persons = persons.concat(person);
  res.json(person);
});

app.get('/info', (req, res) => {
  const message = `<p>Phonebook has info for ${
    persons.length
  } people<p><p>${new Date().toString()}</p>`;
  res.send(message);
});

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
