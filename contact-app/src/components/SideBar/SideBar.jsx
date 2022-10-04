import logo from '../../assets/logo.png'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RiContactsLine, RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineStar, AiOutlinePlus } from 'react-icons/ai';
import { BiLabel } from 'react-icons/bi';

import { createLabel, deleteLabel } from '../../redux/slices/labels';

import InputModal from '../InputModal/InputModal';

import './SideBar.scss';

const SideBar = () => {

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { contacts, favoritesContacts } = useSelector((state) => state.contacts);
  const { labels } = useSelector((state) => state.labels);

  const createLabelHandler = () => {
    setShowModal(true);
  }

  const createLabelCallBack = (label) => {
    dispatch(createLabel({ id: Date.now(), label }));
  }

  const contactPerLabel = (label) => {
    return contacts.filter(contact => contact.labels.includes(label)).length;
  }

  return (
    <aside className="SideBar">
      <div>
        <div className="logo-wrapper">
          <Link to="/" >
            <img src={logo} alt='Not found' />
          </Link>
        </div>
        <span className="main-title">Contacts</span>
      </div>
      <div className="submit-btn">
        <Link to="/add">
          <span><AiOutlinePlus size={15} /></span>Create Contact
        </Link>
      </div>
      <div className="sidebar-menu">
        <ul>
          <Link to="/"><li><RiContactsLine size={18} /> Contacts <span>{contacts.length}</span></li></Link>
          <Link to="/favoritesContacts"><li><AiOutlineStar size={18} /> Favorites <span>{favoritesContacts.length}</span></li></Link>
        </ul>
        <div>Labels</div>
        <ul className="wrapper-table-sidebar">
          {labels.map((label, i) => (
            <Link to={"/contactByLabel/" + label.label} key={"label" + i}><li><BiLabel size={20} /><button onClick={() => dispatch(deleteLabel(label.id))}><RiDeleteBin6Line size={25} /></button>{label.label} <span>{contactPerLabel(label.label)}</span></li></Link>
          ))}
        </ul>
        <button className="create-label-btn" onClick={() => createLabelHandler()}><AiOutlinePlus size={15} />Create Label</button>
      </div>
      <InputModal open={showModal} close={setShowModal} title="Create Label" callback={createLabelCallBack} />
    </aside>
  )
}

export default SideBar;