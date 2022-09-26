import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import {editContact} from '../../redux/slices/contact';

const EditContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const {id} = useParams();

  const {contacts} = useSelector(state => state.contacts);
  const dispatch = useDispatch();
  const currentContact = contacts.find(contact => contact.id === parseInt(id));

  const editContact = (id) => {
    dispatch(editContact(id))
  }
  

  return (
    <div className="container">
        <div className="row">
          {currentContact ? (
            <>
              <h1>Edit Contact {id}</h1>
              <form>
                  <div className = "form-group">
                      <label>Upload Photo</label>
                      <input type="file" className="form-control"/>
                    </div>
                  <div className="form-group">
                    <input type="text" placeholder="Name" className="form-control"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Email address" className="form-control"/>
                  </div>
                  <div className="form-group">
                    <input type="number" placeholder="Phone number" className="form-control"/>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="form-control" onClick={editContact}>Save</button>
                  </div>
                  <Link to="/">Cancel</Link>
              </form> 
            </>
           ) : (<h3>Contact with {id} id is not exist</h3>)
          }
            
        </div>
    </div>
  )
}

export default EditContact