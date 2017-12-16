import './styles/spinner.css';
import spinner from './../../spinner.svg';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Spinner extends PureComponent {
    render() {
        if (!this.props.isLoading) return null;
        return (
            <div className="spinner-overlay">
                <div className={`spinner-container`}>
                    <img src={spinner} className="spinner" alt="Loading" />
                </div >
            </div>
        )
    }
}
const mapStateToProps = state => ({ isLoading: state.isLoading });
export default connect(mapStateToProps)(Spinner);
