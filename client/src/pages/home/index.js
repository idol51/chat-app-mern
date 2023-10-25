import React, { useEffect } from 'react'
import { Button, Col, Form, Input, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import { Helmet } from 'react-helmet-async'
import bgImage from '../../assets/images/bg-image.avif'
import { useNavigate } from 'react-router-dom'


export default function Home({ socket }) {
    const navigate = useNavigate();

    const handleJoinRoom = (val) => {
      console.log('submit');
        sessionStorage.setItem('userName', val.userName);
        sessionStorage.setItem('roomName', val.roomName);
        socket.emit('join-room', val);

        navigate('/chat');
    }

    useEffect(() => {
      socket.on('leave-room');
    }, [])

  return (
    <>
    <Helmet>
        <style>
            {` body {
                background: url(${bgImage});
                background-size: cover;
                background-repeat: no-repeat;
                height: 100vh;
                backdrop-filter: brightness(0.7);
               }
            `}
        </style>
    </Helmet>

    <Row className='justify-content-center'>
      <Col className='bg-body-secondary py-3 px-4 text-center rounded shadow-sm border' style={{ width: '100%', maxWidth: '500px', transform: 'translateY(calc( 50vh - 50% ))'}}>
        <Title level={2}>Chat Rooms</Title>
        <Form className='text-start' name='joinRoom' layout='vertical' onFinish={handleJoinRoom}>

            <Form.Item name='userName' label='User Name' rules={[ { required: true, message: 'User Name is Required' } ]}>
                <Input size='large' />
            </Form.Item>

            <Form.Item name='roomName' label='Room Name' rules={[ { required: true, message: 'Room Name is Required' } ]}>
                <Input size='large' />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 12}}>
                <Button className='w-100 my-2' type='primary' htmlType='submit' size='large'>Join Room</Button>
            </Form.Item>

        </Form>
      </Col>
    </Row>
    </>
  )
}
