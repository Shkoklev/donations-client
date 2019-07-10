import React, {Component} from 'react';
import OrganizationCategories from "./OrganizationCategories";
import {getAllOrganizationCategories} from "../../repository/OrganizationCategory";
import {withRouter} from "react-router-dom";


class OrganizationsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

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
        return (
            <div className="container-fluid wrapper">
                <div className="container">
                    <h2 className="text-center">Организации</h2>
                    <OrganizationCategories categories={this.state.categories}/>
                </div>
            </div>
        );
    }
}

export default withRouter(OrganizationsPage);
