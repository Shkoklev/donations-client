import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {loginDonor} from "../../repository/Donor";
import NavLink from "react-router-dom/es/NavLink";
import pic from "../../donor.jpg";

class LoginDonor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            validationMessage: ''

        };
    }

    onFormSubmit = (formSubmitEvent) => {
        formSubmitEvent.preventDefault();
        this.login({
            email: formSubmitEvent.target.email.value,
            password: formSubmitEvent.target.password.value
        });
    };

    login = (formData) => {
        loginDonor(formData)
            .then(response => {
                if (!response.ok) {
                    throw response
                }
                var token = response.headers.get('authorization');
                localStorage.setItem('jwtToken', token);
                window.location.href = '/organizations';
            })
            .catch(err => {
                const message = "Внесовте погрешни информации.";
                this.setState({
                    validationMessage: message
                });
            });
    };

    render() {
        return (
            <div className="container-fluid wrapper">
                <div className="container">
                    <div className="row pt-4">
                        <div className="col-md-6 m-auto">
                            <h3 className="text-center mb-3 font-weight-bold text-dark">DONOR LOGIN</h3>
                            <div className="text-center">
                                <img src={pic} alt="" className="rounded-circle mb-3"
                                     style={{width: '200px', height: '200px'}}/>
                            </div>
                            {this.state.validationMessage &&
                            <h5 className="text-danger text-center">{this.state.validationMessage}</h5>
                            }
                            <form className="mb-5" onSubmit={this.onFormSubmit}>
                                <div className="form-group">
                                    <input type="email"
                                           className="form-control form-control-lg" placeholder="Email адреса"
                                           autoComplete="off"
                                           name="email"
                                           id="email" required/>
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                           className="form-control form-control-lg" placeholder="Пасворд"
                                           autoComplete="off"
                                           name="password"
                                           id="password" required/>
                                </div>
                                <div>
                                    <button type="submit"
                                            className="btn btn-success mt-4 btn-block float-right">Најавете се
                                    </button>
                                    <NavLink to="/login/organization" style={{textDecoration: 'none'}}>
                                        <button className="btn btn-primary mt-4 btn-block float-left">
                                            <i className="fa fa-arrow-circle-left mr-1"></i>
                                            Најавете се со вашата организација
                                        </button>
                                    </NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(LoginDonor);

