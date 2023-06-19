import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export default function Saved({ active }) {
  const [id, setId] = useState('');
  const [elem, setElem] = useState(null);
  let location = useLocation();
  let dispach = useDispatch();
  let redux = useSelector((redux) => redux.home.value);

  useEffect(() => {
    getdata();
  }, [redux.forwardshow]);
  async function getdata(params) {
    try {
      let getdata = await axios(
        `https://645673d55f9a4f2361448ff9.mockapi.io/Saved-Messages`,
      );
      getdata.data.map((item) => {
        if (item.name === redux.gmail.displayName) {
          setId(item.id);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <motion.div whileTap={{ scale: 1.1 }}>
        <div
          className="user"
          title={'Saved Messages'}
          onClick={() => {
            active(
              'https://static6.tgstat.ru/channels/_0/3b/3bdc7810ebf4c3de0646923f39267695.jpg',
              'Saved',
              id,
            );
          }}
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
          </div>
        </div>
      </motion.div>
    </>
  );
}
