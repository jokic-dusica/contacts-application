import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { addContact } from '../../redux/slices/contact';

import './CreateContact.scss';

const CreateContact = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = Date.now()
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

  // const getBase64 = (file) => {
  //   return new Promise((resolve,reject) => {
  //      const reader = new FileReader();
  //      reader.onload = () => resolve(reader.result);
  //      reader.onerror = error => reject(error);
  //      reader.readAsDataURL(file);
  //   });
  // }

  // const imageUploadHandler = (e) => {
  //   const file = e.target.files[0];
  //   console.log("FIle",file)
  //   getBase64(file).then(base64 => {
  //     localStorage["fileBase64"] = base64;
  //   });
  // }

  return (
    <div className="Home CreateContact">
      <h2>Create Contact</h2>
      <div className="form-group">
        <label>Upload Photo</label>
        {/* <input type="file" onChange={imageUploadHandler}/> */}
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
        <Link to="/"><button className="cancelBtn">Cancel</button></Link>
        <button className="submitBtn" onClick={createNewContact}>Create</button>
      </div>
    </div>
  )
}

export default CreateContact;