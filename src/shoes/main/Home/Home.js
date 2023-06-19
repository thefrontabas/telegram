import react, { useEffect, useState } from 'react';
import Chat from '../Chatbox/Chat';
import './Home.css';
import Sidebar from '../Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Login from '../../Login/Login';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Database/Pack';
import { tokenfunc } from '../Redux/Index';
import '../Style/Home.scss';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Imagebox from '../Chatbox/Body/Image/Imagebox';
import Index from '../Chatbox/Body/Forward/Index';
export default function Home(params) {
  let redux = useSelector((redux) => redux.home.value);
  let dispach = useDispatch();
  const [show, setShow] = useState(false);
  const [mess, setmess] = useState([]);
  const [user, setUser] = useState([]);

  const [menu, setmenu] = useState(false);
  let loc = useLocation();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispach(tokenfunc(user));
      } else {
      }
    });
  }, [redux.gmail]);

  function showfunc(params) {
    setShow(!show);
  }

  useEffect(() => {
    send();
  }, [loc.pathname || redux.request]);
  async function send(params) {
    try {
      let getdata = await axios(
        `https://6437f5e2c1565cdd4d6274f2.mockapi.io/telegram/${loc.pathname.slice(7)}`,
      );
      let getuser = await axios(`https://6437f5e2c1565cdd4d6274f2.mockapi.io/telegram`);
      setmess(getdata.data);
      setUser(getuser.data);
    } catch (e) {
      console.log(e);
    }
  }
  window.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
  });

  return (
    <>
      <div className="homebox">
        {menu ? (
          <Sidebar
            funcprop={() => {
              setmenu(false);
            }}
            classname="sidebarabsolute"
          />
        ) : null}

        {redux.gmail.length == 0 ? (
          <Login />
        ) : (
          <>
            <Sidebar
              funcprop={() => {
                setmenu(false);
              }}
              classname="sidebarrelative"
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Chat
                    funcprop={() => {
                      setmenu(true);
                    }}
                    showfunc2={showfunc}
                  />
                }
              />
              <Route
                path="/rooms/:id"
                element={
                  <Chat
                    funcprop={() => {
                      setmenu(true);
                    }}
                    showfunc2={showfunc}
                  />
                }
              />
              <Route
                path="rooms/Saved-Messages/:id"
                element={
                  <Chat
                    funcprop={() => {
                      setmenu(true);
                    }}
                    showfunc2={showfunc}
                  />
                }
              />
            </Routes>
          </>
        )}
        {redux.imageshow && <Imagebox mess={mess} />}
        {redux.forwardshow && <Index user={user} />}
      </div>
    </>
  );
}
