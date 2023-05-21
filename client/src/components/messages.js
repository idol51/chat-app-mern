import { Card, Divider, Empty, Row } from 'antd'
import React, { useEffect, useState } from 'react'

export default function Messages({ socket }) {
    const [ messages, setMessages ] = useState(sessionStorage.getItem('messages') ? JSON.parse(sessionStorage.getItem('messages')) : []);

    useEffect(() => {
        console.log(messages);
        socket.on('receive-message', (data) => {
            console.log('message', data, messages.length);
            
            setMessages((msg) => [...msg, ...data]);
        })

        return () => socket.off('receive_message');
    }, [socket])

    useEffect(() => {
        console.log('messages', messages);
        sessionStorage.setItem('messages', JSON.stringify(messages));
    }, [messages])

    const formatDateFromTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    }

  return (
    <Row className='flex-column flex-nowrap mb-3' style={{ height: 'calc( 100vh - 112px)', maxHeight: 'calc( 100vh - 96px)', overflow: 'auto'}}>
        { messages.length !== 0 ? messages.map((val, i) => 
            <Card key={i} className='mb-3 bg-secondary text-white'>
                <Row className='justify-content-between text-info'>
                    <span>{val.userName}</span>
                    <span>{formatDateFromTimestamp(val.createdTime)}</span>
                </Row>
                <Divider className='bg-light my-2' />
                <p className='fs-5 m-0'>{val.message}</p>
            </Card>
            ) :
            <Row className='justify-content-center aligh-items-center align-content-center' style={{height: '100%'}}>
                <Empty description='No Message' />
            </Row>
        }
        
    </Row>
  )
}
