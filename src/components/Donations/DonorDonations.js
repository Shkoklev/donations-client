import React, {Component} from 'react';
import {getJwt} from "../../helpers/jwt";
import {getLoggedDonor} from "../../repository/Donor";
import './DonorDonations.css';
import pic from "../../don-heart.png";
import ReactModal from 'react-modal';
import {deleteDonation, getPendingDonationsForDonor, getSuccessfulDonationsForDonor} from "../../repository/Donation";

const customStyles = {
    content: {
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'whitesmoke'
    }
};

ReactModal.setAppElement(document.getElementById('root'));

class DonorDonations extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedDonor: {},
            donations: [],
            pendingDonations: true,
            modalIsOpen: false,
            donationId: -1
        }
    }

    componentDidMount() {
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/login/donor');
        }

        this.loadLoggedDonor(jwt);
    }

    loadLoggedDonor = (jwt) => {
        getLoggedDonor(jwt)
            .then(res => res.data)
            .then(body => {
                this.setState({
                    loggedDonor: body
                }, () => this.loadPendingDonations(jwt))
            })
            .catch(err => {
                this.props.history.push('/login/donor');
            });
    };

    loadPendingDonations = (jwt) => {
        let donorId = this.state.loggedDonor.id;
        getPendingDonationsForDonor(donorId, jwt)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    donations: data,
                    pendingDonations: true
                })
            });
    };

    loadSuccessfulDonations = (jwt) => {
        let donorId = this.state.loggedDonor.id;
        getSuccessfulDonationsForDonor(donorId, jwt)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    donations: data,
                    pendingDonations: false
                })
            });
    };

    getPendingDonations = () => {
        this.loadPendingDonations(getJwt());
    };

    getSuccessfulDonations = () => {
        this.loadSuccessfulDonations(getJwt());
    };

    deleteDonation = () => {
        let donorId = this.state.loggedDonor.id;
        let donationId = this.state.donationId;
        deleteDonation(donorId, donationId, getJwt())
            .then(data => {
                this.closeModal();
                this.loadPendingDonations(getJwt());
            });
    };

    openModal = (donationId) => {
        this.setState({
            modalIsOpen: true,
            donationId: donationId
        });
    };

    closeModal = () => {
        this.setState({
            modalIsOpen: false,
            donationId: -1
        });
    };

    showDonations = () => {
        return this.state.donations.map((donation) => {
            let statusMessage = (donation.status === "Pending") ? "Активна" : "Успешна";
            return (
                <tr key={donation.id}>
                    <td>
                        <img src={pic} alt=""/>
                    </td>
                    <td>
                        <span className="label label-default">{statusMessage}</span>
                    </td>
                    <td>
                        {donation.organization.name}
                    </td>
                    <td>
                        {donation.demand.name} X {donation.quantity}
                    </td>
                    <td>
                        {new Date(donation.validUntil).toLocaleDateString()}
                    </td>
                    {this.state.pendingDonations &&
                    <td style={{width: '10%'}}>
                        <a href="#" className="table-link danger">
                            <div onClick={() => this.openModal(donation.id)} className="fa-stack">
                                <i className="fa fa-square fa-stack-2x"></i>
                                <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                            </div>
                        </a>
                    </td>
                    }
                </tr>
            )
        });
    };

    render() {

        var donations = this.showDonations();

        return (
            <div className="container-fluid wrapper">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-lg-12">
                            <h2 className="text-center mb-3">Мои донации</h2>
                            <button onClick={this.getPendingDonations} className="btn btn-primary m-1">Донации во тек
                            </button>
                            <button onClick={this.getSuccessfulDonations} className="btn btn-success m-1">Успешни
                                донации
                            </button>
                            <div className="main-box clearfix">
                                <div className="table-responsive">
                                    <table className="table user-list table-rows">
                                        <thead>
                                        <tr>
                                            <th>&nbsp;</th>
                                            <th><span>Статус</span></th>
                                            <th><span>Организација</span></th>
                                            <th><span>Донација</span></th>
                                            {this.state.pendingDonations && <th><span>Валидност до</span></th>}
                                            {!this.state.pendingDonations && <th><span>Датум</span></th>}
                                            {this.state.pendingDonations &&  <th>&nbsp;</th> }
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {donations}
                                        </tbody>
                                    </table>
                                </div>
                                <ReactModal
                                    isOpen={this.state.modalIsOpen}
                                    onRequestClose={this.closeModal}
                                    style={customStyles}
                                >
                                    <h5 className="text-center text-danger">Сакате да го прекинете барањето за оваа
                                        донација ?</h5>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <button onClick={this.closeModal}
                                                    className="btn btn-success m-1 btn-block float-left">Не
                                            </button>
                                        </div>
                                        <div className="col-md-6">
                                            <button onClick={this.deleteDonation}
                                                    className="btn btn-danger m-1 btn-block float-right">Да
                                            </button>
                                        </div>
                                    </div>
                                </ReactModal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DonorDonations;
