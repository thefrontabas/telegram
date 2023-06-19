export default function Textmessage({ item }) {
  return (
    <>
      <div className="text">{item.message}</div>
      <div className="flexmessage">
        <div className="react">
          <span>{item.react[0].send}</span>
          <span>{item.react[0].daryaft}</span>
        </div>
        {item.edite && <div className="editecontent">edite</div>}
        <div className="time">
          {new Date(item.time).toLocaleTimeString('en-Us', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </>
  );
}
