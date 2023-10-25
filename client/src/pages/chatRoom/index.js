import { Button, Col, Input, notification, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import Messages from '../../components/messages'
import Sidebar from '../../components/sidebar'
import axios from 'axios'
import Hamburger from '../../components/hamburger'
import { useNavigate } from 'react-router-dom'

export default function ChatRoom({ socket }) {
    const [ api, contextHolder ] = notification.useNotification();
    const navigate = useNavigate();

    const [ onlineUsers, setOnlineUsers ] = useState(null);
    const [ message, setMessage ] = useState('');

    const [ openDrawer, setOpenDrawer ] = useState(false);

    const [ refresh, setRefresh ] = useState(false);

    const handleSendMessage = () => {
      if ( sessionStorage.getItem('userName') && sessionStorage.getItem('roomName') ) {
        if ( message !== '' ) {
          let createdTime =  Date.now();

          socket.emit('send-message', {
              message,
              userName: sessionStorage.getItem('userName'),
              roomName: sessionStorage.getItem('roomName'),
              createdTime,
          })

          setMessage('');
        }
      }
      else {
        api.info({
          message: 'Please Enter Room Again',
          placement: 'topRight',
        });
      }
    }
    
    const handleLeaveRoom = () => {
      socket.emit('leave-room', (err) => {
        if (err) {
          api.error({
            message: 'Please try again!'
          })
        }
        else {
          navigate('/')
        }
      });
    }

    useEffect(() => {
        socket.on('chatroom-users', (users) => {
            console.log('users',users);
            sessionStorage.setItem('chatroom-users', JSON.stringify(users));
            setRefresh((ref) => !ref);
        })

        return () => socket.off('chatroom-users');
    }, [socket])

    useEffect(() => {
      setOnlineUsers(JSON.parse(sessionStorage.getItem('chatroom-users')));
    }, [refresh])
  return (
    <>
      { contextHolder }
      <Hamburger onClick={() => setOpenDrawer(true)} />

      <Sidebar onlineUsers={onlineUsers} openDrawer={openDrawer} onClose={() => setOpenDrawer(false)} onLeave={handleLeaveRoom} />

      <Row className='w-100 justify-content-center chat-section' style={{paddingLeft: '360px'}}>
        <Col className='py-3' style={{ width: '100%', maxWidth: '600px' }}>
            <Messages socket={socket} />
            <Row className='flex-nowrap bg-body-secondary p-3 mx-2 rounded'>
                <Input className='mx-2' placeholder='Type your message here...' value={message} onPressEnter={handleSendMessage} onChange={(e) => setMessage(e.target.value)} />
                <Button className='me-2' onClick={handleSendMessage}>Send</Button>
            </Row>
        </Col>
      </Row>
    </>
  )
}
