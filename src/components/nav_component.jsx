import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class Nav extends PureComponent {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.small_nav = null;
    }

    logout(e) {
        e.preventDefault();
        localStorage.clear();
        window.location = '/';
    }

    renderNavItem(label, to = '/', className = '', onClick = () => { }) {
        return (
            <NavLink
                exact
                key={label}
                className={`nav-link ${className}`}
                to={to}
                onClick={onClick}
            >
                {label}
            </NavLink>
        )
    }

    render() {
        const options = [
            this.renderNavItem('Inicio', '/')
        ];
        if (this.props.user.is_logged) {
            options.push(this.renderNavItem('Cerrar sesión', '', '', this.logout));
        } else {
            options.push(this.renderNavItem('Iniciar sesión', '/login'));
            options.push(this.renderNavItem('Registro', '/singup'));
        }
        return (
            <nav className="nav nav-masthead">
                {options}
            </nav>
        );
    }
}

Nav.propTypes = {
    user: PropTypes.object
}

Nav.defaultProps = {
    user: {}
}

export default Nav;