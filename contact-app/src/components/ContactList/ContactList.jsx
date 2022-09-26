import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineStar } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';

import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { deleteContact } from '../../redux/slices/contact'

const ContactList = () => {

  const dispatch = useDispatch();
  const { searchInput } = useSelector((state) => state.searchInput);
  const { contacts } = useSelector((state) => state.contacts);
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [deletedID, setDeletedID] = useState("");
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="ContactList">
      <table>
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
                <td>{contact.number}</td>
                <td>
                  <button><AiOutlineStar /> Favorites</button>
                  <button onClick={() => deleteHandler(contact.id)}>Delete <RiDeleteBin6Line /></button>
                  <Link to={`/edit/${contact.id}`}><FiEdit2 /></Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <ConfirmModal open={showModal} close={setShowModal} title="Delete contact" message="Are you sure you want to delete this contact?" callback={deleteModalCallBack} />
    </div>
  )
}

export default ContactList;