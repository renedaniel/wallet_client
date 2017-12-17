import './../card/pagination.css';
import React, { Component } from 'react';
import TransactionHistoryTask from './../../requests/tasks/transaction_history_task';
import Translator from './../../utils/translator';
import Util from './../../utils/util';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';

class TransactionHistory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            transactions: null,
            isLoading: true,
            chunk: [],
            activePage: 1,
            totalItemsCount: 0
        }
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    getChunk(pageNumber, transactions) {
        const indexCards = pageNumber - 1;
        const nextIndex = indexCards * this.props.itemsPage;
        return transactions.slice(nextIndex, nextIndex + this.props.itemsPage);
    }

    handlePageChange(pageNumber) {
        const chunk = this.getChunk(pageNumber, this.state.transactions);
        this.setState({ chunk, activePage: pageNumber });
    }

    componentDidMount() {
        //TODO refactor to put this on store, this is the easy way
        this.fetchTransactions();
    }

    async fetchTransactions() {
        try {
            const response = await Util.performSimpleRequest(TransactionHistoryTask);
            const transactions = response.transactions;
            const totalItemsCount = transactions.length;
            const chunk = this.getChunk(this.state.activePage, transactions);
            this.setState({ transactions, chunk, totalItemsCount, isLoading: false });
        } catch (errors) {
            console.log(errors);
        }
    }

    render() {
        if (this.state.isLoading) return null;
        if (!this.state.transactions) {
            return (
                <div className="row text-center">
                    <div className="col-sm-12 mt-10">
                        <h4>No has realizado ninguna acción con tu cuenta</h4>
                        <p>Ve a recargar para comenzar</p>
                    </div>
                </div>
            )
        }
        return (
            <div className='container'>
                <h1>Tu Historial</h1>
                <table className="table table-responsive">
                    <thead>
                        <tr>
                            <th>Accion</th>
                            <th>Destinatario</th>
                            <th>Tarjeta</th>
                            <th>Cantidad</th>
                            <th>Comisión</th>
                            <th>Total</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.chunk.map(transaction => {
                                const { transaction_type, amount, total, fixed_rate, commission_amount, bank_account, created_at, account_number, card_mask } = transaction;
                                const commission = commission_amount + fixed_rate;
                                return (
                                    <tr>
                                        <td>{transaction_type}</td>
                                        <td>{bank_account ? bank_account : account_number}</td>
                                        <td>{card_mask}</td>
                                        <td>{amount}</td>
                                        <td>{commission}</td>
                                        <td>{total}</td>
                                        <td>{new Date(created_at).toISOString().substring(0, 10)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.props.itemsPage}
                    totalItemsCount={this.state.totalItemsCount}
                    onChange={this.handlePageChange}
                    pageRangeDisplayed={3}
                />
            </div>
        )
    }
}

TransactionHistory.propTypes = {
    onSelectOption: PropTypes.func,
    itemsPage: PropTypes.number,
}

TransactionHistory.defaultProps = {
    onSelectOption: () => { },
    itemsPage: 5,
}

export default TransactionHistory;