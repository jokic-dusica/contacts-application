import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { addContact } from '../../redux/slices/contact';

const CreateContact = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = (Math.random() + 1).toString(36).substring(2);
  const [formState, setFormState] = useState({
    id,
    name: '',
    email: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    setFormState(currentState => ({ ...currentState, [e.target.name]: e.target.value }))
  };

  const createNewContact = () => {
    dispatch(addContact(formState));
    navigate('/')
  };

  return (
    <div className="mainWrapper">
      <h1>Create Contact</h1>
      <div className="form-group">
        <label>Upload Photo</label>

      </div>
      <div className="form-group">
        <input type="text" placeholder="Name" className="form-control" value={formState.name} name="name" onChange={onChangeHandler} />
      </div>
      <div className="form-group">
        <input type="text" placeholder="Email address" className="form-control" value={formState.email} name="email" onChange={onChangeHandler} />
      </div>
      <div className="form-group">
        <input type="number" placeholder="Phone number" className="form-control" value={formState.phone} name="phone" onChange={onChangeHandler} />
      </div>
      <div className="form-group">
        <button className="form-control" onClick={createNewContact}>Create</button>
        <Link to="/">Cancel</Link>
      </div>
    </div>
  )
}

export default CreateContact;