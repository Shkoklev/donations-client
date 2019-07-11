import React, {Component} from 'react';
import {getJwt} from "../../helpers/jwt";
import {
    addDemandToOrganization, changeDemandQuantity,
    deletedDemandFromOrganization,
    getDemandsForOrganization,
    getLoggedOrganization
} from "../../repository/Organization";
import "./Demands.css"
import {getAllDemandCategories} from "../../repository/DemandCategory";
import {addNewDemand, getAllDemandsByCategory, getDemandById} from "../../repository/Demand";
import ReactModal from 'react-modal';

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

class DemandsForLoggedOrganization extends Component {

    constructor(props) {
        super(props);
        this.state = {
            demands: [],
            loggedOrganization: {},
            demandCategories: [],
            demandsByCategory: [],
            demand: {},
            demandUnit: "",
            demandQuantity: "",
            addDemandPanel: false,
            validationMessage: "",
            clickedDemandId: -1,
            modalIsOpen: false,
            addNewDemandMessage: ""
        }
    }

    componentDidMount() {
        this.getLoggedOrganization();
        this.loadDemandCategories();
        this.loadDemandsByCategory(1);
    }

    getLoggedOrganization() {
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/login/organization');
        }

        getLoggedOrganization(jwt)
            .then(res => res.data)
            .then(body => {
                this.setState({
                    loggedOrganization: body
                }, () => {
                    this.loadDemandsByOrganizationId(this.state.loggedOrganization.id);
                })
            })
            .catch(err => {
                this.props.history.push('/login/organization');
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

    loadDemandCategories = () => {
        getAllDemandCategories()
            .then(response => response.data)
            .then(data => {
                this.setState({
                    demandCategories: data
                });
            });
    };

    loadDemandsByCategory = (id) => {
        getAllDemandsByCategory(id)
            .then(response => response.data)
            .then(data => {
                this.setState({
                    demandsByCategory: data
                }, () => this.loadDemandById(this.state.demandsByCategory[0].id));
            });
    };

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

    showDemandsByOrganization = () => {
        return this.state.demands.map((d) => {
            return (
                <tr className="table-rows" key={d.OrganizationDemand.demand.id}>
                    <td>{d.OrganizationDemand.demand.category.name}</td>
                    <td>{d.OrganizationDemand.demand.name}</td>
                    <td> {this.state.clickedDemandId !== d.OrganizationDemand.demand.id &&
                    <span>
                        {d.OrganizationDemand.quantity} {d.OrganizationDemand.demand.unit.name}
                    </span>
                    }
                        {this.state.clickedDemandId === d.OrganizationDemand.demand.id &&
                        <div>
                            <input id="quantity" value={this.state.demandQuantity}
                                   onChange={this.onInsertDemandQuantity}/>
                            <span className="p-2">{this.state.demandUnit}</span>
                            <div>
                                <button onClick={this.onEditDemand} className="btn btn-success mt-1">Внеси</button>
                            </div>
                            {this.state.validationMessage &&
                            <div className="text-danger text-center">{this.state.validationMessage}</div>
                            }
                        </div>
                        }
                    </td>
                    <td>
                        <button
                            onClick={() => this.onChangeDemandQuantity(d.OrganizationDemand.demand.id, d.OrganizationDemand.quantity)}
                            className="btn btn-sm btn-primary btn-block">Промени
                        </button>
                        <button onClick={() => this.onDeleteDemand(d.OrganizationDemand.demand.id)}
                                className="btn btn-sm btn-danger btn-block">Избриши
                        </button>
                    </td>
                </tr>

            );
        });
    };

    onChangeDemandQuantity = (demandId, quantity) => {
        this.setState({
            clickedDemandId: demandId,
            addDemandPanel: false,
            demandQuantity: quantity
        }, () => this.loadDemandById(demandId))
    };

    onDeleteDemand = (demandId) => {
        let organizationId = this.state.loggedOrganization.id;

        deletedDemandFromOrganization(organizationId, demandId, getJwt())
            .then(response => {
                if (response.ok) {
                    this.loadDemandsByOrganizationId(this.state.loggedOrganization.id);
                }
            })
    };

    onAddDemand = () => {
        this.setState({
            addDemandPanel: true,
            clickedDemandId: -1,
            demandQuantity: 0
        });
    };

    onInsertDemand = () => {

        var demandRequest = {
            demandName: this.state.demand.name,
            quantity: this.state.demandQuantity
        };

        addDemandToOrganization(demandRequest, this.state.loggedOrganization.id, getJwt())
            .then(response => {
                if (!response.ok) {
                    throw response
                }
                return response.data
            })
            .then(data => {
                this.setState({
                    addDemandPanel: false
                }, () => this.loadDemandsByOrganizationId(this.state.loggedOrganization.id));
            })
            .catch(err => {
                err.text().then(errorMessage => {
                    const bodyAsJson = JSON.parse(errorMessage);
                    const message = bodyAsJson.message;
                    this.setState({
                        validationMessage: message
                    });
                });
            })
    };

    showDemandCategories = () => {
        return this.state.demandCategories.map((dc) => {
            return (
                <option key={dc.id} value={dc.id}>{dc.name}</option>
            )
        });
    };

    showDemandsByCategory = () => {
        return this.state.demandsByCategory.map((d) => {
            return (
                <option key={d.id} value={d.id}>{d.name}</option>
            )
        });
    };

    onChangeDemandCategory = (event) => {
        this.loadDemandsByCategory(event.target.value);
    };

    onChangeDemand = (event) => {
        this.loadDemandById(event.target.value);
    };

    onInsertDemandQuantity = (e) => {
        this.setState({
            demandQuantity: e.target.value
        });
    };

    onAddNewDemand = (event) => {

        event.preventDefault();

        var demandRequest = {
            name: event.target.demand.value,
            quantity: event.target.quantity.value,
            organization: this.state.loggedOrganization.name
        };

        if (!demandRequest.name || !demandRequest.quantity || !demandRequest.organization) {
            this.setState({
                addNewDemandMessage: "Внесете ги податоците."
            });
            return;
        }

        addNewDemand(demandRequest, getJwt());
        this.setState({
            addNewDemandMessage: "Барањето е успешно !"
        }, () => {
            setTimeout(() => {
                this.setState({modalIsOpen: false});
            }, 800)
        })
    };

    openModal = () => {
        this.setState({
            modalIsOpen: true,
        });
    };

    closeModal = () => {
        this.setState({
            modalIsOpen: false,
        });
    };

    onEditDemand = () => {
        let organizationId = this.state.loggedOrganization.id;
        let demandId = this.state.demand.id;

        var quantityRequest = {
            quantity: this.state.demandQuantity
        };

        changeDemandQuantity(organizationId, demandId, quantityRequest, getJwt())
            .then(response => {
                if (!response.ok) {
                    throw response
                }
                return response.data
            })
            .then(data => {
                this.setState({
                    clickedDemandId: -1,
                }, () => this.loadDemandsByOrganizationId(this.state.loggedOrganization.id));
            })
            .catch(err => {
                err.text().then(errorMessage => {
                    const bodyAsJson = JSON.parse(errorMessage);
                    const message = bodyAsJson.message;
                    this.setState({
                        validationMessage: message
                    });
                });
            })
    };

    getAddDemandPanel = () => {
        var addDemand = <tr></tr>
        if (this.state.addDemandPanel === true) {
            var showDemandCategories = this.showDemandCategories();
            var showDemandsByCategory = this.showDemandsByCategory();
            addDemand = (
                <tr className="table-rows">
                    <td>
                        <select onChange={this.onChangeDemandCategory} type="text"
                                className="form-control form-control-lg">
                            {showDemandCategories}
                        </select>
                    </td>
                    <td>
                        <select onChange={this.onChangeDemand} type="text"
                                className="form-control form-control-lg">
                            {showDemandsByCategory}
                        </select>
                    </td>
                    <td>
                        <span>
                            <input className="quantity" value={this.state.demandQuantity}
                                   onChange={this.onInsertDemandQuantity}/>
                            <span className="p-2">{this.state.demandUnit}</span>
                            {this.state.validationMessage &&
                            <div className="text-danger text-center">{this.state.validationMessage}</div>
                            }
                        </span>
                    </td>
                    <td>
                        <button onClick={this.onInsertDemand} className="btn btn-success btn-block">Внеси</button>
                        <button onClick={this.openModal} className="btn btn-primary btn-block">Не е на листата ?
                        </button>
                    </td>
                </tr>
            )
        }
        return addDemand;
    };

    render() {

        var showDemands = this.showDemandsByOrganization();
        var addDemandPanel = this.getAddDemandPanel();

        return (
            <div className="container-fluid wrapper">
                <div className="container">
                    <h3 className="text-center">{this.state.loggedOrganization.name}</h3>
                    <div className="mt-3">
                        <div className="text-center">
                            <p><i className="fa fa-envelope m-1"></i>E-mail: {this.state.loggedOrganization.email}</p>
                        </div>
                        <div className="text-center">
                            <p><i className="fa fa-phone m-1"></i>Телефонски број: {this.state.loggedOrganization.phone}
                            </p>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h3>Наши потреби</h3>
                    </div>
                    <div className="row">
                        <table className="table table-bordered" id="tabla">
                            <thead className="thead-light">
                            <tr>
                                <th>Категорија</th>
                                <th>Потреба</th>
                                <th>Количина</th>
                            </tr>
                            </thead>
                            <tbody>
                            {showDemands}
                            {addDemandPanel}
                            </tbody>
                        </table>
                    </div>
                    <div className="row mb-5">
                        <button onClick={this.onAddDemand} className="btn btn-success mb-5">Внеси потреба</button>
                    </div>
                    <ReactModal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                    >
                        <form onSubmit={this.onAddNewDemand}>
                            <div className="p-1">
                                <span>
                                   <p>
                                       Внесете потреба:
                                       <input className="m-1 quantity" name="demand" type="text"/>
                                   </p>
                                </span>
                            </div>
                            <div className="p-1">
                                <span>
                                   <p>
                                       Внесете количина:
                                       <input className="m-1 quantity" name="quantity"/>
                                   </p>
                                </span>
                            </div>
                            <button type="submit" className="btn btn-success btn-block">Испрати барање</button>
                        </form>
                        {this.state.addNewDemandMessage &&
                        <div className="text-center text-success">{this.state.addNewDemandMessage}</div>
                        }
                    </ReactModal>
                </div>
            </div>
        )
    }
}

export default DemandsForLoggedOrganization;
