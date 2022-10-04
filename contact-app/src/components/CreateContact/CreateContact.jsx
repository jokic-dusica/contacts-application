import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { MultiSelect } from "react-multi-select-component";

import { addContact } from '../../redux/slices/contact';

import './CreateContact.scss';

const CreateContact = () => {

  const [selectedLabel, setSelectedLabel] = useState([]);
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const { labels } = useSelector((state) => state.labels);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = Date.now();
  const [formState, setFormState] = useState({
    id,
    name: '',
    email: '',
    phone: '',
    labels: [],
    image: ''
  });

  useEffect(() => {
    setFormState(prev => ({ ...prev, labels: selectedLabel.map((label, i) => label.label) }))
  }, [selectedLabel])

  useEffect(() => {
    let fileReader;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result) {
          setFileDataURL(result);
        }
      }
      fileReader.readAsDataURL(file);
      console.log({ fileDataURL })
      setFormState(prev => ({ ...prev, image: fileDataURL }))
    }
  }, [file])

  const createNewContact = () => {
    dispatch(addContact(formState));
    navigate('/')
  };

  const onChangeHandler = (e) => {
    setFormState(currentState => ({ ...currentState, [e.target.name]: e.target.value }));
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setFile(file);
  }

  const options = labels.map((label, i) => (
    { label: label.label, value: label.id }
  ))

  return (
    <div className="CreateContact">
      <h2>Create Contact</h2>
      <div className="wrapper-contact">
        <div className="wrapper-input">
          <label>Photo</label>
          <div className="image-wrapper"><img src={fileDataURL} /></div>
          <input type="file"
            onChange={imageHandler}
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
            <input type="text" value={formState.name} name="name" onChange={onChangeHandler} />
          </div>
          <div className="">
            <label>Email address</label>
            <input type="text" value={formState.email} name="email" onChange={onChangeHandler} />
          </div>
          <div className="">
            <label>Phone number</label>
            <input type="number" value={formState.phone} name="phone" onChange={onChangeHandler} />
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