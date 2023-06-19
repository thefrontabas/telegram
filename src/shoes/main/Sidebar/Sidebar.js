import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Style/Sidebar.scss';
import Userbox from './Userbox';
import { signOut } from 'firebase/auth';
import { auth } from '../../Database/Pack';
export default function Sidebar({ classname, funcprop }) {
  const [status, setStatus] = useState('');
  let redux = useSelector((redux) => redux.home.value);
  const navigate = useNavigate();

  function handle(params) {
    if (document.visibilityState == 'visible') {
      setStatus('online');
    } else {
      setStatus('');
    }
  }

  document.addEventListener('visibilitychange', handle);
  return (
    <div className={classname}>
      <div className="headbox">
        <div className="firstbox">
          <div className="profbox">
            <img
              src={redux.gmail.photoURL}
              alt="profile"
              onClick={() => {
                navigate('/');
                signOut(auth);
                window.location.reload();
              }}
            />
          </div>
          <div className="infobox">
            <div className="name">{redux.gmail.displayName}</div>
            <div className="seen">
              {!status
                ? `last seen
              ${new Date(redux.gmail.reloadUserInfo.lastRefreshAt).toLocaleTimeString()}`
                : status}
            </div>
          </div>
        </div>
        <div className="iconbox">
          <div class="inputfile-box">
            <input
              type="file"
              id="file"
              class="inputfile"
              accept="image/png, image/jpeg"
            />
            <label htmlFor="file">
              <span class="file-button">
                <ion-icon name="aperture"></ion-icon>
              </span>
            </label>
          </div>
          <div className="message">
            {classname === 'sidebarabsolute' ? (
              <ion-icon onClick={funcprop} name="close"></ion-icon>
            ) : (
              <ion-icon name="chatbox-ellipses"></ion-icon>
            )}
          </div>
        </div>
      </div>

      <div className="newchatbox">
        <Userbox  funcprop={funcprop}/>
      </div>
    </div>
  );
}
