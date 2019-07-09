import React, {Component} from 'react';
import {Link} from "react-router-dom";
import logo from "../../donate-now-button.png";
import {getJwt, removeJwt} from "../../helpers/jwt";
import axios from "axios";
import {getLoggedDonor, logoutDonor} from "../../repository/Donor";
import {getLoggedOrganization, logoutOrganization} from "../../repository/Organization";
import './Navbar.css'

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedAsDonor: false,
            loggedAsOrganization: false,
            user: {}
        };
    }

    componentDidMount() {
        if (!this.checkJwtExistence()) {
            return;
        }

        this.getLoggedDonor();
        this.getLoggedOrganization();
    }

    checkJwtExistence() {
        const jwtoken = getJwt();
        if (jwtoken == null) {
            this.setState({
                loggedAsDonor: false,
                loggedAsOrganization: false,
                user: {}
            });
            return false;
        }
        return true;
    }

    getLoggedDonor() {
        const jwtoken = getJwt();
        getLoggedDonor(jwtoken).then(res => {
            this.setState({
                user: res.data,
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
                user: res.data,
                loggedAsDonor: false,
                loggedAsOrganization: true
            });
        })
            .catch(err => {
                this.setState({
                    loggedAsOrganization: false
                });
            });
    }

    logoutDonor = () => {
        logoutDonor()
            .then(res => {
                this.setState({
                    user: {},
                    loggedAsDonor: false
                });
                removeJwt();
                window.location.reload();
            });
    };

    logoutOrganization = () => {
        logoutOrganization()
            .then(res => {
                this.setState({
                    user: {},
                    loggedAsOrganization: false
                });
                removeJwt();
                window.location.reload();
            });
    };

    render() {

        let headerPanel;

        if (this.state.loggedAsDonor) {
            headerPanel = <ul className="nav navbar-nav ml-auto">
                <li className="nav-item dropdown weak navli">
                    <button href="#" className="btn btn-sm rounded btn-light nav-link dropdown-toggle"
                            data-toggle="dropdown">
                        <i className="fa fa-user m-1"></i>
                        {this.state.user.firstName} {this.state.user.lastName}
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <Link className="dropdown-item" to="/donor/profile">Профил</Link>
                        <a href="#" className="dropdown-item">Мои донации</a>
                        <div className="dropdown-divider"></div>
                        <a href="#" onClick={this.logoutDonor} className="dropdown-item">Logout</a>
                    </div>
                </li>
            </ul>
        } else if (this.state.loggedAsOrganization) {
            headerPanel = <ul className="nav navbar-nav ml-auto">
                <li className="nav-item dropdown weak navli">
                    <button href="#" className="btn btn-sm rounded btn-light nav-link dropdown-toggle"
                            data-toggle="dropdown">
                        <i className="fa fa-users m-1"></i>
                        {this.state.user.name}
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <Link className="dropdown-item" to="/organization/profile">Профил</Link>
                        <Link to="/organization/demands" className="dropdown-item">Потреби</Link>
                        <div className="dropdown-divider"></div>
                        <a href="#" onClick={this.logoutOrganization} className="dropdown-item">Logout</a>
                    </div>
                </li>
            </ul>
        } else {
            headerPanel = <ul className="navbar-nav ml-auto">
                <li className="nav-item navli">
                    <Link className="nav-link text-white" to="/register">Регистрирај се</Link>
                </li>
                <li className="nav-item navli">
                    <Link className="nav-link text-white" to="/login/donor">Најави се</Link>
                </li>
            </ul>
        }

        return (
            <nav className="navbar navbar-expand-sm navbar-danger bg-danger  text-white">
                <div className="container-fluid">
                    <Link to="/">
                        <img src={logo} alt="" style={{width: "60px", height: "55px"}} className="rounded mr-3"/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"> </span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item navli">
                                <Link className="nav-link text-white" to="/about-us"> За нас
                                </Link>
                            </li>
                            <li className="nav-item navli">
                                <Link className="nav-link text-white" to="/organizations"> Организации
                                </Link>
                            </li>
                            <li className="nav-item navli">
                                <Link className="nav-link text-white" to="/contact"> Контакт
                                </Link>
                            </li>
                            <li className="nav-item navli">
                                <button className="btn" style={{background: "#3DBD5D", color: "white"}}>Донирај сега
                                </button>
                            </li>
                        </ul>

                        {headerPanel}
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
