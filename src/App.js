import { React, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from './contexts/context';
import Home from './components/Home';
import Genres from './components/Genres';
import Genre from './components/Genre';
import Decades from './components/Decades';
import Decade from './components/Decade';
import Titles from './components/Titles';
import Title from './components/Title';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import List from './components/List';

function App() {

  return (
    <div className="App">
     <BrowserRouter>
     <Provider>
     <Header />
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/titles' element={<Titles />} />
      <Route path='/titles/:id' element={<Title />} />
      <Route path='/genres' element={<Genres />} />
      <Route path='/genres/:genre' element={<Genre />} />
      <Route path='/decades' element={<Decades />} />
      <Route path='/decades/:decade' element={<Decade />} />
      <Route path='/login' element={<Login />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/register' element={<Register />} />
      <Route path='/list' element={<List />} />
     </Routes>
     </Provider>
     </BrowserRouter>
     <Footer />
    </div>
  );
}

export default App;
