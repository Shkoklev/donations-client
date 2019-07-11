import React, {Component} from 'react';
import {getJwt} from "../../helpers/jwt";
import {getLoggedOrganization} from "../../repository/Organization";
import './OrganizationDonations.scss';
import ReactModal from 'react-modal';
import {
    acceptDonation,
    declineDonation,
    getPendingDonationsForOrganization,
    getSuccessfulDonationsForOrganization
} from "../../repository/Donation";

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


class OrganizationDonations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedOrganization: {},
            donations: [],
            modalIsOpen: false,
            selectedDonationId: -1,
            actionName: ""
        }
    }

    componentDidMount() {
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/login/organization');
        }

        this.loadLoggedOrganization(jwt);
    }

    loadLoggedOrganization(jwt) {
        getLoggedOrganization(jwt)
            .then(res => res.data)
            .then(body => {
                this.setState({
                    loggedOrganization: body
                }, () => this.loadPendingDonations(jwt))
            })
            .catch(err => {
                this.props.history.push('/login/organization');
            });
    }

    loadPendingDonations = (jwt) => {
        let organizationId = this.state.loggedOrganization.id;
        getPendingDonationsForOrganization(organizationId, jwt)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    donations: data
                })
            });
    };

    loadSuccessfulDonations = (jwt) => {
        let organizationId = this.state.loggedOrganization.id;
        getSuccessfulDonationsForOrganization(organizationId, jwt)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    donations: data
                })
            });
    };

    openModal = (donationId, actionName) => {
        this.setState({
            modalIsOpen: true,
            selectedDonationId: donationId,
            actionName: actionName
        });
    };

    closeModal = () => {
        this.setState({
            modalIsOpen: false,
            selectedDonationId: -1
        });
    };

    acceptDonation = () => {
        let organizationId = this.state.loggedOrganization.id;
        let donationId = this.state.selectedDonationId;
        acceptDonation(organizationId, donationId, getJwt())
            .then(response => {
                this.closeModal();
                this.loadPendingDonations(getJwt());
            });
    };

    declineDonation = () => {
        let organizationId = this.state.loggedOrganization.id;
        let donationId = this.state.selectedDonationId;
        declineDonation(organizationId, donationId, getJwt())
            .then(response => {
                this.closeModal();
                this.loadPendingDonations(getJwt());
            });
    };

    showDonations = () => {
        return this.state.donations.map((donation) => {
            return (
                <tr key={donation.id}>
                    <td>
                        <img id="donor-list-image" src={donation.donor.pictureUrl} alt=""/>
                    </td>
                    <td>
                        <span
                            className="label label-default">{donation.donor.firstName} {donation.donor.lastName}</span>
                    </td>
                    <td>
                        {donation.demand.name} X {donation.quantity}
                    </td>
                    <td>
                        {donation.donor.phone}
                    </td>
                    <td>
                        {new Date(donation.validUntil).toLocaleDateString()}
                    </td>
                    <td style={{width: '8%'}}>
                        <div className="div-pointer" onClick={() => this.openModal(donation.id, "accept")}>
                            <span>
                                <i className="fa fa-check text-success fa-2x"></i>
                            </span>
                        </div>
                    </td>
                    <td style={{width: '8%'}}>
                        <div className="div-pointer" onClick={() => this.openModal(donation.id, "decline")}>
                            <span>
                                <i className="fa fa-ban text-danger fa-2x"></i>
                            </span>
                        </div>
                    </td>
                </tr>
            )
        });
    };

    render() {

        var donations = this.showDonations();

        return (
            <div className="container-fluid wrapper">
                <div className="container">
                    <h3 className="text-center mb-4">{this.state.loggedOrganization.name}</h3>
                    <div className="table-users">
                        <div className="header">Активни барања за донации</div>

                        <table cellSpacing="0">
                            <thead>
                            <tr>
                                <th>&nbsp;</th>
                                <th>Корисник</th>
                                <th>Сака да донира</th>
                                <th>Телефонски број</th>
                                <th>Трае до</th>
                                <th>Прифати</th>
                                <th>Одбиј</th>
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
                        {this.state.actionName === "accept" &&
                        <h5 className="text-center text-danger">Сакате да ја прифатите донацијата ?</h5>}
                        {this.state.actionName === "decline" &&
                        <h5 className="text-center text-danger">Сакате да ја одбиете донацијата ?</h5>}
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <button onClick={this.closeModal}
                                        className="btn btn-danger m-1 btn-block float-left">Не
                                </button>
                            </div>
                            <div className="col-md-6">
                                {this.state.actionName === "accept" &&
                                <button onClick={this.acceptDonation}
                                        className="btn btn-success m-1 btn-block float-right">Да
                                </button>
                                }
                                {this.state.actionName === "decline" &&
                                <button onClick={this.declineDonation}
                                        className="btn btn-success m-1 btn-block float-right">Да
                                </button>
                                }
                            </div>
                        </div>
                    </ReactModal>
                </div>
            </div>
        );
    }
}

export default OrganizationDonations;
