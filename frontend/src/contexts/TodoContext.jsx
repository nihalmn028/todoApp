// src/contexts/TodoContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';
import { getTodos, createTodo, updateTodo, deleteTodo, getTodo } from '../api/todoApi';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchTodos = async () => {
    try {
      setLoading(true); // Set loading to true when starting the request
      const data = await getTodos({ status: filter }); // Pass the filter as a query parameter
      setTodos(data.data);
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  useEffect(() => { fetchTodos() }, []);

  const handleAdd = async (values) => {
    try {
      const result = await createTodo(values); 
      if(result.success){

      await fetchTodos();
      message.success('Todo added successfully');

      return result; 
      }
    } catch (err) {
      message.error(err.message);
      return { success: false, message: err.message }; 
    }
  };

  const handleUpdate = async (id, values) => {
    try {
      const result = await updateTodo(id, values); 
if(result.success){
      await fetchTodos();
      message.success('Todo updated successfully');

      return result; 
}
    } catch (err) {
      message.error(err.message);
      return { success: false, message: err.message }; 
    }
  };
  

  const handleDelete = async (id) => {
    try {
   const response=   await deleteTodo(id);
      if(response.success){

        message.success('Todo deleted successfully');

      await fetchTodos();
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  const handleGetByID = async (id) => {
    try {
      await getTodo(id);
      await fetchTodos();
      message.success('Todo updated successfully');
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <TodoContext.Provider value={{
      todos,
      loading,
      filter,
      setFilter,
      handleAdd,
      handleUpdate,
      handleDelete,
      fetchTodos,
      handleGetByID
    }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);