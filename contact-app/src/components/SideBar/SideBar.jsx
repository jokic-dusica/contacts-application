import logo from '../../assets/logo.png'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import { RiContactsLine } from 'react-icons/ri';
import { AiOutlineStar, AiOutlinePlus } from 'react-icons/ai';

import './SideBar.scss';


const SideBar = () => {

  const { contacts } = useSelector((state) => state.contacts);
  const { favoritesContacts } = useSelector((state) => state.contacts);

  return (
    <nav className="SideBar">
      <div className="wrapper">
        <div>
          <div className="logoWrapper">
            <Link to="/" >
              <img src={logo} alt='Not found' />
            </Link>
          </div>
          <span className="mainTitle">Contacts</span>
        </div>
        <div className="btnWrapper">
          <Link to="/add" className="">      
            <span><AiOutlinePlus size={15}/></span>Create Contact
          </Link>
        </div>     
        <div className="sidebarMenu">
          <ul>
            <Link to="/"><li><RiContactsLine size={18}/> Contacts <span>{contacts.length}</span></li></Link>
            <Link to="/favoritesContacts"><li><AiOutlineStar size={18} /> Favorites <span>{favoritesContacts.length}</span></li></Link>
          </ul>
          <div>Labels</div>
        </div>
      </div>
    </nav>
  )
}

export default SideBar;