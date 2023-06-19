import React from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';

import {
  editeshowfunc,
  forwardlistfunc,
  forwardshowfunc,
  idfunc,
  messagefunc,
  replyshowfunc,
} from '../../../Redux/Index';
import Delete from './Delete';
import Reply from './Reply';

export default function Options({
  message,
  image,
  name,
  voice,
  time,
  toastfunc,
  caption,
  replymessage,
  replyid,
  react,
  edite,
}) {
  let redux = useSelector((redux) => redux.home.value);
  let dispach = useDispatch();
  function send(time) {
    if (message && name == redux.gmail.displayName) {
      dispach(messagefunc(message));
      dispach(idfunc(time));
      dispach(editeshowfunc(true));
    } else if (image && name == redux.gmail.displayName) {
      dispach(messagefunc(caption));
      dispach(idfunc(time));
      dispach(editeshowfunc(true));
    } else {
      dispach(messagefunc(''));
      dispach(idfunc(''));
    }
    dispach(replyshowfunc(false));
  }

  function copyfunc() {
    if (message) {
      navigator.clipboard.writeText(message);
      toastfunc(true, 'Copy Message');
    } else if (image) {
      navigator.clipboard.writeText(caption);
      toastfunc(true, 'Copy Message');
    }
  }

  function forward(params) {
    dispach(
      forwardlistfunc({
        message: message,
        img: image,
        voice: voice,
        time: time,
        name: name,
        react: react,
        replymessage: false,
        replyid: '',
        forward: redux.user.name == 'Saved Messagess' ? 'Saved' : redux.user.name,
        edite: false,
      }),
    );
    dispach(forwardshowfunc(true));
  }
  return (
    <>
      <div className="listoption">
        <div className="link" onClick={() => send(time)}>
          <div>
            <img
              width={'16px'}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5ElEQVR4nO3VPQ6CQBAFYI5irKwsLE20sLT0DDSWdHgoT2DvATQ2lrSaGZT9YQcLA8a4QUELdhIiL9lqyX6Zt5vgeV3aHKPRJ4l7krAxCQxZUJIYkMTIWgcjcMSNvvDE4eQ1cJTX7gyuxRXuXEDBN9xo9JtGi4NTASt776bjpQUHTtAq4FMbzh5ReXKml4tucPoB5brTqEMbCf1PvQqmj/8pI/pMKs8LdjQPKZiwo3l0HPf56r2eBvbBWmOP1GWcpZc5STy6q1dAWDVVpnHmuYqRsGW5x3JIwbrABYR57W8fdGlj7isLvmux8YDqAAAAAElFTkSuQmCC"
            />
          </div>
          <div className="text">Edite</div>
        </div>
        <Reply
          message={message}
          time={time}
          image={image}
          voice={voice}
          caption={caption}
        />

        <div className="link" onClick={() => copyfunc()}>
          <div>
            <ion-icon name="copy-outline"></ion-icon>
          </div>
          <div className="text">Copy</div>
        </div>

        <div className="link" onClick={forward}>
          <div>
            <img
              width={'16px'}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA4klEQVR4nO2SMQrCQBBFU4qCKT2AZ/AqomewsvQsWtrY28fSC4h2QiAEwewuxJ2YSbGyyUKCJJGNTCN+2G7mv+X/cZy/qPV8sBUpACX3SSEouU8KQQP4CqIUc1MQU5RsgyA8BH6pGr+9pYXxtYdSLFDyU4thN4CK4xEC31cWt2kczRNxG6sg6NdFZGWeAT/mSzoSKSZNs/bmOpby5zul7sO2eevcTeZ+Kpn3ydwAbEplbllocyydVZxiUahDIQS2zuOBaEYCyBJ+0AB9ijQA4GcNCMNwQAJAc9Mk5r8B+Mup0QtEYDx82XxZoQAAAABJRU5ErkJggg=="
            />
          </div>
          <div className="text">Forward</div>
        </div>
        <Delete toastfunc={toastfunc} time={time} />
      </div>
    </>
  );
}
