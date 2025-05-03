import express from 'express';
import { createTodo, deleteTodo, getTodoById, getTodos, updateTodo } from '../controllers/todoController.js';


const router = express.Router();

router.post('/create', createTodo);
router.get('/search', getTodos);
router.put('/update/:id', updateTodo);
router.delete('/delete/:id', deleteTodo);
router.get('/getbyid/:id', getTodoById);


export default router;