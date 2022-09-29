import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { MultiSelect } from "react-multi-select-component";

import { addContact } from '../../redux/slices/contact';

import './CreateContact.scss';

const CreateContact = () => {

  const [selectedLabel, setSelectedLabel] = useState([]);
  const { contacts } = useSelector((state) => state.contacts);
  const { labels } = useSelector((state) => state.labels);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = Date.now();
  const [formState, setFormState] = useState({
    id,
    name: '',
    email: '',
    phone: '',
    labels: []
  });

  const onChangeHandler = (e) => {
    setFormState(currentState => ({ ...currentState, [e.target.name]: e.target.value }))
  };

  const createNewContact = () => {
    dispatch(addContact(formState));
    navigate('/')
  };

  useEffect(() => {
    setFormState(prev => ({ ...prev, labels: selectedLabel.map((label, i) => label.label) }))
  }, [selectedLabel])


  const options = labels.map((label, i) => (
    { label: label.label, value: label.id }
  ))

  return (
    <div className="Home CreateContact">
      <h2>Create Contact</h2>
      <div className="form-group">
        <label>Upload Photo</label>
        <input type="file" />
      </div>
      <MultiSelect
        options={options}
        value={selectedLabel}
        onChange={setSelectedLabel}
        labelledBy="Select"
      />
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
        <Link to="/"><button className="cancelBtn">Cancel</button></Link>
        <button className="submitBtn" onClick={createNewContact}>Create</button>
      </div>
    </div>
  )
}

export default CreateContact;