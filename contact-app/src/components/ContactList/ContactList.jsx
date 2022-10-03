import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineStar } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';

import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { deleteContact, addRemoveContactFromFavorites,deleteContactFromFavorites } from '../../redux/slices/contact'

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
      user.name.toLowerCase().includes(searchInput.toLowerCase()) || user.email.toLowerCase().includes(searchInput.toLowerCase()) || user.phone.toLowerCase().includes(searchInput.toLowerCase())
    ))
  }

  const deleteHandler = (id) => {
    setDeletedID(id);
    setShowModal(true);
  }

  const deleteModalCallBack = () => {
    dispatch(deleteContact(deletedID))
    dispatch(deleteContactFromFavorites(deletedID))
  }

  const isInFavorites = (id) => {
    return favoritesContacts.includes(id);
  };

  return (
    <main className="ContactList">
      <div>
        <h2>Contacts</h2>
      </div>
      <table className="wrapper-table">
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
                <td><img src={`/avatars/${contact.img}.png`} /><span className="contact-name">{contact.name}</span></td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td className="table-control">
                    <button onClick={() => dispatch(addRemoveContactFromFavorites(contact.id))}><AiOutlineStar size={25} style={{color: isInFavorites(contact.id) ? 'red' : 'inherit'}}/></button>
                    <button onClick={() => deleteHandler(contact.id)}><RiDeleteBin6Line size={25} /></button>
                    <Link to={`/edit/${contact.id}`}><FiEdit2 size={25} /></Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <ConfirmModal open={showModal} close={setShowModal} title="Delete contact" message="Are you sure you want to delete this contact?" callback={deleteModalCallBack} withIcon={true} />
    </main>
  )
}

export default ContactList;