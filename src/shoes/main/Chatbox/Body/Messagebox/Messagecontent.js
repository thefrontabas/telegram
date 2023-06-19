import { useSelector } from 'react-redux';
import { lazy } from 'react';
import { Suspense } from 'react';
import { useState } from 'react';
import Index from '../../../Toastify/Index';
import Loading from '../Loading/Loading';
import Replymessage from '../Replymessage/Replymessage';
import Voicemessage from './Voicemessage';
import Imagemessage from './Imagemessage';
import Textmessage from './Textmessage';
import './Style/Daryaft.css';
const Reactbox = lazy(() => import('../Reactbox'));

export default function Messagecontent({ mess }) {
  let state = useSelector((state) => state.home.value);
  const [toast, settoast] = useState(false);
  const [text, settext] = useState('');

  const toastfunc = (x, text) => {
    settext(text);
    settoast(x);
    setTimeout(() => {
      settoast(false);
    }, 2500);
  };

  const click = (e, index) => {
    const option = document.querySelectorAll('.messbox .optionbox');
    const react = document.querySelectorAll('.messbox .reactbox');

    if (option[index].style.display !== 'inline-block') {
      option[index].style.display = 'inline-block';
      react[index].style.display = 'inline-flex';
    } else {
      option[index].style.display = 'none';
      react[index].style.display = 'none';
    }
  };
  return (
    <>
      {toast && (
        <Index status={text == 'Copy Message' ? 'success' : 'error'} text={text} />
      )}

      <Suspense fallback={<Loading />}>
        {mess?.message?.map((item, index) => {
          return (
            <>
              <div
                className={
                  item.name === state.gmail.displayName || !item.name
                    ? 'sendmessagebox'
                    : 'daryaft'
                }
                onClick={(e) => click(e, index)}
              >
                <Reactbox
                  message={item?.message}
                  time={item?.time}
                  image={item?.img}
                  voice={item.voice}
                  name={item?.name}
                  toastfunc={toastfunc}
                  caption={item?.img.caption}
                  replymessage={item?.replymessage}
                  replyid={item?.replyid}
                  react={item?.react}
                  edite={item?.edite}
                />

                <div
                  className={
                    item.message !== '' && item.replymessage === false
                      ? 'message'
                      : item.img.images.length !== 0 && item.replymessage === false
                      ? `img-message ${
                          state.link === item.img.images[0] ? 'anim-photo' : ''
                        }`
                      : item.voice !== '' && item.replymessage === false
                      ? 'voicebox'
                      : item.name === state.gmail.displayName
                      ? 'reply-message-send'
                      : 'reply-message-daryaft'
                  }
                >
                  {item?.forward && (
                    <div className="forwardtextbox">
                      <div>
                        {item?.forward ? `Forwarded from ${item?.forward}` : null}
                      </div>
                    </div>
                  )}

                  {item.message !== '' && item.replymessage === false ? (
                    <Textmessage item={item} />
                  ) : item.img.images.length !== 0 && item.replymessage === false ? (
                    <Imagemessage item={item} />
                  ) : item.voice !== '' && item.replymessage === false ? (
                    <Voicemessage item={item} />
                  ) : (
                    <>
                      <Replymessage mess={mess} item={item} />
                    </>
                  )}
                </div>
              </div>
            </>
          );
        })}
      </Suspense>
    </>
  );
}
