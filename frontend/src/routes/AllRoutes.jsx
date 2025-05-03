import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import AddTodo from '../pages/AddTodo'
import { TodoProvider } from '../contexts/TodoContext'
import EditTodo from '../pages/EditTodo'

const AllRoutes = () => {
  return (
    <>
       <Router>
      <TodoProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTodo />} />
          <Route path="/edit/:id" element={<EditTodo />} />
        </Routes>
      </TodoProvider>
    </Router>
    </>
  )
}

export default AllRoutes