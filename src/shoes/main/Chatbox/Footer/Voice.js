import React from 'react';
import vmsg from 'vmsg';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import axios from 'axios';

import '../../Style/Home.scss';
import Blob from './Blob';
import { requestfunc } from '../../Redux/Index';
import { useDispatch } from 'react-redux';

const recorder = new vmsg.Recorder({
  wasmURL: 'https://unpkg.com/vmsg@0.3.0/vmsg.wasm',
});

export default function Voice(params) {
  const [recording, setRecordeing] = useState([]);
  const [text, setText] = useState(false);
  let redux = useSelector((redux) => redux.home.value);
  let location = useLocation();
  let dispach = useDispatch();

  const func = async () => {
    try {
      await recorder.initAudio();
      await recorder.initWorker();
      recorder.startRecording();
      setText(true);
    } catch (e) {
      console.log(e);
    }
  };

  const send = async () => {
    const blob = await recorder.stopRecording();
    setText(false);
    recording.concat(URL.createObjectURL(blob));
    const data = {
      message: '',
      name: redux.gmail.displayName,
      img: { images: [], caption: '' },
      voice: URL.createObjectURL(blob),
      time: new Date().getTime(),
      react: [{ send: '', daryaft: '' }],
      replymessage: redux.id !== '' ? true : false,
      replyid: redux.id !== '' ? redux.id : '',
      edite: false,
    };
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
    } catch (e) {
      console.log(e);
    }

    let element = document.querySelector('.messbox');
    element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
  };
  return (
    <div className="soundbox">
      {text ? (
        <div className="sendanimation" style={{ position: 'relative' }}>
          <Blob send={send} />
        </div>
      ) : (
        <ion-icon name="mic-outline" onClick={func}></ion-icon>
      )}
    </div>
  );
}
