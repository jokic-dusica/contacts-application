import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { editContact } from '../../redux/slices/contact';

const EditContact = () => {

  const { id } = useParams();
  //const id = (Math.random() + 1).toString(36).substring(2);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contacts } = useSelector(state => state.contacts);
  const currentContact = contacts.find(contact => contact.id === parseInt(id));
  console.log("id id", id)
  const [formState, setFormState] = useState({
    id,
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (currentContact) {
      setFormState({
        id: currentContact.id,
        name: currentContact.name,
        email: currentContact.email,
        phone: currentContact.phone
      })
    }
  }, [currentContact])


  const onChangeHandler = (e) => {
    setFormState(currentState => ({ ...currentState, [e.target.name]: e.target.value }))
  };

  const editCurrentContact = (e) => {
    e.preventDefault();
    dispatch(editContact({ id: currentContact.id, name: formState.name, email: formState.email, phone: formState.phone }));
    navigate("/")
  }

  return (
    <div className="Home EditContact">
      <div className="container">
        <div className="row">
          {currentContact ? (
            <>
              <h1>Edit Contact {currentContact.id}</h1>
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
                <div className="form-group">
                  <button className="form-control" onClick={editCurrentContact}>Save</button>
                </div>
                <Link to="/">Cancel</Link>
              </form>
            </>
            ) : (<h3>Contact with {id} id is not exist</h3>)
          }
        </div>
      </div>
    </div>
  )
}

export default EditContact