import React from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useLocation } from 'react-router-dom';

import { editeshowfunc, idfunc, replyfunc, replyshowfunc } from '../../../Redux/Index';
export default function Reply({ message, image, time, voice, caption }) {
  let redux = useSelector((redux) => redux.home.value);
  let dispach = useDispatch();
  async function replyfunc2(time) {
    dispach(replyfunc(''));
    if (message) {
      dispach(replyfunc('message'));
      dispach(replyfunc(message));
    } else if (voice) {
      dispach(replyfunc('voice'));
      dispach(replyfunc(image));
    } else if (image) {
      dispach(replyfunc('img'));
      dispach(replyfunc(image));
      dispach(replyfunc(caption ? caption : 'photo'));
    }
    dispach(replyfunc(redux.gmail.displayName));
    dispach(idfunc(time));
    dispach(replyshowfunc(true));
    dispach(editeshowfunc(false));
  }
  return (
    <div className="link" onClick={() => replyfunc2(time)}>
      <div>
        <img
          width={'16px'}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA40lEQVR4nO2UTQrCMBBGsxMUdOkBegfxICLoDXTnccS1LlzqAerSAwi6Fko3NRkoSehUGOmPUBW1ts2m+GB2YV4y3xDG/pQBpZgZbY5SnI02NyLINq9c8Nz8oZQ4oQIbFV8ECoZEvFOtQL7UATVMiahRSsJSyHGapMEK/MsIpVhmXrYl3+8WlrC3Z6AXj0yKc6jEvrCEfYDIa6OCdfqSTaFxsS9EYYda7CLJVcPkJ0H+i3j9e/CFtisPKPkqzkOKATNB4PNxEjjMjQhIg5WEDbYRgeu6rXRlj8wUaOqDrI+gntwAydQ83+WYbfwAAAAASUVORK5CYII="
        />
      </div>
      <div className="text">Reply</div>
    </div>
  );
}
