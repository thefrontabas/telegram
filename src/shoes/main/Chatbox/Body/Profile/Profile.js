import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import profile from './photo_۲۰۲۱-۱۰-۲۳_۲۲-۵۰-۳۳.jpg';
import { linkfunc } from '../../../Redux/Index';
import './Profile.css';

export default function Profile({ showfunc, mess, classprop }) {
  const [text, setText] = useState([]);
  const [show, setShow] = useState(true);
  let redux = useSelector((redux) => redux.home.value);
  let dispatch = useDispatch();
  useEffect(() => {
    setText(mess);
  }, []);

  function imgfunc(item) {
    dispatch(linkfunc(item.img.images[0]));
    setTimeout(() => {
      let target = document.querySelector('.anim-photo');
      let size = target?.getBoundingClientRect();
      document.querySelector('.messbox').scrollTo({ top: size.top, behavior: 'smooth' });
      dispatch(linkfunc(''));
    }, 2000);
  }

  return (
    <div className={`${classprop}`}>
      {show ? (
        <div className="profile-infomain">
          <div className="headerprofile">
            <div>User Info</div>
            <div className="icon">
              <ion-icon name="close" onClick={showfunc}></ion-icon>
            </div>
          </div>

          <div className="infobox">
            <div className="firstbox">
              <div className="avatar">
                <img src={!redux.user.img ? profile : redux.user.img} alt="profile" />
              </div>
              <div className="namebox">
                <div className="name">{redux.user.name}</div>
                <div className="seen">
                  {' '}
                  {redux.user.name == 'Saved Messages' ? '' : 'last seen recently'}
                </div>
              </div>
            </div>
            <div className="twobox">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  width={'30px'}
                  onClick={showfunc}
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="1.5"
                    d="M8.696 9.058h6.032m-6.032 3.456h3.839m.576 6.413h1.061c2.887 0 5.398-2.077 6.076-5.025a9.955 9.955 0 0 0 0-4.455l-.09-.386c-.652-2.841-2.781-5.049-5.494-5.698l-.381-.092a9.853 9.853 0 0 0-4.593 0l-.224.054c-2.81.672-5.014 2.959-5.69 5.901-.37 1.61-.367 3.303.003 4.912.687 2.989 2.708 5.476 5.419 6.635l.118.05c1.173.502 2.517-.102 2.998-1.333a.866.866 0 0 1 .797-.563Z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="ideabox">
            <div
              className="idea-image-box"
              onClick={() => {
                setShow(false);
              }}
            >
              <div className="icon">
                <ion-icon name="image-outline"></ion-icon>
              </div>
              <div className="text">
                {text?.message?.filter((item) => item.img.images.length > 0).length}{' '}
                Photos
              </div>
            </div>
            <div className="idea-image-box">
              <div className="icon">
                <ion-icon name="chatbubble-ellipses-outline"></ion-icon>{' '}
              </div>
              <div className="text">{mess?.message?.length} Messages</div>
            </div>

            <div className="idea-image-box">
              <div className="icon">
                <ion-icon name="mic-outline"></ion-icon>
              </div>
              <div className="text">
                {' '}
                {text?.message?.filter((item) => item.voice).length} Voice Messages
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="profile-photo">
          <div className="headerprofile">
            <div className="first">
              <div
                className="icon"
                onClick={() => {
                  setShow(true);
                }}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </div>
              <div className="text">Photos</div>
            </div>
            <div className="icon">
              <ion-icon name="close" onClick={showfunc}></ion-icon>
            </div>
          </div>
          <div className="imgflex">
            {text?.message
              ?.filter((item) => item.img.images.length > 0)
              .map((index) => {
                return (
                  <div className="image" onClick={showfunc}>
                    <img
                      onClick={() => imgfunc(index)}
                      src={index.img.images[0]}
                      alt="image"
                      title={new Date(index.time).toUTCString()}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
