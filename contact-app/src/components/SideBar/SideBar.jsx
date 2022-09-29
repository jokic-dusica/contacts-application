import logo from '../../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import { RiContactsLine } from 'react-icons/ri';
import { AiOutlineStar, AiOutlinePlus } from 'react-icons/ai';

import { createLabel } from '../../redux/slices/labels'

import './SideBar.scss';
import { useState } from 'react';
import InputModal from '../InputModal/InputModal';

const SideBar = () => {

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { contacts, favoritesContacts } = useSelector((state) => state.contacts);
  const { labels } = useSelector((state) => state.labels);

  const createLabelHandler = () => {
    setShowModal(true);
  }

  const createLabelCallBack = (label) => {
    dispatch(createLabel({ id: Date.now(), label }))
  }

  const contactPerLabel = (label) => {
    return contacts.filter(contact => contact.labels.includes(label)).length;
  }

  return (
    <aside className="SideBar">
        <div>
          <div className="logoWrapper">
            <Link to="/" >
              <img src={logo} alt='Not found' />
            </Link>
          </div>
          <span className="mainTitle">Contacts</span>
        </div>
        <div className="submitBtn">
          <Link to="/add" className="">
            <span><AiOutlinePlus size={15} /></span>Create Contact
          </Link>
        </div>
        <div className="sidebarMenu">
          <ul>
            <Link to="/"><li><RiContactsLine size={18} /> Contacts <span>{contacts.length}</span></li></Link>
            <Link to="/favoritesContacts"><li><AiOutlineStar size={18} /> Favorites <span>{favoritesContacts.length}</span></li></Link>
          </ul>
          <div>Labels</div>
          <ul>
            {labels.map((label, i) => (
              <Link to={"/contactByLabel/"+label.label} key={"label" + i}><li>{label.label} {contactPerLabel(label.label)}</li></Link>
            ))}
          </ul>
          <button className="create-label-btn" onClick={() => createLabelHandler()}><AiOutlinePlus size={15} />Create Label</button>
        </div>
        <InputModal open={showModal} close={setShowModal} title="Create Label" callback={createLabelCallBack} />
    </aside>
  )
}

export default SideBar;