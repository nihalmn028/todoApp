// src/pages/EditTodo.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTodo } from '../contexts/TodoContext';
import TodoForm from '../components/TodoForm';
import { Spin } from 'antd';

const EditTodo = () => {
  const { id } = useParams();
  const { handleUpdate, todos,handleGetByID } = useTodo();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the todo in existing context or fetch fresh data
    const existingTodo = todos.find(todo => todo._id === id);
    if (existingTodo) {
      setInitialValues(existingTodo);
      setLoading(false);
    } else {
      // If not found in context, fetch from API
      const fetchTodo = async () => {
        try {
          // You'll need to implement getTodo in your API
          const response = await handleGetByID(id);
          const data = await response.json();
          setInitialValues(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchTodo();
    }
  }, [id, todos]);

  const handleSubmit = async (values) => {
    const success = await handleUpdate(id, values);
    if (success.success) navigate('/');
  };

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '24px auto' }} />;

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '24px' }}>Edit Todo</h1>
      <TodoForm initialValues={initialValues} onFinish={handleSubmit} />
    </div>
  );
};

export default EditTodo;