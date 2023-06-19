import React, { useState, Suspense } from 'react';

import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Options from './Optionbox/Options';
import { requestfunc } from '../../Redux/Index';
import './Reactbox.css';
export default function Reactbox({
  message,
  image,
  voice,
  time,
  name,
  toastfunc,
  caption,
  replymessage,
  replyid,
  react,
  edite,
}) {
  const [messagearr, setMessagearr] = useState([]);
  let loc = useLocation();
  let array = ['😂', '😍', '😱', '😭', '🤬', '🔥', '💩', '🤮', '🖐️', '🙏', '💪'];
  let redux = useSelector((redux) => redux.home.value);
  let dispach = useDispatch();
  async function send(time, name, icon) {
    try {
      let getdata = await axios(
        loc.pathname.slice(7, 21) !== 'Saved-Messages'
          ? `https://6437f5e2c1565cdd4d6274f2.mockapi.io/telegram/${loc.pathname.slice(
              7,
            )}`
          : `https://645673d55f9a4f2361448ff9.mockapi.io/Saved-Messages/${loc.pathname.slice(
              21,
            )}`,
      );
      setMessagearr(getdata.data.message);
      let find = messagearr.filter((item) => item.time === time);
      if (name === redux.gmail.displayName) {
        find[0].react = [{ send: icon, daryaft: find[0].react[0].daryaft }];
        try {
          let res = await axios.put(
            loc.pathname.slice(7, 21) !== 'Saved-Messages'
              ? `https://6437f5e2c1565cdd4d6274f2.mockapi.io/telegram/${loc.pathname.slice(
                  7,
                )}`
              : `https://645673d55f9a4f2361448ff9.mockapi.io/Saved-Messages/${loc.pathname.slice(
                  21,
                )}`,
            { message: [...messagearr] },
          );
        } catch (e) {
          console.log(e);
        }
      } else {
        find[0].react = [{ send: find[0].react[0].send, daryaft: icon }];
        try {
          let res = await axios.put(
            loc.pathname.slice(7, 21) !== 'Saved-Messages'
              ? `https://6437f5e2c1565cdd4d6274f2.mockapi.io/telegram/${loc.pathname.slice(
                  7,
                )}`
              : `https://645673d55f9a4f2361448ff9.mockapi.io/Saved-Messages/${loc.pathname.slice(
                  21,
                )}`,
            { message: [...messagearr] },
          );
        } catch (e) {
          console.log(e);
        }
      }
      setTimeout(() => {
        dispach(requestfunc(!redux.request));
      }, 12000);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="optionbox">
        <div className="reactbox">
          <div className="reactback">
            {array.map((arr) => (
              <div onClick={() => send(time, name, arr)} className="anim">
                {arr}
              </div>
            ))}
          </div>
        </div>
        <Suspense fallback={<h3>Loading....</h3>}>
          <Options
            message={message}
            name={name}
            toastfunc={toastfunc}
            time={time}
            image={image}
            voice={voice}
            caption={caption}
            replymessage={replymessage}
            replyid={replyid}
            react={react}
            edite={edite}
          />
        </Suspense>
      </div>
    </>
  );
}
