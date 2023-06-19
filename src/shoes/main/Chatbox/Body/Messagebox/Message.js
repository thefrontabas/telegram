import React, { useEffect, useState } from 'react';
import Messagecontent from './Messagecontent';
import './Style/Message.css';
export default function Message({ mess }) {
  const [elem, setElem] = useState(null);

  useEffect(() => {
    setElem(<Messagecontent mess={mess} />);
  }, [mess]);
  return (
    <div className="messbox">
      <div className="messback">{elem}</div>
    </div>
  );
}
