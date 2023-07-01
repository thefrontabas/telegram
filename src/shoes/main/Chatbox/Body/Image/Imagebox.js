import { useState } from 'react';
import './Imagebox.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

import {
  allmessagefunc,
  idfunc,
  imagefilterfunc,
  imagefunc,
  imageshowfunc,
  requestfunc,
} from '../../../Redux/Index';
export default function Imagebox() {
  const [text, setText] = useState('');
  const [show, setShow] = useState(false);
  let redux = useSelector((redux) => redux.home.value);
  let location = useLocation();
  let dispach = useDispatch();
  function Delete(item) {
    if (redux.image.length == 1) {
      dispach(imageshowfunc(false));
    } else {
      dispach(imagefilterfunc(item));
    }
  }
  function Change(e) {
    setText(e.target.value);
  }
  const custom = (e) => {
    setText(e.native + text);
  };

  async function send(e) {
    const data = {
      img: {
        images: [...redux.image],
        caption: text,
      },
      message: '',
      voice: '',
      time: new Date().getTime(),
      react: [{ send: '', daryaft: '' }],
      replymessage: redux.id !== '' ? true : false,
      replyid: redux.id !== '' ? redux.id : '',
      edite: false,
      name: redux.gmail.displayName,
    };

    try {
      dispach(allmessagefunc([...redux.allmessage, data]));
      let getdata = await axios(
        location.pathname.slice(7, 21) !== 'Saved-Messages'
          ? `https://6437f5e2c1565cdd4d6274f2.mockapi.io/telegram/${location.pathname.slice(
              7,
            )}`
          : `https://645673d55f9a4f2361448ff9.mockapi.io/Saved-Messages/${location.pathname.slice(
              21,
            )}`,
      );
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
      }, 12000);
      dispach(imageshowfunc(true));
    } catch (e) {
      console.log(e);
    }

    let element = document.querySelector('.messbox');
    element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
    dispach(idfunc(''));
    dispach(imageshowfunc(false));
    dispach(imagefunc(''));
  }

  async function web(e) {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = async function () {
      dispach(imageshowfunc(false));
      dispach(idfunc(''));
    };
  }
  return (
    <>
      <div className="imagefilterbox">
        <div className="head">
          <div>Send an image</div>
        </div>

        <div className="imagebox">
          {redux.image.map((item) => (
            <div className="image" style={{ backgroundImage: `url(${item})` }}>
              <div className="back">
                <ion-icon name="trash-bin" onClick={() => Delete(item)}></ion-icon>
              </div>
            </div>
          ))}
        </div>
        <div className="captionbox">
          {show && (
            <div className="emoji-picker">
              <Picker data={data} onEmojiSelect={custom} theme={'dark'} />
            </div>
          )}
          <div className="inputbox">
            <label for="">Caption</label>
            <div className="input">
              <div className="text">
                <input type="text" value={text} placeholder="" onChange={Change} />
              </div>
              <div className="icon">
                <ion-icon name="happy-outline" onClick={() => setShow(!show)}></ion-icon>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="boxadd">
            <div className="sendicon">
              <label htmlFor="file-upload">Add</label>
              <input id="file-upload" accept="image/*" onChange={web} type="file" />
            </div>
          </div>
          <div className="sendboximage">
            <span
              onClick={() => {
                dispach(imagefunc(''));
                dispach(imageshowfunc(false));
              }}
            >
              Cancel
            </span>
            <span onClick={send}>Send</span>
          </div>
        </div>
      </div>
    </>
  );
}
