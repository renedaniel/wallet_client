import './App.css';
import React, { Component } from 'react';
import logo from './logo.svg';
import RequestManager from './requests/request_manager';
import CustomerTask from './requests/tasks/customer_task';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    }

  }

  componentDidMount() {
    const task = new CustomerTask({
      dan: 'dan'
    });
    RequestManager.addRequest(task).then(response => {
      this.setState({ data: response });
    });
    this.state.data.map(customer => <div>{`${customer.first_name}, ${customer.last_name}`}</div>);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">My Wallet</h1>
        </header>
        <div className="App-intro">
          {
            this.state.data.map(customer => <div key={customer.id} >{`${customer.first_name}, ${customer.last_name}`}</div>)
          }
        </div>
      </div>
    );
  }
}

export default App;
