import './../card/pagination.css';
import React, { Component } from 'react';
import TransactionHistoryTask from './../../requests/tasks/transaction_history_task';
import Translator from './../../utils/translator';
import Util from './../../utils/util';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

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
        if (!this.state.transactions.length) {
            return (
                <div className="row text-center">
                    <div className="col-sm-12 mt-10">
                        <h4>No has utilizado tu cuenta</h4>
                        <p>Ve a recargar para comenzar</p>
                        <button onClick={() => this.props.onSelectOption('deposit')} className="btn-lg">¡Recargar!</button>
                    </div>
                </div>
            )
        }
        return (
            <div className=''>
                <Table className="table table-responsive">
                    <Thead>
                        <Tr>
                            <Th>Accion</Th>
                            <Th>Destinatario</Th>
                            <Th>Tarjeta</Th>
                            <Th>Cantidad</Th>
                            <Th>Comisión</Th>
                            <Th>Total</Th>
                            <Th>Fecha</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            this.state.chunk.map(transaction => {
                                const { transaction_type, amount, total, fixed_rate, commission_amount, bank_account, created_at, account_number, card_mask } = transaction;
                                const commission = commission_amount + fixed_rate;
                                return (
                                    <Tr key={transaction.id}>
                                        <Td>{transaction_type}</Td>
                                        <Td>{bank_account ? bank_account : account_number}</Td>
                                        <Td>{card_mask}</Td>
                                        <Td>{Util.formatAmount(amount)}</Td>
                                        <Td>{Util.formatAmount(commission)}</Td>
                                        <Td>{Util.formatAmount(total)}</Td>
                                        <Td>{new Date(created_at).toISOString().substring(0, 10)}</Td>
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
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