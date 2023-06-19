import "./Style/Voice.css"
export default function Voicemessage({ item }) {
  return (
    <>
      <audio controls>
        <source src={item.voice} type="audio/mpeg" />
      </audio>

      <div className="time">
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
    </>
  );
}
