import './Index.css';
import React, { useState } from 'react';
import Motion from './Motion';
import Saved from './Saved';
import { forwardshowfunc, requestfunc } from '../../../Redux/Index';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export default function Index({ user }) {
  const [activeuser, setActiveUser] = useState([{}]);
  const [idlist, setIdList] = useState([]);
  let redux = useSelector((redux) => redux.home.value);
  let dispach = useDispatch();

  function active(image, name, id) {
    setActiveUser([...activeuser, { image: image, name: name, id: id }]);
    // setIdList([...idlist, id]);
    // for (let j = 0; j < activeuser.length; j++) {
    //   if (activeuser[j].id !== id) {
    //     continue;
    //   }
    // }
  }

  function filter(id) {
    const sort = activeuser.filter((item) => item.id !== id);
    setActiveUser(sort);
  }
  const send = async () => {
    try {
      activeuser.map(async (item) => {
        let getdata = await axios(
          item.name !== 'Saved'
            ? `https://6437f5e2c1565cdd4d6274f2.mockapi.io/telegram/${item.id}`
            : `https://645673d55f9a4f2361448ff9.mockapi.io/Saved-Messages/${item.id}`,
        );
        let res = await axios.put(
          item.name !== 'Saved'
            ? `https://6437f5e2c1565cdd4d6274f2.mockapi.io/telegram/${item.id}`
            : `https://645673d55f9a4f2361448ff9.mockapi.io/Saved-Messages/${item.id}`,
          {
            message: [
              ...getdata.data.message,
              {
                ...redux.forwardlist,
              },
            ],
          },
        );
        // toastfunc(true, 'Forward Message');
      });

      dispach(forwardshowfunc(false));
    } catch (error) {
      console.log(error);
    }

    let element = document.querySelector('.messbox');
    element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
  };
  return (
    <>
      <div className="forwardbox">
        <div className="head">
          {activeuser.length - 1 == 0 ? '' : activeuser.length - 1} Choose recipient...
        </div>
        <div className="activeusermain">
          {activeuser.map((item, index) => {
            if (index > 0) {
              return (
                <div className="user" title={item.name}>
                  <div
                    className="activeavatar"
                    style={{
                      backgroundImage: `url(${item.image})`,
                    }}
                  >
                    <div className="activeback">
                      <ion-icon name="close" onClick={() => filter(item.id)}></ion-icon>
                    </div>
                  </div>
                  <div className="infobox">
                    <div className="name">{item.name}</div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="savedbox">
          <Saved active={active} />
        </div>
        <div className="userbox">
          {user.map((item) => {
            return <Motion key={item.id} name={item.name} id={item.id} active={active} />;
          })}
        </div>
        <div className="footer">
          <div className="sendboxforward">
            <span onClick={() => dispach(forwardshowfunc(false))}>Cancel</span>
            <span onClick={send}>Send</span>
          </div>
        </div>
      </div>
    </>
  );
}
