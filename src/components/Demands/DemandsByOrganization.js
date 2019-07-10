import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {getDemandsForOrganization, getLoggedOrganization, getOrganizationById} from "../../repository/Organization";
import {getJwt} from "../../helpers/jwt";
import {getLoggedDonor} from "../../repository/Donor";
import ReactModal from 'react-modal';
import {getDemandById} from "../../repository/Demand";
import {donate} from "../../repository/Donation";

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

class DemandsByOrganization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            demands: [],
            organization: {},
            loggedAsOrganization: false,
            loggedAsDonor: false,
            loggedDonor: {},
            modalIsOpen: false,
            demand: {},
            demandUnit: "",
            demandQuantity: 0,
            validationMessage: "",
            donationMessage: ""
        }

    }

    componentDidMount() {
        let id = this.props.match.params.id;
        this.loadDemandsByOrganizationId(id);
        this.loadOrganizationById(id);
        if (!this.checkJwtExistence()) {
            return;
        }
        this.getLoggedOrganization();
        this.getLoggedDonor();
    }

    loadDemandById = (id) => {
        getDemandById(id)
            .then(response => response.data)
            .then(data => {
                this.setState({
                    demand: data,
                    demandUnit: data.unit.name
                });
            });
    };

    checkJwtExistence() {
        const jwtoken = getJwt();
        if (jwtoken == null) {
            this.setState({
                loggedAsOrganization: false
            });
            return false;
        }
        return true;
    }

    getLoggedDonor() {
        const jwtoken = getJwt();
        getLoggedDonor(jwtoken).then(res => {
            this.setState({
                loggedDonor: res.data,
                loggedAsDonor: true,
                loggedAsOrganization: false
            });
        })
            .catch(err => {
                this.setState({
                    loggedAsDonor: false
                });
            });
    }

    getLoggedOrganization() {
        const jwtoken = getJwt();
        getLoggedOrganization(jwtoken).then(res => {
            this.setState({
                loggedAsOrganization: true,
                loggedAsDonor: false
            });
        })
            .catch(err => {
                this.setState({
                    loggedAsOrganization: false
                });
            });
    }

    loadDemandsByOrganizationId = (id) => {
        getDemandsForOrganization(id)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    demands: data
                })
            });
    };

    showDemandsByOrganization = () => {
        return this.state.demands.map((d) => {
            return (
                <tr className="table-rows" key={d.OrganizationDemand.demand.id}>
                    <td>{d.OrganizationDemand.demand.name}</td>
                    <td>
                        <span>
                        {d.OrganizationDemand.quantity} {d.OrganizationDemand.demand.unit.name}
                       </span>
                    </td>
                    {!this.state.loggedAsOrganization &&
                    <td>
                        <button
                            onClick={() => this.openModal(d.OrganizationDemand.demand.id, d.OrganizationDemand.quantity)}
                            className="btn btn-info">Побарај донација
                        </button>
                    </td>
                    }
                </tr>

            );
        });
    };

    loadOrganizationById = (organizationId) => {
        getOrganizationById(organizationId)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    organization: data
                })
            });
    };

    openModal = (demandId, quantity) => {
        if (!this.state.loggedAsDonor) {
            this.props.history.push('/login/donor');
        }
        this.setState({
            modalIsOpen: true,
            validationMessage: "",
            donationMessage: "",
            demandQuantity: quantity,
        }, () => this.loadDemandById(demandId));

    };

    closeModal = () => {
        this.setState({
            modalIsOpen: false,
        });
    };

    onFormSubmit = (e) => {
        e.preventDefault();

        if (isNaN(e.target.quantity.value)) {
            this.setState({
                validationMessage: "Мора да внесете број !"
            });
            return;
        }

        var idWrapper = {
            donorId: this.state.loggedDonor.id,
            organizationId: this.state.organization.id,
            demandId: this.state.demand.id
        };

        var quantityRequest = {
            quantity: e.target.quantity.value
        };

        donate(idWrapper, quantityRequest, getJwt())
            .then(response => {
                if (!response.ok) {
                    throw response
                }
                return response.data
            })
            .then(data => {
                this.setState({
                    donationMessage: "Барањето е успешно !",
                    validationMessage: ""
                    //    modalIsOpen: false
                }, () => {
                    setTimeout(() => {
                        this.setState({modalIsOpen: false});
                    }, 800);
                });
            }).catch(err => {
            err.text().then(errorMessage => {
                const bodyAsJson = JSON.parse(errorMessage);
                const message = bodyAsJson.message;
                this.setState({
                    validationMessage: message
                });
            });
        })
    };


    render() {

        var showDemands = this.showDemandsByOrganization();

        return (
            <div className="container-fluid wrapper">
                <div className="container">
                    <h3 className="text-center">{this.state.organization.name}</h3>
                    <div className="mt-3">
                        <div className="text-center">
                            <p><i className="fa fa-envelope m-1"></i>E-mail: {this.state.organization.email}</p>
                        </div>
                        <div className="text-center">
                            <p><i className="fa fa-phone m-1"></i>Телефонски број: {this.state.organization.phone}</p>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h5>Потреби на {this.state.organization.name}</h5>
                    </div>
                    <div className="row">
                        <table className="table table-bordered" id="tabla">
                            <thead className="thead-light">
                            <tr>
                                <th>Потреба</th>
                                <th>Количина</th>
                                {!this.state.loggedAsOrganization &&
                                <th>Побарај донација</th>
                                }
                            </tr>
                            </thead>
                            <tbody>
                            {showDemands}
                            </tbody>
                        </table>
                    </div>
                    <ReactModal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                    >
                        <h5 className="mb-3 text-center">Сакате да донирате ?</h5>
                        <div>
                            <div className="p-1">За: {this.state.organization.name}</div>
                            <div className="p-1">Потреби: {this.state.demandQuantity} {this.state.demand.name}</div>
                            <form onSubmit={this.onFormSubmit}>
                                <div className="p-1">
                                <span>
                                   <p>
                                       Внесете количество:
                                       <input className="m-1" name="quantity" id="quantity" type="text"/>
                                   </p>
                                    {this.state.validationMessage &&
                                    <div className="text-danger text-center">{this.state.validationMessage}</div>
                                    }
                                    {this.state.donationMessage &&
                                    <div
                                        className="text-success font-weight-bold text-center">
                                        <i className="fa fa-check text-success m-1"></i>
                                        {this.state.donationMessage}
                                    </div>
                                    }
                                </span>
                                </div>
                                <div className="p-1">
                                    <button type="submit" className="btn btn-success btn-block">Испрати барање за
                                        донација
                                    </button>
                                </div>
                            </form>
                        </div>
                    </ReactModal>
                </div>
            </div>
        );
    }
}

export default withRouter(DemandsByOrganization);
