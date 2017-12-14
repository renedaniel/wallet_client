import './app.css';
import {
    Router,
    Route
} from 'react-router-dom';
import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import Register from './../../components/user/register_component';
import Nav from './../../components/nav_component';
import Footer from './../../components/footer_component';

class App extends Component {

    constructor(props) {
        super(props);
        this.history = createHistory();
        this.state = {

        }

    }

    componentDidMount() {

    }

    render() {
        return (
            <Router history={this.history} >
                <div className="app-container">
                    <header className="app-header">
                        <h1 className="app-title">My Wallet</h1>
                    </header>
                    <Nav />
                    <Route path="/singup" component={Register} />
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;
