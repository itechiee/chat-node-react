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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: ''
    }
  }

  componentDidMount = () => {
    let socket;
    socket = io('http://localhost:5000/');
    socket.on('msg', (msg) => {
      console.log(msg);
    })
  }
  handleChange = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let chatMessage = this.state.msg;
    console.log(chatMessage);
    console.log('submitteddd');
    this.setState({ msg: '' });
    // this.setState({[e.target.name] : e.target.value})
  }

  render() {
    return(
      <div>
          <form onSubmit={this.handleSubmit}>
              <input type="text" name="msg" onChange={this.handleChange} value={this.state.msg} />
              <input type="submit" value="Send" />
          </form>
          
          
      </div>
    )
  }
}

export default App;
