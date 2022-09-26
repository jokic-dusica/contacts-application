import React from 'react'
import logo from '../../assets/logo.png'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import { RiContactsLine } from 'react-icons/ri';
import { AiOutlineStar } from 'react-icons/ai';
import './SideBar.scss';


const SideBar = () => {

  const {contacts} = useSelector((state) => state.contacts);
  return (
    <nav className="wrapper">
        {/* <Link to="/" className = "navbar-logo">Contact App</Link>
        <Link to="/" className = "">Create Contact</Link>
        <Link to="/" className = "">Favorites</Link> */}
        <div>
          <div className="">
                <div className="logoWrapper">
                  <Link to="/" >               
                    <img src={logo} alt='Not found'/>
                  </Link>
                </div> 
                <span>Contacts</span>
          </div>                            
            <Link to="/add" className = "">
              <div className="btnWrapper">
                Create Contact 
              </div>                            
            </Link>
          
          <div className = "sidebarMenu">
            <div>
              <ul>
                <li><RiContactsLine/> Contacts {contacts.length}</li>
                <li><AiOutlineStar/> Favorites</li>
              </ul>
            </div>
          </div>
        </div>      
    </nav>
  )
}

export default SideBar;