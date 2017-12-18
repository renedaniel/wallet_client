import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Util from './../../utils/util';

class TaxInfo extends PureComponent {

    render() {
        if (!this.props.amount) return null;
        const quantities = Util.calcTax(this.props.amount);
        return (
            <div className="card">
                <div className="card-block text-right pt-3 pr-3">
                    <h6 className="card-subtitle mb-2 text-muted">Desglose</h6>
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