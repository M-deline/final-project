import { useState } from 'react';
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      console.error(error);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div>
      {showAlert && <div className="notification is-danger">Something went wrong with your signup!</div>}

      <form onSubmit={handleFormSubmit}>
        <h1 className='title is-2'>Sign Up</h1>
        <div className="field">
          <label className="label" htmlFor='username'>Username</label>
          <div className="control">
            <input
              className='input'
              type='text'
              placeholder='Your username'
              name='username'
              onChange={handleInputChange}
              value={userFormData.username}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor='email'>Email</label>
          <div className="control">
            <input
              className='input'
              type='email'
              placeholder='Your email address'
              name='email'
              onChange={handleInputChange}
              value={userFormData.email}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor='password'>Password</label>
          <div className="control">
            <input
              className='input'
              type='password'
              placeholder='Your password'
              name='password'
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
          </div>
        </div>

        <div className="control">
          <button
            className={`button is-success ${!(userFormData.username && userFormData.email && userFormData.password) ? 'is-disabled' : ''}`}
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;