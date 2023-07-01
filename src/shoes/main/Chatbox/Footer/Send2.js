import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import Voice from './Voice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import {
  allmessagefunc,
  editeshowfunc,
  idfunc,
  messagefunc,
  replyfunc,
  replyshowfunc,
  requestfunc,
} from '../../Redux/Index';
export default function Send2({ text, custom, toastfunc, textfunc }) {
  const [show, setShow] = useState(false);
  let redux = useSelector((redux) => redux.home.value);
  const [messagearr, setMessagearr] = useState([]);
  let location = useLocation();
  let dispach = useDispatch();

  async function sendmessage() {
    const data = {
      message: text,
      name: redux.gmail.displayName,
      img: { images: [], caption: '' },
      voice: '',
      time: new Date().getTime(),
      react: [{ send: '', daryaft: '' }],
      replymessage: redux.id !== '' ? true : false,
      replyid: redux.id !== '' ? redux.id : '',
      edite: false,
    };
    let getdata = await axios(
      location.pathname.slice(7, 21) !== 'Saved-Messages'
        ? `https://6437f5e2c1565cdd4d6274f2.mockapi.io/telegram/${location.pathname.slice(
            7,
          )}`
        : `https://645673d55f9a4f2361448ff9.mockapi.io/Saved-Messages/${location.pathname.slice(
            21,
          )}`,
    );
    if (!redux.editeshow) {
      try {
        let res = axios.put(
          location.pathname.slice(7, 21) !== 'Saved-Messages'
            ? `https://6437f5e2c1565cdd4d6274f2.mockapi.io/telegram/${location.pathname.slice(
                7,
              )}`
            : `https://645673d55f9a4f2361448ff9.mockapi.io/Saved-Messages/${location.pathname.slice(
                21,
              )}`,
          {
            message: [
              ...getdata.data.message,
              {
                ...data,
              },
            ],
          },
        );

        setTimeout(() => {
          dispach(requestfunc(!redux.request));
        }, 9000);
        textfunc('');
        dispach(replyfunc(''));
        dispach(allmessagefunc([...redux.allmessage, data]));
      } catch (e) {
        console.log(e);
      }
    } else {
      setMessagearr(getdata.data.message);
      let find = messagearr.filter((item) => item.time === redux.id);
      if (find[0].message) {
        find[0].message = text;
        find[0].edite = true;
      } else {
        find[0].img.caption = text;
        find[0].edite = true;
      }
      try {
        let res = axios.put(
          location.pathname.slice(7, 21) !== 'Saved-Messages'
            ? `https://6437f5e2c1565cdd4d6274f2.mockapi.io/telegram/${location.pathname.slice(
                7,
              )}`
            : `https://645673d55f9a4f2361448ff9.mockapi.io/Saved-Messages/${location.pathname.slice(
                21,
              )}`,
          { message: [...messagearr] },
        );
        dispach(allmessagefunc([...messagearr]));
        toastfunc(true);
        textfunc('');
        setTimeout(() => {
          dispach(requestfunc(!redux.request));
          toastfunc(false);
        }, 9000);
        dispach(replyfunc(''));
      } catch (e) {
        console.log(e);
      }
    }

    let element = document.querySelector('.messbox');
    element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
    dispach(messagefunc(''));
    dispach(replyshowfunc(false));
    dispach(editeshowfunc(false));
    dispach(idfunc(''));
  }
  return (
    <>
      <div className="twobox">
        <div className="emojibox">
          <ion-icon
            name="happy-outline"
            style={{ color: show ? '#7b8799' : '#5f5f5f' }}
            onClick={() => setShow(!show)}
          ></ion-icon>
        </div>

        {text === '' ? (
          <Voice />
        ) : (
          <div className="sendmess">
            {!redux.editeshow ? (
              <img
                onClick={() => {
                  sendmessage();
                }}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABMElEQVR4nO2WsUoDQRCGD2JjqWChTyFY+A5CyutUrOztvBnDWcT5sbjCxswk2llt6wso0cInEAUtLQQ7OwvDQqKgiF7i7jb54crl+3aYm50smyZVSPSaYbeEzmbuXCMm+IVh7/4jsftoAix2MwJ/CEAfCbpdluVMMDBBz76CowgwbP8ncFCBArr+GziIQEts9a/gfxUoq958XfDEAsXB6QLD3LjgsQQYljP0eVJobYGdqpotD0+WWuitELTpDww7/GhYhSuGPRDsLUkP5M41qG2L1O4u70lnjdDdYiiNBEms7ycei75+ExC7TAJm6EWdUhtBz4OVmqBNhj1Fby6fXRzP+RtG/Z2SDpCkI7NI9UhwqmeRki0Ckmr1kc9lj6F3LLYRZdkjsb5fb6MBp8kCZwB9+0QKjeEfCQAAAABJRU5ErkJggg=="
              />
            ) : (
              <ion-icon
                name="checkmark-outline"
                onClick={() => {
                  sendmessage();
                }}
              ></ion-icon>
            )}
          </div>
        )}
      </div>
      {show && (
        <div className="emoji-picker">
          <Picker data={data} onEmojiSelect={custom} theme={'dark'} />
        </div>
      )}
    </>
  );
}
