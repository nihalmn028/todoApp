import { Table, Tag, Button, Popconfirm, Space, Select, Row } from 'antd';
import { Link } from 'react-router-dom';
import { SyncOutlined } from '@ant-design/icons';
import { useTodo } from '../contexts/TodoContext';

const TodoList = () => {
  const { todos, loading, filter, setFilter, handleDelete, fetchTodos } = useTodo();

  // const filteredTodos = todos.filter(todo => {
  //   return filter === 'all' || todo.status === filter;
  // });

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={
          status === 'completed' ? 'green' :
          status === 'in-progress' ? 'orange' : 'gray'
        }>
          {status}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Link to={`/edit/${record._id}`}>
            <Button type="link">Edit</Button>
          </Link>
          <Popconfirm
            title="Delete this todo?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={todos}
      loading={loading}
      rowKey="_id"
      pagination={{ pageSize: 5 }}
      title={() => (
        <Row justify="end">
          <Space>
          <Select
  value={filter}
  onChange={value => {
    setFilter(value); // Update the filter state
    // Fetch todos with the updated filter
  }}
  size="large"
  style={{ width: 150, fontSize: '16px' }}
>
  <Select.Option value="all">All</Select.Option>
  <Select.Option value="pending">Pending</Select.Option>
  <Select.Option value="in-progress">In Progress</Select.Option>
  <Select.Option value="completed">Completed</Select.Option>
</Select>
            <Button onClick={fetchTodos} icon={<SyncOutlined />}>
              Search
            </Button>
            <Link to="/add">
              <Button type="primary">Add Todo</Button>
            </Link>
          </Space>
        </Row>
      )}
      
    />
  );
};

export default TodoList;
