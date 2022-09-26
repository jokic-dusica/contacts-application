import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SideBar from './components/SideBar/SideBar';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import CreateContact from './components/CreateContact/CreateContact';
import EditContact from './components/EditContact/EditContact';

import './App.scss';

const App = () => {
  return (
    <div className="App">
      <SideBar/>
      <Header/>
      <div className="container">
        <div className="row">
          <Routes>
              <Route exact path = "/" element={<Home/>}></Route>
              <Route exact path = "/add" element={<CreateContact/>}>Create Contact</Route>
              <Route exact path = "/edit/:id" element={<EditContact/>}>Edit Component</Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
