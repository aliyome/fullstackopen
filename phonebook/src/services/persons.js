import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl).then(x => x.data);
};

const create = person => {
  return axios.post(baseUrl, person).then(x => x.data);
};

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`).then(x => x.data);
};

export default { getAll, create, remove };
