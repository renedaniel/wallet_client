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
                key={label}
                className={`nav-item noselect ${className}`}
                to={to}
                onClick={() => {
                    onClick();
                    this.toggleMenu();
                }}
            >
                {label}
            </NavLink>
        )
    }

    toggleMenu() {
        if (this.small_nav) {
            this.small_nav.classList.toggle('small-nav-hidden');
        }
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
            <nav className="nav">
                <div className="full-nav">
                    {options}
                </div>
                <div className="small-nav">
                    <i class="mi mi-dehaze" onClick={() => this.toggleMenu()}/>
                    <div className='small-nav-hidden small-links' ref={(div) => this.small_nav = div}>
                        {options}
                    </div>
                </div>
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