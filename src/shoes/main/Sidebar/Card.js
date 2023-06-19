import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { requestfunc, userfunc } from '../Redux/Index';
import Index from '../Toastify/Index';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import profile from '../../main/Chatbox/Header/photo_۲۰۲۱-۱۰-۲۳_۲۲-۵۰-۳۳.jpg';

export default function Card({ id, status }) {
  const [toast, setToast] = useState(false);
  const [toastText, setToastText] = useState('false');

  const dispach = useDispatch();
  let redux = useSelector((redux) => redux.home.value);
  const navigate = useNavigate();
  let location = useLocation();

  const clear = async () => {
    try {
      if (status === 'chat') {
        let editedata = await axios.put(
          `https://6437f5e2c1565cdd4d6274f2.mockapi.io/telegram/${id}`,
          { message: [] },
        );
      } else {
        let editedata = await axios.put(
          `https://645673d55f9a4f2361448ff9.mockapi.io/Saved-Messages/${location.pathname.slice(
            21,
          )}`,
          { message: [] },
        );
      }
      setToast(true);
      setToastText('Clear history');
      setTimeout(() => {
        setToast(false);
        dispach(requestfunc(!redux.request));
      }, 12000);
      const option = document.querySelectorAll('.userbox .optionboxuser');

      option.forEach((item) => {
        item.style.display = 'none';
      });
    } catch (e) {
      console.log(e);
    }
  };

  const deletechat = async () => {
    try {
      if (status == 'chat') {
        let deletechat = await axios.delete(
          `https://6437f5e2c1565cdd4d6274f2.mockapi.io/telegram/${id}`,
        );
        setToast(true);
        setToastText('Delete chat');
        setTimeout(() => {
          setToast(false);
          dispach(requestfunc(!redux.request));
        }, 6000);
      }

      const option = document.querySelectorAll('.userbox .optionboxuser');

      option.forEach((item) => {
        item.style.display = 'none';
      });
      navigate('/');
      dispach(userfunc({ img: profile, name: redux.gmail.displayName }));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {toast && (
        <Index
          status={toastText == 'Clear history' ? 'success' : 'error'}
          text={toastText}
        />
      )}
      <div className="optionboxuser">
        <div className="listoption">
          <div className="link clear" onClick={clear}>
            <div>
              <img
                width={'18px'}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA4ElEQVR4nO2UPw4BQRTGt1C4x3acQsEVOAKlgl5L5SLECTZxAjRoVqKTmHkTzBveFCNLJFYib0fl35d8zWTm+733FRME7yTSsE78BzwV/Sv6rooIoU0Ii1voM1uEOSG0vMJPe1HkgunBx922kB2AouoLOKGoBb8jQhX5VkSookzhzrkcaRl7A7SMk7c8wKjQPxwuNmoTsgBrVOVVgDWqzPevZSNb5zCzGsbpc1HnN9CqlxEwsgY6qQ206vIbHOSQnxSSL6Jv91BK35UDHoAw5Salq5vOrfKkYXkHnbCAj9MZOVqcugfm86sAAAAASUVORK5CYII="
              />
            </div>
            <div className="text">Clear history</div>
          </div>
          <div className="link delete" onClick={deletechat}>
            <div>
              <img
                width={'18px'}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABsUlEQVR4nO2Wvy+DQRjHL+EvYPAjLCwshJ2aqL73vGqosBC29p571cDQxYSFhZmtidSsq4RZbd1Jl7b3vm3iH5C73mjoPS+RSr/JjZ/L557nfjHWTz/fJASs/cZgPSfAfii9W4HwrwR0FOCLhpocZxgxKpWd1XMokM/OcAj4oOGIywRVoOWJFbN6jiVnuMnFjYYbvtimCjQAd6zAtTMcARZM+XxxSBVQIPOdFmDBHfblgbH38ZwqEIG40HO0uNh3hkMvSNnde0sVCAHvbAvWneEWF4u2fI9UAQWibCrgywVnuOmLcSvwShbgomI28mZ+zBl+SpwORoDvepQymQFXXjOaVRw/9FyMEgX4plfwCcGIK1tP5UZNBbmoMGoikKaHEQRzzqyH850WijKLvYs9sebO5pJxTxHTd4BZhYe7rqwCsdc5gvKMLKA4BvYcH7uyIeCJbYEkC4Qgt+yDdOnKKsAre5NmyAINP7ds74KiKxsBFo28h0tkgXAjO2k3UrXtZae65eppOa0ZI5+UE2QBHf2WU39ACuQ9i5taWgzbv4FZUZejqv8A7dWjodgC/fz7fAG4KiLn2rMrGwAAAABJRU5ErkJggg=="
              ></img>
            </div>
            <div className="text">Delete chat</div>
          </div>
        </div>
      </div>
    </>
  );
}
