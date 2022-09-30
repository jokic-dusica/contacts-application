import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineStar } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';

import { deleteContactFromFavorites } from '../../redux/slices/contact';

import ConfirmModal from "../ConfirmModal/ConfirmModal";

import './FavoritesContactsList.scss';

const FavoritesContactsList = () => {

  const dispatch = useDispatch();
  const [deletedID, setDeletedID] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { favoritesContacts, contacts } = useSelector((state) => state.contacts);
  const [filteredContacts, setFilteredContacts] = useState(favoritesContacts);
  const { searchInput } = useSelector((state) => state.searchInput);
  const favoriteList = contacts.filter(contact => favoritesContacts.includes(contact.id));

  const deleteHandler = (id) => {
    setDeletedID(id);
    setShowModal(true);
  }

  const deleteModalCallBack = () => {
    dispatch(deleteContactFromFavorites(deletedID))
  }

  useEffect(() => {
    setFilteredContacts(filteredContacts);
  }, [filteredContacts])

  useEffect(() => {
    setFilteredContacts(favoriteList)
  }, [favoritesContacts])

  useEffect(() => {
    if (searchInput.length === 0) {
      setFilteredContacts(favoriteList);
    }
    else {
      filteredUsers();
    }
  }, [searchInput])

  const filteredUsers = () => {
    setFilteredContacts(favoriteList.filter((user) =>
      user.name.toLowerCase().includes(searchInput.toLowerCase()) || user.email.toLowerCase().includes(searchInput.toLowerCase()) || user.phone.toLowerCase().includes(searchInput.toLowerCase())
    ))
  }

  return (
    <div className="FavoritesContactList">
      <div>
        <h2>Favorites</h2>
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
            filteredContacts.map((favContact, id) => (
              <tr key={id}>
                <td><img src={`/avatars/${favContact.img}.png`} /><span className="contact-name">{favContact.name}</span></td>
                <td>{favContact.email}</td>
                <td>{favContact.phone}</td>
                <td className="table-control">
                  <button onClick={() => deleteHandler(favContact.id)}><AiOutlineStar size={25} style={{ color: "red" }} /></button>
                  <button onClick={() => deleteHandler(favContact.id)}><RiDeleteBin6Line size={25} /></button>
                  <Link to={`/edit/${favContact.id}`}><FiEdit2 size={25} /></Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <ConfirmModal open={showModal} close={setShowModal} title="Delete contact" message="Are you sure you want to delete this contact from Favorites?" callback={deleteModalCallBack} withIcon={true} />
    </div>
  )
}

export default FavoritesContactsList;