import React, { useState, useEffect }  from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem, Button, 
        Form, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import io  from 'socket.io-client';        
import ReactTimeAgo from 'react-time-ago'

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);  
  const socketAPI = 'http://localhost:5000/';
  const userId = "user_" + Math.floor(Math.random() * 100);
  // let socket = io(socketAPI);
  let socket;
  
  useEffect(() => {
    socket = io(socketAPI);
    // socket.on('msg', (msg) => {
    //   console.log(msg);
    // })   
    localStorage.setItem('userId', userId);
      return () => {
        socket.emit('disconnect');
        socket.off();
    };
  }, [socketAPI]);
  
  useEffect(() => {
    socket = io(socketAPI);
    socket.on('responseMessage', (msg) => {
      setMessages([...messages, msg]);
      // console.log(messages);
    })
  }, [messages]);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    socket = io(socketAPI);
    let msgData = {
      user: localStorage.getItem('userId'),
      message: message,
      date: new Date()
    }
    setMessage("");
    socket.emit('inputMessage', msgData);
  }
  console.log(messages);

  let chatMsgs = messages.map(msgData => {
    return <ListGroupItem key={Math.floor(Math.random() * 100000)}>
      <span className="float-left mr-2" >
                  <img src="http://placehold.it/50/55C1E7/fff&text=X" alt="User Avatar" className="img-circle" />
      </span>
        <div className="chat-body">
            <div className="header">
                <strong className="primary-font">{msgData.user}</strong> 
                    <small className="float-right text-muted"><span className="glyphicon glyphicon-time"></span>
                    <ReactTimeAgo date={msgData.date} locale="en-US"/>
                    </small>
            </div>
            <p>
            {msgData.message}
            </p>
        </div>
    </ListGroupItem>
  })
  return (
      <Container>
        <Row>
          <Col className="text-center">welcome to Chat</Col>
        </Row>
        <Row>
          <Container>
            <ListGroup>
                  {chatMsgs}
            </ListGroup>
          </Container>
        </Row>
        <Row className="mt-2">        
          <Container>
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <Input type="text" name="chat-input" id="chat-input" placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} />
                <InputGroupAddon addonType="append"><Button color="secondary">Send</Button></InputGroupAddon>
              </InputGroup>
            </Form>
          </Container>
        </Row>
    </Container>   
  )
}

export default Chat;