import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineStar } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';

import ConfirmModal from "../ConfirmModal/ConfirmModal";

import { deleteContactFromFavorites } from '../../redux/slices/contact';

const FavoritesContactsList = () => {

  const dispatch = useDispatch();
  const [deletedID, setDeletedID] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { favoritesContacts,contacts } = useSelector((state) => state.contacts);
  const favoriteList = contacts.filter(contact => favoritesContacts.includes(contact.id));

  const deleteHandler = (id) => {
    setDeletedID(id);
    setShowModal(true);
  }

  const deleteModalCallBack = () => {
    dispatch(deleteContactFromFavorites(deletedID))
  }

  return (
    <div className="ContactList">
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
            favoriteList.map((favContact, id) => (
              <tr key={id}>
                <td><img src={`/avatars/${favContact.img}.png`} />{favContact.name}</td>
                <td>{favContact.email}</td>
                <td>{favContact.phone}</td>
                <td>
                  <span><button onClick={() => deleteHandler(favContact.id)}><AiOutlineStar style={{color:"red"}}/></button></span>
                  <span><button onClick={() => deleteHandler(favContact.id)}><RiDeleteBin6Line size={20} /></button></span>
                  <span>
                    <Link to={`/edit/${favContact.id}`}><FiEdit2 size={20} /></Link>
                  </span>
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