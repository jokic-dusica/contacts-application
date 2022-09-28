import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineStar } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';

import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { deleteContact, addContactToFavorites } from '../../redux/slices/contact'

import './ContactList.scss'

const ContactList = () => {

  const dispatch = useDispatch();
  const { searchInput } = useSelector((state) => state.searchInput);
  const { contacts,favoritesContacts } = useSelector((state) => state.contacts);
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [deletedID, setDeletedID] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setFilteredContacts(contacts);
  }, [contacts])

  useEffect(() => {
    if (searchInput.length === 0) {
      setFilteredContacts(contacts);
    }
    else {
      filteredUsers();
    }
  }, [searchInput])

  const filteredUsers = () => {
    setFilteredContacts(contacts.filter((user) =>
      user.name.toLowerCase().includes(searchInput.toLowerCase())
    ))
  }

  const deleteHandler = (id) => {
    setDeletedID(id);
    setShowModal(true);
  }

  const deleteModalCallBack = () => {
    dispatch(deleteContact(deletedID))
  }

  const isInFavorites = (id) => {
    const aa = !!favoritesContacts.find(item => item.id === id)
    console.log(aa)
    return aa;
  };

  return (
    <div className="ContactList">
      <div>
        <h2>Contacts</h2>
      </div>
      <table className="wrapperTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            filteredContacts.map((contact, id) => (
              <tr key={id}>
                <td><img src={`/avatars/${contact.img}.png`} />{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <span>
                    <button onClick={() => dispatch(addContactToFavorites({ id: contact.id, name: contact.name, email: contact.email, phone: contact.phone }))}><AiOutlineStar size={20} style={{color: isInFavorites(contact.id) ? 'yellow' : 'inherit'}}/></button>
                  </span>
                  <span>
                    <button onClick={() => deleteHandler(contact.id)}><RiDeleteBin6Line size={20} /></button>
                  </span>
                  <span>
                    <Link to={`/edit/${contact.id}`}><FiEdit2 size={20} /></Link>
                  </span>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <ConfirmModal open={showModal} close={setShowModal} title="Delete contact" message="Are you sure you want to delete this contact?" callback={deleteModalCallBack} withIcon={true} />
    </div>
  )
}

export default ContactList;