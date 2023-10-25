import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/home';
import io from 'socket.io-client'
import { useState } from 'react';
import ChatRoom from './pages/chatRoom';

const socket = io.connect(`${process.env.REACT_APP_SERVER_URL}`)

function App() {
  const [ userName, setUserName ] = useState(null);
  const [ roomName, setRoomName ] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home socket={socket} />} />
        <Route path='/chat' element={<ChatRoom socket={socket} userName={userName} roomName={roomName} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
