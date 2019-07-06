import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {getDemandsForOrganization, getOrganizationById} from "../../repository/Organization";


class DemandsByOrganization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            demands: [],
            showDemands: "",
            organization: ""
        }

    }

    componentDidMount() {
        this.loadDemandsByOrganizationId();
        this.loadOrganizationById(this.props.organizationId);
    }

    loadDemandsByOrganizationId = () => {
        getDemandsForOrganization(this.props.organizationId)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    demands: data
                }, () => {
                    console.log("ova e vo loadDemands  demands ");
                    console.log(this.state.demands);
                    this.showDemandsByOrganization(this.state.demands);
                })
            });
    }

    showDemandsByOrganization = (demands) => {
        var dems = demands.map((d) => {
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
        this.setState({showDemands: dems});
    };

    loadOrganizationById = (organizationId) => {
        getOrganizationById(organizationId)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    organization: data
                }, () => {
                    console.log("ova e vo loadDemands  organization ");
                    console.log(this.state.organization);
                })
            });
    }


    render() {
        // console.log("ova e id na organizacijata");
        // console.log(this.props.organizationId);

        return (
            <div className="container">
                <div className="row">
                    <h3>{this.state.organization.name}</h3>
                </div>
                <div className="row">
                    <p>E-mail: {this.state.organization.email}</p>
                </div>
                <div className="row">
                    <p>Phone: {this.state.organization.phone}</p>
                </div>
                <div className="row">
                    <h5>Potrebi na {this.state.organization.name}</h5>
                </div>
                <div className="row">
                    <table className="table table-bordered ">
                        <thead className="thead-light">
                        <tr>
                            <th>Потреба</th>
                            <th>Количина</th>
                            <th>Побарај донација</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.showDemands}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter(DemandsByOrganization);
