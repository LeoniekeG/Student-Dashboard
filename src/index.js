import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import './index.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import AllStudents from './pages/AllStudents'
import Student from './pages/Student';
import Chart from './pages/Chart';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />}/>
    <Route path="chart" element={<Chart />}/>
    <Route path="allstudents" element={<AllStudents />} > 
      <Route path=":name" element={<Student />} />  
      </Route>
  
    <Route path="*" element={<NotFound />}/>
  </Route>
))

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);

/*
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />}/>
    <Route path="chart" element={<Chart />}/>
    <Route path="allstudents" element={<AllStudents />} > 
      <Route path="allstudents/:id" element={<Student />} />
      <Route path="student" element={<Student />}/> 
    </Route>  
  </Route>
*/