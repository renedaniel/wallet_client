import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends PureComponent {

    renderNavItem(label, to, className = '') {
        return (
            <NavLink
                className={`nav-item ${className}`}
                to={to}
            >
                {label}
            </NavLink>
        )
    }

    render() {
        return (
            <nav className="nav">
                {this.renderNavItem('Registro', '/singup')}
                {this.renderNavItem('Login', '/login')}
            </nav>
        );
    }
}

export default Nav;

