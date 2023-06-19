import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Index({ status, text }) {
  useEffect(() => {
    notify();
  }, [status, text]);

  const notify = () => toast(text, { icon: '😎' });

  return (
    <div>
      <ToastContainer
        toastStyle={{
          backgroundColor: `${status == 'success' ? '#333941ed' : '#832929'}`,
          color: '#fff',
        }}
        position="top-center"
        autoClose={2000}
        progressStyle={{ background: `${status == 'success' ? '#7b8799' : 'white'}` }}
      />
    </div>
  );
}
