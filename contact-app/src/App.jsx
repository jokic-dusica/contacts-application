import { Routes, Route } from 'react-router-dom';

import SideBar from './components/SideBar/SideBar';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import CreateContact from './components/CreateContact/CreateContact';
import EditContact from './components/EditContact/EditContact';
import FavoritesContactsList from './components/FavoritesContactsList/FavoritesContactsList';
import ContactsByLabel from './components/ContactsByLabel/ContactsByLabel';

import './App.scss';

const App = () => {
  return (
    <div className="App">
      <SideBar/>
        <main>
        <Header/>
          <Routes>
              <Route exact path = "/" element={<Home/>}></Route>
              <Route exact path = "/add" element={<CreateContact/>}>Create Contact</Route>
              <Route exact path = "/edit/:id" element={<EditContact/>}>Edit Component</Route>
              <Route exact path = "/favoritesContacts" element={<FavoritesContactsList/>}>Favorites</Route>
              <Route exact path = "/contactByLabel/:label" element={<ContactsByLabel/>}>Contact By Label</Route>
          </Routes>
        </main>
    </div>
  );
}

export default App;
