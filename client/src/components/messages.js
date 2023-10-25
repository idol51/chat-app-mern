import { Card, Divider, Empty, Row } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

export default function Messages({ socket }) {
    const messageBodyRef = useRef();
    const [ messages, setMessages ] = useState(sessionStorage.getItem('messages') ? JSON.parse(sessionStorage.getItem('messages')) : []);

    const scrollMessageBodyDown = () => {
        setTimeout(() => {
            messageBodyRef.current?.scrollTo({
                top: messageBodyRef?.current?.scrollHeight,
                left: 0,
                behavior: "smooth",
            });
        }, 200);
    };

    const formatDateFromTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDay();
        const month = date.getMonth();
        return date.toLocaleDateString()
    }

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
        scrollMessageBodyDown()
    }, [messages]);


    
  return (
    <Row className='flex-column flex-nowrap mb-3 px-2' ref={messageBodyRef} style={{ height: 'calc( 100vh - 112px)', maxHeight: 'calc( 100vh - 96px)', overflow: 'auto'}}>
        { messages.length !== 0 ? messages.map((val, i) => (val.userName !== 'ChatBot' ? ( val.userName !== sessionStorage.getItem('userName') ?

            <Card key={i} bodyStyle={{ padding: '4px 24px', minWidth: '150px', wordBreak: 'break-word', maxWidth: 'calc(100% - 80px)' }} className='mb-5 opacity-75 me-auto bg-secondary text-white rounded-5'>
                <span className='me-1 fw-bold position-absolute text-secondary' style={{ top: -22, left: 8, fontSize: 14 }}>{val.userName}</span>
                <p className='fs-5 m-0'>{val.message}</p>
                <span className='me-1 position-absolute text-secondary' style={{ bottom: '-16px', right: '8px', fontSize: '11px'}}>{formatDateFromTimestamp(val.createdTime)}</span>
            </Card> :

            <Card key={i} bodyStyle={{ padding: '4px 24px', minWidth: '150px', wordBreak: 'break-word', maxWidth: 'calc(100% - 80px)' }} className='mb-5 position-relative ms-auto bg-secondary text-white rounded-5'>
                <span className='me-1 fw-bold position-absolute text-secondary' style={{ top: -22, right: 8, fontSize: 14 }}>{val.userName}</span>
                <p className='fs-5 m-0'>{val.message}</p>
                <span className='me-1 position-absolute text-secondary' style={{ bottom: '-16px', left: '8px', fontSize: '11px'}}>{formatDateFromTimestamp(val.createdTime)}</span>
            </Card> ) :

            <Card key={i} bodyStyle={{padding: '0px 16px'}} className='mt-2 mb-4 bg-body-secondary text-secondary rounded-5 w-75 mx-auto'>
                <Row className='justify-content-center '>
                    <p className='fs-5 m-0'>{val.message}</p>
                </Row>
            </Card>)
            ) :
            <Row className='justify-content-center aligh-items-center align-content-center' style={{height: '100%'}}>
                <Empty description='No Message' />
            </Row>
        }
        
    </Row>
  )
}
