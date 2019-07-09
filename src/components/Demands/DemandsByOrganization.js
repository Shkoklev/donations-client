import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {getDemandsForOrganization, getOrganizationById} from "../../repository/Organization";


class DemandsByOrganization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            demands: [],
            organization: ""
        }

    }

    componentDidMount() {
        let id = this.props.match.params.id;
        this.loadDemandsByOrganizationId(id);
        this.loadOrganizationById(id);
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
                <tr>
                    <td>{d.OrganizationDemand.demand.name}</td>
                    <td><p>{d.OrganizationDemand.demand.unit.name}</p><p>{d.OrganizationDemand.quantity}</p></td>
                    <td>
                        <button className="btn btn-info">Побарај донација</button>
                    </td>
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
                                <th>Побарај донација</th>
                            </tr>
                            </thead>
                            <tbody>
                            {showDemands}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(DemandsByOrganization);
