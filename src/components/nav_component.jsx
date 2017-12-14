import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class Nav extends PureComponent {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(e) {
        e.preventDefault();
        localStorage.clear();
        window.location = '/';
    }

    renderNavItem(label, to = '/', className = '', onClick = () => { }) {
        return (
            <NavLink
                key={label}
                className={`nav-item ${className}`}
                to={to}
                onClick={onClick}
            >
                {label}
            </NavLink>
        )
    }

    render() {
        const options = [];
        if (this.props.user.is_logged) {
            options.push(this.renderNavItem('Cerrar sesión', '', '', this.logout));
        } else {
            options.push(this.renderNavItem('Registro', '/singup'));
            options.push(this.renderNavItem('Iniciar sesión', '/login'));
        }
        return (
            <nav className="nav">
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