import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { editContact } from '../../redux/slices/contact';

import './EditContact.scss';

const EditContact = () => {

  const { id, referer } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contacts } = useSelector(state => state.contacts);
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
    }
  }, [editTarget])


  const onChangeHandler = (e) => {
    setFormState(currentState => ({ ...currentState, [e.target.name]: e.target.value }))
  };

  const editedTarget = (e) => {
    e.preventDefault();
    dispatch(editContact(formState));
    navigate(-1)
  }

  return (
    <div className="Home EditContact">
      {/* <div className="container">
        <div className="row"> */}
      {editTarget ? (
        <div>
          <h2>Edit Contact</h2>
          <form>
            <div className="form-group">
              <label>Upload Photo</label>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Name" name="name" value={formState.name} className="form-control" onChange={onChangeHandler} />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Email address" name="email" value={formState.email} className="form-control" onChange={onChangeHandler} />
            </div>
            <div className="form-group">
              <input type="number" placeholder="Phone number" name="phone" value={formState.phone} className="form-control" onChange={onChangeHandler} />
            </div>
            <div>
              <Link to="/"><button className="cancelBtn">Cancel</button></Link>
              <button className="submitBtn" onClick={editedTarget}>Save</button>
            </div>
          </form>
        </div>
      ) : (<h3>Contact with {id} id is not exist</h3>)
      }
      {/* </div>
      </div> */}
    </div>
  )
}

export default EditContact