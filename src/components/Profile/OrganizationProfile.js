import React, {Component} from 'react';
import {getJwt} from "../../helpers/jwt";
import {getLoggedOrganization} from "../../repository/Organization";
import {Link} from "react-router-dom";

class OrganizationProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedOrganization: {},
            jwt: ""
        }
    }

    componentDidMount() {
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/login/organization');
        }

        getLoggedOrganization(jwt)
            .then(res => res.data)
            .then(body => {
                this.setState({
                    loggedOrganization: body
                })
            })
            .catch(err => {
                this.props.history.push('/login/organization');
            });
    }

    render() {
        console.log(this.state.loggedOrganization);
        return (
            <div className="container-fluid wrapper">
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-md-5">
                            <h2>{this.state.loggedOrganization.name}</h2>
                            <div className="mt-3">
                                <div className="p-2"><i className="fa fa-phone m-1"></i>Телефонски број: {this.state.loggedOrganization.phone}</div>
                                <div className="p-2"><i className="fa fa-envelope m-1"></i>E-mail: {this.state.loggedOrganization.email}</div>
                                <Link to="/organization/demands" className="btn btn-block btn-info">Погледни потреби</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrganizationProfile;
