import React from 'react';
import './Style/Replystyle.scss';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { idfunc, replyfunc, replyshowfunc } from '../../Redux/Index';

export default function Reply() {
  let redux = useSelector((redux) => redux.home.value);
  let dispach = useDispatch();
  function func() {
    dispach(replyfunc(''));
    dispach(idfunc(''));
    dispach(replyshowfunc(false));
  }
  return (
    <>
      <div className="replyback">
        <div className="flex">
          <div className="box1">
            <div className="icon">
              <ion-icon name="arrow-undo"></ion-icon>
            </div>

            {redux.reply[0] == 'message' ? (
              <>
                <div className="info">
                  <div className="name">{redux.reply[2]}</div>
                  <div className="text">{redux.reply[1]}</div>
                </div>
              </>
            ) : redux.reply[0] == 'img' ? (
              <>
                <div className="infoimg">
                  <div className="img">
                    <img width={'35px'} height="35px" src={redux.reply[1].images[0]} />
                  </div>
                  <div className="boxtext">
                    <div className="name">{redux.reply[3]}</div>
                    <div className="text">{redux.reply[2]}</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="info">
                  <div className="name">{redux.reply[2]}</div>
                  <div className="text">Voice message</div>
                </div>
              </>
            )}
          </div>
          <div className="box2">
            <div className="close">
              <ion-icon onClick={func} name="close"></ion-icon>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
