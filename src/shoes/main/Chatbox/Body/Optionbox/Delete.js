import React from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { requestfunc } from '../../../Redux/Index';
export default function Delete({ toastfunc, time }) {
  let location = useLocation();
  let redux = useSelector((redux) => redux.home.value);
  let dispach = useDispatch();
  async function deletefunc(time) {
    try {
      let res = await axios(
        location.pathname.slice(7, 21) !== 'Saved-Messages'
          ? `https://6437f5e2c1565cdd4d6274f2.mockapi.io/telegram/${location.pathname.slice(
              7,
            )}`
          : `https://645673d55f9a4f2361448ff9.mockapi.io/Saved-Messages/${location.pathname.slice(
              21,
            )}`,
      );
      let filter = res.data.message.filter((item) => item.time !== time);
      let Change = await axios.put(
        location.pathname.slice(7, 21) !== 'Saved-Messages'
          ? `https://6437f5e2c1565cdd4d6274f2.mockapi.io/telegram/${location.pathname.slice(
              7,
            )}`
          : `https://645673d55f9a4f2361448ff9.mockapi.io/Saved-Messages/${location.pathname.slice(
              21,
            )}`,
        { message: [...filter] },
      );

      toastfunc(true, 'Delete Message');
      dispach(requestfunc(!redux.request));
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="link" onClick={() => deletefunc(time)}>
      <div>
        <img
          width={'16px'}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADSklEQVR4nO2Zv2tUQRDHV0gI/sDfjVqphaKISCq1CwYhWIj4D0hsRAuxiEq0EO0NxspgJTYSCzVWIhFUAiZEMWLQ/JJACOfldvYub/e9txsYWc3btxwXiZd5iYH7whYHx2dmZ+bN7L7HWE011UQmHfBrWvJRLWGy8uKj9j/sf5WW8H1h5936tmIOohBbbARNCG+05GOLcHaRi4/9ZqrCVQTYnInzUSm/P1a8n87pyitW8CGKivtInUfkm4yCvqyd18kmAt5nbZJtIA6gwxlQ8NmEohkR66n4iFhvAnFSSxhKNwEdJHATihN+dOxvEnBlW82kthBnNtqaTOuT32UZyyjhZZsPVP1Q246gJR9ZrrrXC3eoEa2g7Z+cR8Q1RsHwyjsPf0pJwXAVGYC2VZsBXyaEJg/4iGUsLeFxYi+chaYlA+PZwkEvGq9IvPybPclfJ/ai0syBJQOFEFu9DHxhGUtL/jWxZ48uSwbaB9p/Fqanp9ezjJTL5Tb4tW9tk4BjCe9cXQqxh2UkDMVe13kkvCUDa8W70+FSPEYGLpNWpeOpHfGEUcko6HSRieAMGbhMRsJZr/ffY1TSSrSntSkukoHLpCW/5GXgOqPSXAitLjIh3GYZyUi4k9iZC+EcHTgqtqSR4V0sI2nJH7oZEBRaCMH5xnQD0EMGLpOW8DKxEwdwhFFJyvxOLwMDLCNpyQcTO0HwcwcZuLe3t05LMTEP/4GIdYxYiFhn2fONYsLaJDVgI59Ex2aEfgNylysfxfup+fZ43ZO20nwjOV8L/zl7Ts23GehKh1mRrkPMy0T8lDcDHjBq2f7v9ehWan4cwnlv1tyi5jM7gb0ItZPzFb+RBkhcoOYzewbyzimd1PxYwX03xOQM/XnLnkK9WdBNz+dPU37hKDWfhSLnzur2fkDNjyW8d3eOEHZT8xlOTa3zbkujZLcl5m597rsC4uRaloXsnTg1UtxGxUUsbvPu3UMsK2kFL9IHDU5TcSM54xqEVvCMZSWt4IpXRh/ty1dEbKiWh4gN9oWuUfDJy8BlWq/Lv9B4J0bypfgA6XeBSooDfthGn34DfDCO+SG2HEIsbdeK37Tt1CgxXq3TRolx+/rETmHKplBTTTWx1aNfY/RtnHbhQ2YAAAAASUVORK5CYII="
        />
      </div>
      <div className="text">Delete</div>
    </div>
  );
}
