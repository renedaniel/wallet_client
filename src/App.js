import './App.css';
import React, { Component } from 'react';
import Register from './components/user/register_component';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }

  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">My Wallet</h1>
        </header>
        <div className="App-intro">
          <Register />
        </div>
      </div>
    );
  }
}

export default App;
