import React, { useState, useEffect }  from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem, Button, 
        Form, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import io  from 'socket.io-client';        

// let socket;
// socket = io('http://localhost:5000/');

const Chat = () => {
  const [msg, setMsg] = useState('');
  const [chatmessage, setChatmessage] = useState([]);
  let socket;
  const socketAPI = 'http://localhost:5000/';
  const userId = "user_" + Math.floor(Math.random() * 100);

  useEffect(() => {

    socket = io(socketAPI);
    socket.on('msg', (msg) => {
      console.log(msg);
    })   
 
    // socket.on('responseMessage', (msgData) => {
      // console.log('aaaaa');
      // console.log(msgData);
// console.log(chatmessage);
    //   // setChatmessage([...chatmessage, msgData]);

    //   // console.log(msgData);
    //   // console.log(chatmessage);
    //   // setChatmessage([
    //   //   ...chatmessage, msgData
    //   // ])
    //     // this.setState({
    //     //     chatmessage: [...this.state.chatmessage, msgData]
    //     // });
    // // console.log(chatmessage);
    //     // return () => {
    //     //   socket.emit('disconnect');
    //     //   socket.off();
    //     // }
    
    //     return () => {
    //       socket.off('responseMessage', msgData);
    //    };
    // })

    localStorage.setItem('userId', userId);
   
  }, [socketAPI]);
  
  // useEffect(() => {
  //   socket = io(socketAPI);
  //   socket.on('responseMessage', (msgData) => {
  //       // console.log('aaaaa');
  //       console.log(chatmessage);
  //       setChatmessage([...chatmessage, msgData]);
  //     })
  // }, [socketAPI,chatmessage]);
  // function handleSubmit(e){
  //   e.preventDefault();
  //   console.log('handle Submit');
  //   // let chatMessage = this.state.msg;
  //   // this.setState({ msg: '' });
    
  //   // let msgData = {
  //   //   user: localStorage.getItem('userId'),
  //   //   message: chatMessage,
  //   //   date: new Date()
  //   // }
  //   // this.sendMsg(msgData);
  // }

  const handleSubmit = (e) => {
    socket = io(socketAPI);
    e.preventDefault();

    let msgData = {
      user: localStorage.getItem('userId'),
      message: msg,
      date: new Date()
    }
    setMsg('');
    // console.log('ggggg');
    socket.emit('inputMessage', msgData);

    // console.log(chatmessage);
  }

  // const sendMsg = (msgData) => {
  //   socket.emit('chatmessage', msgData);
  // }
  return (
      <Container>
        <Row>
          <Col className="text-center">welcome to Chat</Col>
        </Row>
        <Row>
          <Container>
            <ListGroup>
                <ListGroupItem>
                    <span className="float-left mr-2" >
                                <img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" className="img-circle" />
                    </span>
                      <div className="chat-body">
                          <div className="header">
                              <strong className="primary-font">Jack Sparrow</strong> 
                                  <small className="float-right text-muted"><span className="glyphicon glyphicon-time"></span>12 mins ago</small>
                          </div>
                          <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                              dolor, quis ullamcorper ligula sodales.
                          </p>
                      </div>
                  </ListGroupItem>

                <ListGroupItem>
                      <span className="chat-img float-right ml-2">
                        <img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" className="img-circle" />
                    </span>
                      <div className="chat-body">
                          <div className="header">
                              <small className=" text-muted"><span className="glyphicon glyphicon-time"></span>13 mins ago</small>
                              <strong className="float-right primary-font">Bhaumik Patel</strong>
                          </div>
                          <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                              dolor, quis ullamcorper ligula sodales.
                          </p>
                      </div>
                  </ListGroupItem>
            </ListGroup>
          </Container>
        </Row>
        <Row className="mt-2">        
          <Container>
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <Input type="text" name="chat-input" id="chat-input" placeholder="Your message" value={msg} onChange={(e) => setMsg(e.target.value)} />
                <InputGroupAddon addonType="append"><Button color="secondary">Send</Button></InputGroupAddon>
              </InputGroup>
            </Form>
          </Container>
        </Row>
    </Container>   
  )
}

export default Chat;