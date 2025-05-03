import { useTodo } from '../contexts/TodoContext';
import { useNavigate } from 'react-router-dom';
import TodoForm from '../components/TodoForm';

const AddTodo = () => {
  const { handleAdd } = useTodo();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const response = await handleAdd(values);
    
    if (response.success==true)
      {
        
        navigate('/');
      }
  };

  return (
    
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>

      <h1 style={{ marginBottom: '24px' }}>Add New Todo</h1>
      <TodoForm onFinish={handleSubmit} />
    </div>
  );
};

export default AddTodo;