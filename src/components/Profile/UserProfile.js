import React, {Component} from 'react';
import {getJwt} from "../../helpers/jwt";
import {editDonor, getLoggedDonor} from "../../repository/Donor";
import pic from "../../don-profile.png";
import "./UserProfile.css"

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedDonor: {},
            jwt: ""
        }
    }

    componentDidMount() {
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/login/donor');
        }

        getLoggedDonor(jwt)
            .then(res => res.data)
            .then(body => {
                this.setState({
                    loggedDonor: body
                })
            })
            .catch(err => {
                this.props.history.push('/login/donor');
            });
    }

    onFormSubmit = (formSubmitEvent) => {
        formSubmitEvent.preventDefault();
        this.editDonor({
            firstName: formSubmitEvent.target.firstName.value,
            lastName: formSubmitEvent.target.lastName.value,
            phone: formSubmitEvent.target.phone.value,
            email: formSubmitEvent.target.email.value,
            password: formSubmitEvent.target.password.value,
        });
    };

    editDonor = (editDonorRequest) => {
        const jwt = getJwt();
        const donorId = this.state.loggedDonor.id;
        editDonor(jwt, donorId, editDonorRequest)
            .then(response => {
                if (!response.ok) {
                    throw response
                }
                return response.json()
            })
            .then(data => {
                this.setState({
                    loggedDonor: data
                });
                window.location.reload();
            })
            .catch(err => {
                err.text().then(errorMessage => {
                    const bodyAsJson = JSON.parse(errorMessage);
                    const message = bodyAsJson.message;
                    console.log(message);
                    this.setState({
                        validationMessage: message
                    });
                });
            })
    };

    render() {

        return (
            <div className="container-fluid wrapper">
                <div className="container">
                    <h1 className="mt-3">Мој профил</h1>
                    <div className="row mt-2 mb-5">
                        <div className="col-md-3">
                            <div className="text-center">
                                <img src={this.state.loggedDonor.pictureUrl} id="avatar"
                                     alt="avatar"/>
                                <h6>Промени фотографија</h6>
                                <input type="file" className="form-control"/>
                            </div>
                            <div className="p-3">
                                <h6>Поени од донации: {this.state.loggedDonor.points}</h6>
                                <h6>Број на активни донации: {this.state.loggedDonor.numberOfPendingDonations}</h6>
                                <h6>Неуспешни донации: {this.state.loggedDonor.failedConsecutiveDonations}</h6>
                                <div className="text-center">
                                    <img src={pic} id="donation-image"
                                         alt="donations"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-9 personal-info">

                            <h3>Лични податоци</h3>

                            <form onSubmit={this.onFormSubmit} className="form-horizontal" role="form">
                                <div className="form-group">
                                    <label
                                        className="col-lg-3 control-label">Име: {this.state.loggedDonor.firstName}</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="text"
                                               id="firstName"
                                               name="firstName"
                                               placeholder={this.state.loggedDonor.firstName}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label
                                        className="col-lg-3 control-label">Презиме: {this.state.loggedDonor.lastName}</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="text"
                                               id="lastName"
                                               name="lastName"
                                               placeholder={this.state.loggedDonor.lastName}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <span
                                        className="col-lg-3"><i className="fa fa-phone m-1"></i>Телефонски
                                        број: {this.state.loggedDonor.phone}</span>
                                    <div className="col-lg-8 mt-2">
                                        <input className="form-control" type="text"
                                               id="phone"
                                               name="phone"
                                               placeholder={this.state.loggedDonor.phone}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label"><i className="fa fa-envelope m-1"></i>Email:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="email"
                                               id="email"
                                               name="email"
                                               placeholder={this.state.loggedDonor.email}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-3 control-label">Нов пасворд:</label>
                                    <div className="col-md-8">
                                        <input className="form-control" type="password"
                                               id="password"
                                               name="password"
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-5">
                                    <div className="col-md-8 mb-3 text-center">
                                        <button type="submit" className="btn btn-block btn-success"
                                                value="Зачувај податоци">
                                            Зачувај
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfile;
