import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';

import { useEffect } from 'react';

import { idfunc, imagefunc, imageshowfunc } from '../../Redux/Index';
import './Style/Send.css';
import Index from '../../Toastify/Index';
import Send2 from './Send2';

export default function Send(params) {
  let redux = useSelector((redux) => redux.home.value);
  const [text, setText] = useState('');
  const [toast, setToast] = useState(false);

  let dispach = useDispatch();

  useEffect(() => {
    showdata();
  }, [redux.message || redux.editeshow || redux.replyshow]);

  async function showdata(params) {
    if (redux.message) {
      setText(redux.message);
    } else if (!redux.editeshow || !redux.replyshow) {
      setText('');
    }
  }
  async function web(e) {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = async function () {
      console.log(reader.result);
      dispach(imagefunc(''));

      dispach(imagefunc(reader.result));
      dispach(idfunc(''));
    };
    dispach(imageshowfunc(true));
  }
  function change(e) {
    setText(e.target.value);
  }

  const custom = (e) => {
    setText(e.native + text);
  };

  const toastfunc = (toast) => {
    setToast(toast);
    setText('');
  };
  const textfunc = () => {
    setText('');
  };

  return (
    <>
      {toast && <Index status={'success'} text={'Edite Message'} />}
      <div className="sendbox">
        <div className="sendback">
          <div className="firstbox">
            <div className="sendicon">
              <label htmlFor="file-upload">
                <ion-icon name="attach-outline"></ion-icon>
              </label>
              <input id="file-upload" accept="image/*" type="file" onChange={web} />
            </div>
            <div className="textbox">
              <input
                type="text"
                onChange={change}
                value={text}
                placeholder="Write a Message.."
              />
            </div>
          </div>
          <Send2 text={text} custom={custom} textfunc={textfunc} toastfunc={toastfunc} />
        </div>
      </div>
    </>
  );
}
