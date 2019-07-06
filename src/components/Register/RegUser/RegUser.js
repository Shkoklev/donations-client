import React, {Component} from 'react';
import {registerDonor} from "../../../repository/Donor";

class RegisterUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            validationMessage: "",
            isFormValid: false
        };
    }

    onFormSubmit = (formSubmitEvent) => {
        formSubmitEvent.preventDefault();
        try {
            this.verifyPassword(formSubmitEvent.target.password.value, formSubmitEvent.target.password2.value);
        } catch (error) {
            console.log(error);
            return {};
        }
        this.register({
            firstName: formSubmitEvent.target.firstName.value,
            lastName: formSubmitEvent.target.lastName.value,
            email: formSubmitEvent.target.email.value,
            phone: formSubmitEvent.target.phone.value,
            password: formSubmitEvent.target.password.value,
        })

    };

    register = (donor) => {
        registerDonor(donor)
            .then(response => {
                if (!response.ok) {
                    throw response
                }
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

    verifyPassword = (password, verifiedPassword) => {
        if (password.localeCompare(verifiedPassword) !== 0) {
            const message = "Пасвордите не се еднакви.";
            this.setState({
                validationMessage: message
            });
            throw message
        }
    };

    render() {
        return (

            <div className="col-md-10 m-auto mb-5">
                <h1 className="display-5 text-center">Регистрирај се</h1>
                <p className="lead text-center">Креирајте го вашиот акаунт</p>
                <form onSubmit={this.onFormSubmit} className="mb-5">

                    <div className="form-group">
                        <input type="text" className="form-control form-control-lg" placeholder="Име"
                               autoComplete="off"
                               name="firstName"
                               id="firstName"
                               required
                        />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control form-control-lg" placeholder="Презиме"
                               autoComplete="off"
                               name="lastName"
                               id="lastName"
                               required
                        />
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control form-control-lg" placeholder="Email адреса"
                               autoComplete="off"
                               name="email"
                               id="email"
                               required
                        />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control form-control-lg" placeholder="Телефонски број"
                               autoComplete="off"
                               name="phone"
                               id="phone"
                               required
                        />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control form-control-lg" placeholder="Лозинка"
                               autoComplete="off"
                               name="password"
                               id="password"
                               required
                        />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control form-control-lg" placeholder="Потврди лозинка"
                               autoComplete="off"
                               name="password2"
                               id="password2"
                               required
                        />
                    </div>

                    {this.state.validationMessage &&
                    <h5 className="text-danger text-center">{this.state.validationMessage}</h5>
                    }

                    <button type="submit" className="btn btn-success btn-block mt-4">Регистрирајте се</button>
                </form>
            </div>
        );
    }
}

export default RegisterUser;
