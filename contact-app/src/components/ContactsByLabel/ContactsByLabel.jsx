import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addRemoveContactFromFavorites } from '../../redux/slices/contact'

import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineStar } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi'
import { useState } from "react";

const ContactsByLabel = () => {

    const { contacts,favoritesContacts } = useSelector((state) => state.contacts);
    const {label} = useParams();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const contactPerLabel = contacts.filter(contact => contact.labels.includes(label));
    const isInFavorites = (id) => {
        return !!favoritesContacts.find(item => item.id === id);
      };

    const deleteHandler = (id) => {
      setShowModal(true);
    }

    return (
        <main className="ContactList">
          <div>
            <h2>Contacts by Label</h2>
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
                contactPerLabel.map((contact, id) => (
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
        </main>
      )
}

export default ContactsByLabel;