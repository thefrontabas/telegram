export default function Imagemessage({ item }) {
  return (
    <>
      <div className="img-main" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {item.img.images.map((index) => (
          <>
            <img src={index} className="img" alt="img" />
            <div className="text-caption">{item?.img?.caption}</div>
            <div className="time">
              <div className="react">
                <span>{item.react[0].send}</span>
                <span>{item.react[0].daryaft}</span>
              </div>

              {item.edite && <div className="editecontent">edite</div>}
              <div className="date">
                {new Date(item.time).toLocaleTimeString('en-Us', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
