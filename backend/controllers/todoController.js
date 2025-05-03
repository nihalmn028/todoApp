import Todo from '../models/Todo.js';

const createTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    console.log(req.body);

    const todo = await Todo.create({ title, description, status });

    res.status(201).json({
      success: true,
      data: todo,
      message: 'Todo created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: null,
      message: error.message
    });
  }
};

const getTodos = async (req, res) => {
  try {
    // Extract status filter from query parameters
    const { status } = req.query;

    // Build the filter object based on the status
    let filter = {};
    
    if (status && status !== 'all') { // Only filter if status is not 'all'
      filter = { status }; // Filter by status if it's not 'all'
    }

    // Find todos with the filter applied (if any) and sort by creation date
    const todos = await Todo.find(filter).sort('-createdAt');

    res.json({
      success: true,
      data: todos,
      message: 'Todos fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message
    });
  }
};

const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    const todos = await Todo.findById(id);

    res.json({
      success: true,
      data: todos,
      message: 'Todos fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Todo not found'
      });
    }

    res.json({
      success: true,
      data: todo,
      message: 'Todo updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: null,
      message: error.message
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Todo not found'
      });
    }

    res.json({
      success: true,
      data: null,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message
    });
  }
};

export { createTodo, getTodos, updateTodo, deleteTodo,getTodoById };
