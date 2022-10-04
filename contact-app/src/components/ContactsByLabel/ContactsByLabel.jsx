import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineStar } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi'

import ConfirmModal from "../ConfirmModal/ConfirmModal";

import { addRemoveContactFromFavorites, removeLabelFromUser } from '../../redux/slices/contact'

const ContactsByLabel = () => {

  const [deletedID, setDeletedID] = useState("");
  const { contacts, favoritesContacts } = useSelector((state) => state.contacts);
  const { label } = useParams();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { searchInput } = useSelector((state) => state.searchInput);
  const contactPerLabel = contacts.filter(contact => contact.labels.includes(label));
  const [filteredContactsPerLabel, setFilteredContactsPerLabel] = useState([]);

  useEffect(() => {
    if (searchInput.length === 0) {
      setFilteredContactsPerLabel(contactPerLabel);
    }
    else {
      filteredUsers();
    }
  }, [searchInput])

  useEffect(() => {
    setFilteredContactsPerLabel(contacts.filter(contact => contact.labels.includes(label)))
  }, [contacts, label])


  const isInFavorites = (id) => {
    return favoritesContacts.includes(id);
  };

  const deleteHandler = (id) => {
    setDeletedID(id);
    setShowModal(true);
  }

  const deleteModalCallBack = () => {
    dispatch(removeLabelFromUser({ id: deletedID, label: label }));
  }

  const filteredUsers = () => {
    setFilteredContactsPerLabel(contactPerLabel.filter((user) =>
      user.name.toLowerCase().includes(searchInput.toLowerCase()) || user.email.toLowerCase().includes(searchInput.toLowerCase()) || user.phone.toLowerCase().includes(searchInput.toLowerCase())
    ))
  }

  return (
    <main className="ContactList">
      <div>
        <h2>Contacts by Label</h2>
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
            filteredContactsPerLabel.map((contact, id) => (
              <tr key={id}>
                <td><img src={`/avatars/${contact.img}.png`} /><span className="contact-name">{contact.name}</span></td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td className="table-control">
                  <button onClick={() => dispatch(addRemoveContactFromFavorites(contact.id))}><AiOutlineStar size={25} style={{ color: isInFavorites(contact.id) ? 'red' : 'inherit' }} /></button>
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

export default ContactsByLabel;