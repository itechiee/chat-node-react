import React from 'react';
import io  from 'socket.io-client';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

let socket;
socket = io('http://localhost:5000/');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      chatmessage : []
    }
  }

  componentDidMount = () => {
    
    socket.on('msg', (msg) => {
      console.log(msg);
    })


    socket.on('chatmessage', (msgData) => {
        this.setState({
            chatmessage: [...this.state.chatmessage, msgData]
        });
    })
    
    localStorage.setItem('userId', "user_" + Math.floor(Math.random() * 100));
  }
  handleChange = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let chatMessage = this.state.msg;
    this.setState({ msg: '' });
    
    let msgData = {
      user: localStorage.getItem('userId'),
      message: chatMessage,
      date: new Date()
    }
    this.sendMsg(msgData);
  }

  sendMsg = (msgData) => {
    socket.emit('chatmessage', msgData);
  }

  render() {
    let chatMsgs = this.state.chatmessage.map(msgData => {
                        return <li key={Math.floor(Math.random() * 100000)}>
                          <span><b>{msgData.user}</b></span> : {msgData.message}
                          </li>
                      })
    return(
      <div>
        <ul>
          {chatMsgs}
        </ul>
          <form onSubmit={this.handleSubmit}>
              <input type="text" name="msg" onChange={this.handleChange} value={this.state.msg} />
              <input type="submit" value="Send" />
          </form>
          
          
      </div>
    )
  }
}

export default App;
