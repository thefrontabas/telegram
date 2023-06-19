import gif from './loading.gif';
import './Loading.css';
export default function Loading(params) {
  return (
    <div className="loadbox">
      <img src={gif} alt="gif" />
    </div>
  );
}
