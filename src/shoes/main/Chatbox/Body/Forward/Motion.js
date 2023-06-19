import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Motion({ id, name, active }) {
  const [seed, setSeed] = useState('');


  useEffect(() => {
    setSeed(
      `https://avatars.dicebear.com/api/adventurer/${Math.floor(
        Math.random() * 5000,
      )}.svg`,
    );
  }, []);

  return (
    <>
      <motion.div whileTap={{ scale: 1.1 }}>
        {name && (
          <div className="user" title={name} onClick={() => active(seed, name, id)}>
            <div className="avatar">
              <img src={seed} alt="profile" className="user-photo-profile" />
            </div>
            <div className="infobox">
              <div className="name">{name}</div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
