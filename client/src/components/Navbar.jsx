import { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="navbar is-dark">
        <Link id='home-name' className="navbar-item" to='/'>
          Digital Nomads
        </Link>
      </div>
      <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
        <div id="navbar" className="navbar-menu navbar-end">
          <div className="navbar-end">
            <Link id="link" className="navbar-item" to='/'>
              Home 
            </Link>
            {/* if user is logged in show saved cities and logout */}
            {Auth.loggedIn() ? (
              <>
                <Link id="link" className="navbar-item" to='/saved'>
                  Profile/Saved
                </Link>
                <a id="link" className="navbar-item" onClick={Auth.logout}>Logout</a>
              </>
            ) : (
              <a id="link" className="navbar-item" onClick={() => setShowModal(true)}>Login/Sign Up</a>
            )}
          </div>
        </div>
      </nav>
      {/* set modal data up */}
      {showModal && (
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setShowModal(false)}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Login/Sign Up</p>
              <button className="delete" aria-label="close" onClick={() => setShowModal(false)}></button>
            </header>
            <section className="modal-card-body">
              <LoginForm handleModalClose={() => setShowModal(false)} />
              <SignUpForm handleModalClose={() => setShowModal(false)} />
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default AppNavbar;