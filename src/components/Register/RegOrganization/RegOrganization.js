import React, {Component} from 'react';
import {getAllOrganizationCategories} from "../../../repository/OrganizationCategory";
import {registerOrganization} from "../../../repository/Organization";

class regOrg extends Component {

    constructor(props) {
        super(props);

        this.state = {
            validationMessage: "",
            isFormValid: false,
            categories: []
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
            name: formSubmitEvent.target.name.value,
            phone: formSubmitEvent.target.phone.value,
            email: formSubmitEvent.target.email.value,
            password: formSubmitEvent.target.password.value,
            category: formSubmitEvent.target.category.value
        });
    };

    register = (organization) => {
        registerOrganization(organization)
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

    componentDidMount() {
        this.loadOrganizationCategories();
    }

    loadOrganizationCategories = () => {
        getAllOrganizationCategories()
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    categories: data
                })
            });
    };

    render() {

        var cat = this.state.categories.map((category) => {
            return (
                <option key={category.id} value={category.name}>{category.name}</option>
            );
        });

        return (
            <div className="col-md-10 m-auto mb-5">
                <h1 className="display-5 text-center">Регистрирај се</h1>
                <p className="lead text-center">Креирајте го вашиот акаунт</p>
                <form onSubmit={this.onFormSubmit} className="mb-5">
                    <div className="form-group">
                        <input type="text" className="form-control form-control-lg" placeholder="Име на Организацијата"
                               name="name" required/>
                    </div>
                    <div className="form-group">
                        <select type="text" className="form-control form-control-lg"
                                placeholder="Категорија на Организација"
                                name="category"
                                required>
                            <option value="">Одберете категорија</option>
                            {cat}
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control form-control-lg" placeholder="Телефонски број"
                               name="phone" required/>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control form-control-lg" placeholder="Email Адреса"
                               name="email" required/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control form-control-lg" placeholder="Лозинка"
                               name="password" required/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control form-control-lg" placeholder="Потврди лозинка"
                               name="password2" required/>
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

export default regOrg;
