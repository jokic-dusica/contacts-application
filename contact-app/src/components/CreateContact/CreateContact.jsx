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
    <div className="CreateContact">
      <h2>Create Contact</h2>
      <div className="wrapper-contact">
        <div className="wrapper-input">
          <label>Photo</label>
          <input type="file" id='image'
            accept='.png, .jpg, .jpeg'
            //onChange={changeHandler}
            />       
          <MultiSelect
            options={options}
            value={selectedLabel}
            onChange={setSelectedLabel}
            labelledBy="Select"
          />
        </div>
        <div className="wrapper-form">
          <div className="">
            <label>Name</label>
            <input type="text" className="" value={formState.name} name="name" onChange={onChangeHandler} />
          </div>
          <div className="">
            <label>Email address</label>
            <input type="text" className="" value={formState.email} name="email" onChange={onChangeHandler} />
          </div>
          <div className="">
            <label>Phone number</label>
            <input type="number" className="" value={formState.phone} name="phone" onChange={onChangeHandler} />
          </div>
          <div className="button-wrapper">
            <Link to="/"><button className="cancel-btn">Cancel</button></Link>
            <button className="submit-btn" onClick={createNewContact}>Create</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateContact;