import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { requestfunc, userfunc } from '../Redux/Index';
import Card from './Card';
export default function Motion({ id, name, index, funcprop }) {
  const [seed, setSeed] = useState('');
  const [mess, setMess] = useState([]);
  const [elem, setElem] = useState(null);
  let location = useLocation();
  let dispach = useDispatch();
  let redux = useSelector((redux) => redux.home.value);

  useEffect(() => {
    getdata();
  }, [redux.allmessage || location.pathname]);

  useEffect(() => {
    setSeed(
      `https://avatars.dicebear.com/api/adventurer/${Math.floor(
        Math.random() * 5000,
      )}.svg`,
    );
  }, []);

  async function getdata(params) {
    try {
      let getdata = await axios(
        `https://6437f5e2c1565cdd4d6274f2.mockapi.io/telegram/${id}`,
      );
      setMess(getdata.data);
    } catch (e) {
      console.log(e);
    }

    setElem(
      <>
        <div className="last">
          {redux?.allmessage[mess.message.length - 1]?.message != '' ? (
            <div className="text-message" style={{ textDecoration: 'none' }}>
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
    option[index].style.display = 'inline-block';
  };
  function event(params) {
    dispach(userfunc({ img: seed, name: name }));
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
      <Card id={id} status={'chat'} />
      <motion.div whileTap={{ scale: 1.2 }}>
        {name && (
          <Link to={`rooms/${id}`} style={{ textDecoration: 'none' }}>
            <div
              className="user"
              title={name}
              style={{
                backgroundColor:
                  id === location.pathname.slice(7) ? '#33394144' : 'inherit',
              }}
              onContextMenu={(e) => hover(e, index)}
              onClick={event}
            >
              <div className="avatar">
                <img src={seed} alt="profile" className="user-photo-profile" />
              </div>
              <div className="infobox">
                <div className="name">{name}</div>
                {elem}
              </div>
            </div>
          </Link>
        )}
      </motion.div>
    </>
  );
}
