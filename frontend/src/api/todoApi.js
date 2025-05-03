import client from './client';

export const getTodos = (params = {}) => {
  return client.get('/search', {
    params: params
  });
};export const getTodo = (id) => client.get(`/getbyid/${id}`);
export const createTodo = (todoData) => client.post('/create', todoData);
export const updateTodo = (id, todoData) => client.put(`/update/${id}`, todoData);
export const deleteTodo = (id) => client.delete(`/delete/${id}`);