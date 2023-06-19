import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { requestfunc, userfunc } from '../Redux/Index';
import Card from './Card';
export default function Saved({ index, funcprop }) {
  const [mess, setMess] = useState([]);
  const [elem, setElem] = useState(null);
  let location = useLocation();
  let dispach = useDispatch();
  let redux = useSelector((redux) => redux.home.value);

  useEffect(() => {
    getdata();
  }, [redux.request || location.pathname]);

  async function getdata(params) {
    try {
      let getdata = await axios(
        `https://645673d55f9a4f2361448ff9.mockapi.io/Saved-Messages`,
      );
      getdata.data.map((item) => {
        if (item.name === redux.gmail.displayName) {
          setMess(item);
        }
      });
    } catch (e) {
      console.log(e);
    }

    setElem(
      <>
        <div className="last">
          {mess.message[mess.message.length - 1]?.message != '' ? (
            <div style={{ textDecoration: 'none' }}>
              {mess.message[mess.message.length - 1]?.message}
            </div>
          ) : mess.message[mess.message.length - 1]?.img.images.length > 0 ? (
            <div className="flex">
              <div className="img" style={{ display: 'flex' }}>
                {mess.message[mess.message.length - 1]?.img.images.map((item, index) => {
                  if (index < 2) {
                    return <img width={'20px'} src={item} alt="image" />;
                  }
                })}
              </div>
              <div style={{ textDecoration: 'none' }} className="text">
                Photo
              </div>
            </div>
          ) : (
            <div style={{ textDecoration: 'none' }}>voice</div>
          )}
        </div>
      </>,
    );
  }
  const hover = (event, index) => {
    const option = document.querySelectorAll('.userbox .optionboxuser');
    option.forEach((item) => {
      item.style.display = 'none';
    });
    option[0].style.display = 'inline-block';
  };
  function event(params) {
    dispach(
      userfunc({
        img: 'https://static6.tgstat.ru/channels/_0/3b/3bdc7810ebf4c3de0646923f39267695.jpg',
        name: 'Saved Messages',
      }),
    );
    const element = document.querySelector('.messbox');
    element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
    const option = document.querySelectorAll('.userbox .optionboxuser');
    option.forEach((item) => {
      item.style.display = 'none';
    });
    funcprop();
  }

  return (
    <>
      <Card id={1} status={'saved'} />

      <motion.div whileTap={{ scale: 1.1 }}>
        <Link to={`rooms/Saved-Messages/${mess.id}`} style={{ textDecoration: 'none' }}>
          <div
            className="user"
            title={'Saved Messages'}
            style={{
              backgroundColor:
                location.pathname.slice(7, 21) == 'Saved-Messages'
                  ? '#33394144'
                  : 'inherit',
            }}
            onContextMenu={(e) => hover(e, index)}
            onClick={event}
          >
            <div className="avatar">
              <img
                src={
                  'https://static6.tgstat.ru/channels/_0/3b/3bdc7810ebf4c3de0646923f39267695.jpg'
                }
                alt="profile"
              />
            </div>
            <div className="infobox">
              <div className="name">{'Saved Messages'}</div>
              {elem}
            </div>
          </div>
        </Link>
      </motion.div>
    </>
  );
}
