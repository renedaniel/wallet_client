import './app.css';
import {
    Router,
    Route
} from 'react-router-dom';
import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//Components
import Register from './../../components/user/register_component';
import Login from './../../components/user/login_component';
import Nav from './../../components/nav_component';
import Footer from './../../components/footer_component';
//Actions
import { fetchIsLoggedIn } from './../../actions/user_action';

class App extends Component {

    constructor(props) {
        super(props);
        this.history = createHistory();
        this.state = {

        }

    }

    componentDidMount() {
        this.props.fetchIsLoggedIn();
    }

    render() {
        if (!this.props.user) return null;
        return (
            <Router history={this.history} >
                <div className="app-container">
                    <header className="app-header">
                        <h1 className="app-title">My Wallet</h1>
                    </header>
                    <Nav user={this.props.user} />
                    <Route path="/singup" component={Register} />
                    <Route path="/login" component={Login} />
                    <Footer />
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchIsLoggedIn
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(App);
