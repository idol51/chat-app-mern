import { Button, Drawer, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'

export default function Sidebar({ onlineUsers, openDrawer, onClose, onLeave }) {
    console.log(onlineUsers);
  return (
    <>
    <Drawer className='bg-body-secondary' title={`Hey! ${sessionStorage.getItem('userName')}`} placement="left" onClose={onClose} open={openDrawer}>
      <Row className='flex-column justify-content-between' style={{height: '100%'}}>
        <Row className='flex-column fs-5'>
          <Title className='m-auto'>{sessionStorage.getItem('roomName')}</Title>      
          <Title level={3}>Joined Users:</Title>      
            <ul>  
              { onlineUsers && onlineUsers.map((val) => <li>{val.userName}</li>)}
            </ul>
        </Row>
        <Button size='large' onClick={onLeave}>Leave Room</Button>
      </Row>
    </Drawer>

    <Row className='position-fixed custom-sidebar bg-body-secondary flex-column px-3 py-3'>
        <Row className='flex-column fs-5' style={{ height: 'calc( 100vh - 72px)'}}>
            <Title className='mx-auto'>{sessionStorage.getItem('roomName')}</Title>      
            <Title level={3}>Joined Users:</Title>    
            <ul>  
            { onlineUsers && onlineUsers.map((val) => <li>{val.userName}</li>)}
            </ul>
        </Row>
        <Button size='large'>Leave Room</Button>
    </Row>
    </>
  )
}
