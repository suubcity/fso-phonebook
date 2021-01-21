import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  console.log("persons create fired");
  return axios.post(baseUrl, newObject);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, updatedObject) => {
  updatedObject.id = id;
  return axios.put(baseUrl, updatedObject);
};

export default {
  getAll,
  create,
  remove,
  update,
};
