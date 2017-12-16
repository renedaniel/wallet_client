import './app.css';
import './../../assets/notification.css';
import './../../assets/icons.css';
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
import UserPanel from './../../components/panel/user_panel_component';
import ModalContainer from './../modal/modal_container';
import Spinner from './../spinner/spinner_container';
import Home from './../../components/home_component';
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
                <div className={`app-container ${!this.props.user.is_logged ? 'home-container' : 'user-container'}`}>
                    <header className={`app-header`}>
                        <h1 className="app-title">My Wallet</h1>
                    </header>
                    <Nav user={this.props.user} />
                    <Route render={({ location }) => {
                        if (location.pathname === '/') {
                            return this.props.user.is_logged ?
                                <UserPanel user={this.props.user} /> :
                                <Home />
                        }
                        return null;
                    }} />
                    <Route path="/singup" component={Register} />
                    <Route path="/login" component={Login} />
                    <Footer />
                    <ModalContainer />
                    <Spinner />
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
