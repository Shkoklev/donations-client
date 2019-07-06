import React, {Component} from 'react';
import OrganizationCategories from "./OrganizationCategories";
import {getAllOrganizationCategories} from "../../repository/OrganizationCategory";


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
                    <OrganizationCategories categories={this.state.categories}/>
                </div>
            </div>
        );
    }
}

export default OrganizationsPage;
