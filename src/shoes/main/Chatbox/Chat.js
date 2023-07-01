import { Suspense, lazy } from 'react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import axios from 'axios';

import './Style/Chat.css';
import Edite from './Footer/Edite';
import Loading from './Body/Loading/Loading';
import { allmessagefunc } from '../Redux/Index';
const Header = lazy(() => import('./Header/Header'));
const Message = lazy(() => import('./Body/Messagebox/Message'));
const Profile = lazy(() => import('./Body/Profile/Profile'));
const Send = lazy(() => import('./Footer/Send'));
const Reply = lazy(() => import('./Footer/Reply'));

export default function Chat({ funcprop, showfunc2 }) {
  const [show, setShow] = useState(false);
  const [mess, setMess] = useState([]);
  let location = useLocation();
  let redux = useSelector((redux) => redux.home.value);
  let dispach = useDispatch();
  function showfunc(params) {
    setShow(!show);
  }

  useEffect(() => {
    getdata();
  }, [redux.request || location.pathname]);
  async function getdata(params) {
    try {
      let getdata = await axios(
        location.pathname.slice(7, 21) !== 'Saved-Messages'
          ? `https://6437f5e2c1565cdd4d6274f2.mockapi.io/telegram/${location.pathname.slice(
              7,
            )}`
          : `https://645673d55f9a4f2361448ff9.mockapi.io/Saved-Messages/${location.pathname.slice(
              21,
            )}`,
      );
      setMess(getdata.data);
      dispach(allmessagefunc(getdata.data.message));
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <div className="chatbox" style={{ height: '100%' }}>
        <div id="wave"></div>
        <Suspense fallback={<Loading />}>
          <div className="header">
            <Header showfunc2={showfunc2} showfunc={showfunc} funcprop={funcprop} />
          </div>
          <Message mess={mess} />
          {redux.replyshow && (
            <div className="replybox">
              <Reply mess={mess} />
            </div>
          )}

          {redux.editeshow && (
            <div className="editebox">
              <Edite mess={mess} />
            </div>
          )}
          <Send />
          {show && (
            <Profile mess={mess} showfunc={showfunc} classprop="profileboxabsolute" />
          )}
        </Suspense>
      </div>
    </>
  );
}
