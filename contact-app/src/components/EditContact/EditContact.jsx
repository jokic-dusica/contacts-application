import { useEffect, useState } from 'react'
import { MultiSelect } from 'react-multi-select-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { editContact } from '../../redux/slices/contact';

import './EditContact.scss';

const EditContact = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedLabel, setSelectedLabel] = useState([]);
  const { contacts } = useSelector(state => state.contacts);
  const { labels } = useSelector((state) => state.labels);
  const editTarget = contacts.find(contact => contact.id === parseInt(id));
  const [formState, setFormState] = useState({
    id: "",
    name: '',
    email: '',
    phone: '',
    labels: []
  });


  useEffect(() => {
    if (editTarget) {
      setFormState(editTarget)
      const selectedLabels = labels.filter(label => editTarget.labels.includes(label.label))
      const formated = selectedLabels.map((selLabel) => ({ label: selLabel.label, value: selLabel.id }))
      setSelectedLabel(formated)
    }
  }, [])

  useEffect(() => {
    setFormState(prev => ({ ...prev, labels: selectedLabel.map((label, i) => label.label) }))
  }, [selectedLabel])

  const options = labels.map((label, i) => (
    { label: label.label, value: label.id }
  ))

  const onChangeHandler = (e) => {
    setFormState(currentState => ({ ...currentState, [e.target.name]: e.target.value }))
  };

  const editedTarget = (e) => {
    e.preventDefault();
    dispatch(editContact(formState));
    navigate(-1)
  }

  if (!editTarget) return (<h3>Contact with {id} id is not exist</h3>);
  
  return (
    <div className="EditContact">
      <div>
        <h2>Edit Contact</h2>
        <div className="wrapper-contact">
          <div className="wrapper-input">
            <label>Photo</label>
            <input type="file" />
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
              <input type="text" name="name" value={formState.name} className="form-control" onChange={onChangeHandler} />
            </div>
            <div className="">
              <label>Email address</label>
              <input type="text" name="email" value={formState.email} className="form-control" onChange={onChangeHandler} />
            </div>
            <div className="">
              <label>Phone number</label>
              <input type="number" name="phone" value={formState.phone} className="form-control" onChange={onChangeHandler} />
            </div>
            <div className="button-wrapper">
              <Link to="/"><button className="cancel-btn">Cancel</button></Link>
              <button className="submit-btn" onClick={editedTarget}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditContact