import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import '../../Style/Home.scss';
import profile from './photo_۲۰۲۱-۱۰-۲۳_۲۲-۵۰-۳۳.jpg';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Header({ showfunc2, showfunc, funcprop }) {
  let loc = useLocation();
  let [name, setname] = useState('Dev Job');
  let redux = useSelector((redux) => redux.home.value);
  useEffect(() => {
    setname(redux.user.name);
  }, [loc.pathname]);

  return (
    <>
      <div className="infobox" onClick={showfunc}>
        <div className="avatar">
          <img
            width={name == 'Saved Messages' ? '40px' : '47px'}
            src={!redux.user.img ? profile : redux.user.img}
            alt="profile"
          />
        </div>
        <div className="namebox">
          <div className="name">{name ? name : redux.gmail.displayName}</div>
          <div className="time">
            {name == 'Saved Messages' ? '' : 'last seen recently'}
          </div>
        </div>
      </div>
      <div className="menuicon">
        <ion-icon name="menu" onClick={funcprop}></ion-icon>
      </div>
      <div className="iconbox">
        <div className="search">
          <ion-icon name="search-outline"></ion-icon>
        </div>
        <div className="file" onClick={showfunc2}>
          <ion-icon name="journal-outline"></ion-icon>
        </div>
        <div className="more">
          <ion-icon name="ellipsis-vertical"></ion-icon>
        </div>
      </div>
    </>
  );
}
