import './pagination.css';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteCard } from './../../actions/card_action';
import { showModal, MODAL_SIMPLE } from './../../actions/modal_action';
import { showLoader, hideLoader } from './../../actions/spinner_action';
import PropTypes from 'prop-types';
import DeleteCardTask from './../../requests/tasks/delete_card_task';
import Util from './../../utils/util';
import Pagination from 'react-js-pagination';

class CardsCard extends PureComponent {

    constructor(props) {
        super(props);
        this.state = Object.assign({ activePage: 1 }, this.calcPagination(props))
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    calcPagination(props, activePage = 1) {
        const chunk = this.getChunk(activePage, props.cards);
        return {
            chunk,
            totalItemsCount: props.cards.length
        }
    }

    componentWillReceiveProps(nextProps) {
        const oldPage = this.state.activePage;
        const prevLimit = oldPage - 1;
        const activePage = prevLimit * nextProps.itemsPage < nextProps.cards.length ? oldPage : oldPage - 1;
        const dataPagination = this.calcPagination(nextProps, activePage);
        const newState = Object.assign(this.state, dataPagination, activePage);
        this.setState(newState);
    }

    getChunk(pageNumber, cards) {
        const indexCards = pageNumber - 1;
        const nextIndex = indexCards * this.props.itemsPage;
        return cards.slice(nextIndex, nextIndex + this.props.itemsPage);
    }

    handlePageChange(pageNumber) {
        const chunk = this.getChunk(pageNumber, this.props.cards);
        this.setState({ chunk, activePage: pageNumber });
    }

    async deleteCard(card_id, cb = () => { }) {
        try {
            const request = { card_id }
            const response = await Util.performSimpleRequest(DeleteCardTask, request);
            this.props.deleteCard(card_id);
            Util.sendInfo({
                title: '¡Listo!',
                message: 'Se ha elminado la tarjeta de tu cuenta'
            });
            cb(response);
        } catch (errors) {
            Util.sendError({
                title: '¡Intenta de nuevo!',
                message: 'No pudimos eliminar la tarjeta de tu cuenta'
            });
            cb(errors);
        }
    }

    handleDelete(card_id) {
        this.props.showModal({
            modalType: MODAL_SIMPLE,
            modalProps: {
                content: '¿Estás seguro?',
                buttons: [
                    {
                        content: 'Si',
                        selected: true,
                        onClick: () => {
                            this.props.showLoader();
                            this.deleteCard(card_id, this.props.hideLoader);
                        }
                    }
                ]
            }
        });
    }

    render() {
        return (
            <div className='card col-sm-6 mb-3 col-md-12'>
                <div className='card-block'>
                    <h4 className='card-title'>Tarjetas</h4>
                    {this.state.chunk.length ?
                        <div>
                            <ul className="list-group">
                                {
                                    this.state.chunk.map(card => {
                                        console.error(card.id, 'id');
                                        return (
                                            <li key={card.id} className="list-group-item justify-content-between">
                                                {`Terminación ${card.number_mask}`}
                                                <span onClick={e => { this.handleDelete(card.id) }} className="badge badge-default badge-pill">
                                                    <i className="fa fa-trash danger" aria-hidden="true" />
                                                </span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.props.itemsPage}
                                totalItemsCount={this.state.totalItemsCount}
                                onChange={this.handlePageChange}
                                pageRangeDisplayed={3}
                            />
                        </div> :
                        <h6 className='card-subtitle mb-2 text-muted'>No tienes tarjetas registradas</h6 >
                    }
                    <span><a>Agregar tarjeta</a></span>
                </div>
            </div>
        )
    }

}

CardsCard.propTypes = {
    cards: PropTypes.array,
    itemsPage: PropTypes.number
}

CardsCard.defaultProps = {
    cards: [],
    itemsPage: 4
}

const mapStateToProps = state => ({ cards: state.cards });
const mapDispatchToProps = dispatch => bindActionCreators({
    showModal,
    showLoader,
    hideLoader,
    deleteCard
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CardsCard);