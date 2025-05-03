// src/pages/TodoForm.js
import { Form, Input, Select, Button } from 'antd';
import { useTodo } from '../contexts/TodoContext';

const TodoForm = ({ initialValues, onFinish }) => {
  const [form] = Form.useForm();
  const { loading } = useTodo();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter title' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true }]}
      >
        <Select>
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="in-progress">In Progress</Select.Option>
          <Select.Option value="completed">Completed</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TodoForm;