import { useSelector } from 'react-redux';
import './Replymessage.css';
export default function Replymessage({ mess, item }) {
  let Redux = useSelector((Redux) => Redux.home.value);

  return (
    <>
      <div className="flex">
        <div className="reply-message-back">
          <div className="borderleft"></div>
          <div className="messagemain">
            {mess?.message?.map((index) => {
              if (item.replyid === index.time) {
                if (index.message) {
                  return (
                    <>
                      <div className="name">{item.name}</div>
                      {item.replyid === index.time ? (
                        <div className="text">{index.message}</div>
                      ) : (
                        <div className="text">Del Message</div>
                      )}
                    </>
                  );
                } else if (index.voice) {
                  return (
                    <>
                      <div className="boxtext">
                        <div className="name">
                          <div className="name">{item.name}</div>
                        </div>
                        <div className="text">Voice message</div>
                      </div>
                    </>
                  );
                } else if (index.img.images) {
                  return (
                    <>
                      <div className="infoimg">
                        {item.replyid === index.time ? (
                          <>
                            <div className="img">
                              <img
                                width={'35px'}
                                height="35px"
                                style={{ borderRadius: '1px' }}
                                src={index.img.images[0]}
                              />
                            </div>
                            <div className="boxtext">
                              <div className="name">
                                <div className="name">{item.name}</div>
                              </div>
                              <div className="text">
                                {!index.img.caption ? 'photo' : index.img.caption}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="img">
                              <img width={'25px'} height="25px" src="" />
                            </div>
                            <div className="boxtext">
                              <div className="name">
                                <div className="name">{item.name}</div>
                              </div>
                              <div className="text">Del Photo</div>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  );
                }
              }
            })}
            <div className="text-main">{item.message}</div>

            <div className="time">
              {item.edite && <div className="editecontent">edite</div>}

              <div className="react">
                <span>{item.react[0].send}</span>
                <span>{item.react[0].daryaft}</span>
              </div>
              <div className="date">
                {new Date(item.time).toLocaleTimeString('en-Us', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
