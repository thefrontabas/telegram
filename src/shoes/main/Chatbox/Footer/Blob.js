import './Blob.css';
import Voice from './Voice';
export default function Blob({ send }) {
  return (
    <>
      <div class="gooey" onClick={send}>
        <ion-icon name="send"></ion-icon>
      </div>
    </>
  );
}
