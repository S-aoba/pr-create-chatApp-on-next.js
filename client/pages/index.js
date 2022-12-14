import Head from 'next/head';
import styles from '../styles/Home.module.css';
import io from 'socket.io-client';
import { useState } from 'react';

const socket = io('http://localhost:8000');

export default function Home() {
  const [message, setMessage] = useState('');
  const [list, setList] = useState([]);

  const handleSendMessage = () => {
    socket.emit('send_message', { message: message });
    setMessage('');
  };

  socket.on('received_message', (data) => {
    console.log(data);
    setList([...list, data]);
  });
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <h2>チャットアプリ</h2>
        <div className={styles.chatInputButton}>
          <input value={message} type="text" placeholder="チャット....." onChange={(e) => setMessage(e.target.value)} />
          <button onClick={() => handleSendMessage()}>チャット送信</button>
        </div>
        {list.map((chat) => (
          <div className={styles.chatArea} key={chat.message}>
            {chat.message}
          </div>
        ))}
      </div>
    </div>
  );
}
