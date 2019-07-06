import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import NavLink from "react-router-dom/es/NavLink";
import {loginOrganization} from "../../repository/Organization";
import pic from "../../organization.png";

class LoginOrganization extends Component {
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
        loginOrganization(formData)
            .then(response => {
                if (!response.ok) {
                    throw response
                }
                var token = response.headers.get('authorization');
                localStorage.setItem('jwtToken', token);
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
                            <h3 className="text-center mb-3 font-weight-bold text-dark">ORGANIZATION LOGIN</h3>
                            <div className="text-center">
                                <img src={pic} alt="" className="rounded-circle mb-4" />
                            </div>
                            {this.state.validationMessage &&
                            <h5 className="text-danger text-center">{this.state.validationMessage}</h5>
                            }
                            <form className="mb-5" onSubmit={this.onFormSubmit}>
                                <div className="form-group">
                                    <input type="email"
                                           className="form-control form-control-lg"
                                           placeholder="Email адреса на вашата организација"
                                           name="email"
                                           id="email" required/>
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                           className="form-control form-control-lg"
                                           placeholder="Пасворд на вашата организација"
                                           name="password"
                                           id="password" required/>
                                </div>
                                <div>
                                    <button type="submit"
                                            className="btn btn-success mt-4 btn-block float-right">Најавете
                                        се
                                    </button>
                                    <NavLink to="/login/donor" style={{textDecoration: 'none'}}>
                                        <button className="btn btn-primary mt-4 btn-block float-left">
                                            Најавете се како Донор
                                            <i className="fa fa-arrow-circle-right ml-1"></i>
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

export default withRouter(LoginOrganization);

