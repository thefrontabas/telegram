import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Index from '../Toastify/Index';
import Motion from './Motion';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { requestfunc } from '../Redux/Index';
import Saved from './Saved';

export default function Userbox({funcprop}) {
  const [users, setUser] = useState([]);
  const [arr, setArr] = useState([]);
  const [toast, setToast] = useState(false);
  let redux = useSelector((redux) => redux.home.value);
  let location = useLocation();
  let dispach = useDispatch();

  useEffect(() => {
    getdata();
  }, [redux.request || location.pathname]);

  async function getdata(params) {
    try {
      let getdata = await axios(`https://6437f5e2c1565cdd4d6274f2.mockapi.io/telegram`);
      setUser(getdata.data);
      setArr(getdata.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function message(params) {
    let send = prompt('name');
    if (send) {
      try {
        let res = await axios.post(
          `https://6437f5e2c1565cdd4d6274f2.mockapi.io/telegram`,
          {
            name: send,
          },
        );
        setToast(true);
        dispach(requestfunc(!redux.request));
        setTimeout(() => {
          setToast(false);
        }, 3000);
      } catch (e) {
        console.log(e);
      }
    }
  }

  function find(e) {
    let app = arr.filter((item) => item.name.includes(e.target.value));
    setUser(app);
  }

  return (
    <>
      {toast && <Index status={'success'} text={'Add New Chat'} />}
      <div className="searchbox">
        <input type="serach" placeholder="Search..." onChange={find} />
      </div>
      <div className="addchat" onClick={message}>
        <div className="icon">
          <img
            width={'35px'}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADMElEQVR4nO2az08UMRTHS0wQE8G74j/gj5s/zhB/nFA48B/okYMHYrYdaIJOO2tE3ATc98aNKPG0fwDqH6LxjnhBz0KCWfN2Ma7LsoaZdtox/SRNNjsz7bxv29fXvmEsEAgEAoFAIBAoBCnXR6IELwuNN7iu36VCvyvxi0t0jf1vzNVqJ7lOZ7gC4Ao/c40/hcZWv0LX6B6hsR7FOC1lc5iVFfFo7bzQuMIVfD/K4H8VepYreCaTdJyVhYcJnhEaa1zDXlbDD48M2GsLIWtjzGd4kt4WGr+aMrzPiNiuJPWbzDtarSGhcWnQ/DY3GshPgKQ2mQ/MNpsnuMZXtg3vI0SD2nZrfas1RC9StPFdvmHD6UgQGpdcGd9VFh0Zn04KBfuuBWj7HYW3CjVeytqYTW+foXyZrzZGCxOAK3jugdG9I2G5EONlko6bDHKMFYW7/HH9XHl6X+GbBYVXeVK/Rt68FKNgjjY2OWL7P8bD5iFhNb4zIMI3qxsortMZQz11r7duEaf3TdQdKbxjTQChEQ3N2dk+dc+aqRvWrAnAO3t1rwXgCj5ZMf7B8vIpg5sdeyNAwb6Vk6Woc4yV5YU2ac4fGNgu/Q446L/ue+iZrI4xStKLdkJffczhqPF13nazLJGVGCfMWN3FweHl8QSowhWWE4oTvFgJeAYBKNDJ2+6CwuteCCAyTQHYyNsu1/DWiykQZXeC73M4wQ/eOEEp10cM7v/LtwyWJRASGj8yW3AF4LsAXOGqNQGiGKd93wxxDVPWBJCyOWxiO0wRXm/dWR1eT+/vWM8nCo0rhnpqg4IcWuezLHV9i8KnzDaSliuFu0ZeuIxHYgQlKj0U4Akr8licK9h2bvTv6aRgS8rV06xIKjFO+JIYcZYx5gqkawGEhog5TYsrfOmu9yFlnqTHGy6Md58e//sDicUiPpDo+B2Xw34A9LkbJSqt9bqCLTqXYD4zX22MUkRmMljiGn7QOl/4UpcHisooV0fpquw9jjskpqw2zrKyImVzmM7oKGNDSYuBsYOC/fY9dK+GqVJ/KDkowVqJ6xdoLpMwHXHSSfqPrh35YCAQCAQCgUAgwEzyC+tkzpws8M+iAAAAAElFTkSuQmCC"
          />
        </div>
        <div className="text">Add New Chat</div>
      </div>
      <div className="userbox">
        <Saved index={1}  funcprop={funcprop}/>
        {users.map((item, index) => {
          return <Motion key={item.id} funcprop={funcprop} index={index + 1} name={item.name} id={item.id} />;
        })}
      </div>
    </>
  );
}
