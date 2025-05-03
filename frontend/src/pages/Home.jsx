// src/pages/Home.js
import { Row, Col, Select, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useTodo } from '../contexts/TodoContext';
import TodoList from '../components/TodoList';

const Home = () => {
  const { filter, setFilter } = useTodo();

  return (
    <div className="container" style={{padding:'40px'}}>
      <Row justify="space-between" align="middle" className="header">
        <Col>
          <h1 style={{fontSize:'20px'}}>Todo Manager</h1>
        </Col>
     
      </Row>
      <TodoList />
    </div>
  );
};

export default Home;