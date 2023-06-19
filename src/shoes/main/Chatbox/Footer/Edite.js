import React from 'react';
import './Style/Editestyle.scss';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { editeshowfunc, idfunc } from '../../Redux/Index';

export default function Reply() {
  let redux = useSelector((redux) => redux.home.value);
  let dispach = useDispatch();
  function func() {
    dispach(editeshowfunc(false));
    dispach(idfunc(''));
  }
  return (
    <>
      <div className="editeback">
        <div className="flex">
          <div className="box1">
            <div className="icon">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAABBklEQVR4nGNgGAVIIHTVKubK9hkxVe2zEurr61kYaGFBddvMxdXtM/+DcduMbbkTJ7JT2YIZy+EWQHFV+4yNVPNRKA5LoD5KpNjwqpaZkngtapsVTZkF7TOXVbfNvF/ePl0Bq0VtM5bX19czUSmSZz6saJ+mhCa3iuz4gPsAI1hQfQTC1LWgHWERLI6oE0TtWFPSSoqCaNQCyoOonYJkCgI17dMMq9pmnsMTycvJTqbIoLp9RjZNLQCByo5ZYbTzQdvMEpBB9fUzuWpaZwRVd8xMr26fcZ56FnTNVK5um/EPlLORDQTFEdWCqKptZg5SMVHCQAtQ2TpbHGRRRdtsFZpYwDAcAABRR4rMZdIjXwAAAABJRU5ErkJggg==" />
            </div>

            <>
              <div className="info">
                <div className="name">Edite Message</div>
                <div className="text">{redux.message}</div>
              </div>
            </>
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
