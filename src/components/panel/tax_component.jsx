import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Util from './../../utils/util';

class TaxInfo extends PureComponent {

    calcTax(amount) {
        amount = parseFloat(amount);
        let fixedRate = 0;
        let percent = 0;
        if (amount <= 1000) {
            fixedRate = 8;
            percent = amount * 0.03;
        } else if (amount > 1000 && amount <= 5000) {
            fixedRate = 6;
            percent = amount * 0.025;
        } else if (amount > 5000 && amount <= 10000) {
            fixedRate = 4;
            percent = amount * 0.02;
        } else if (amount > 10000) {
            fixedRate = 3;
            percent = amount * 0.01;
        }
        const total = amount + percent + fixedRate;
        return { amount, percent, fixedRate, total }
    }

    render() {
        if (!this.props.amount) return null;
        const quantities = this.calcTax(this.props.amount);
        return (
            <div className="card">
                <div className="card-block text-right pt-3 pr-3">
                    <h6 className="card-subtitle mb-2 text-muted">Total</h6>
                    <p>Cantidad {Util.formatAmount(quantities.amount)}</p>
                    <p>Comisión {Util.formatAmount(quantities.percent)}</p>
                    <p>Tasa fija {Util.formatAmount(quantities.fixedRate)}</p>
                    <p>Total {Util.formatAmount(quantities.total)}</p>
                </div>
            </div>
        )
    }
}

TaxInfo.propTypes = {
    amount: PropTypes.number
}

TaxInfo.defaultProps = {
    amount: 0
}

export default TaxInfo;