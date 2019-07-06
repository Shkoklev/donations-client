import React, {Component} from 'react';
import {
    getAllOrganizations,
    getOrganizationsByCategoryId,
    getOrganizationsBySearchQuery
} from "../../repository/Organization";
import DemandsByOrganization from "../Demands/DemandsByOrganization";
import {withRouter} from "react-router-dom";
import './Organizations.css';

class OrganizationCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            selectedCategoryId: "",
            organizations: [],
            orgsByCateg: "",
            allOrganizations: [],
            showAll: true,
            showContent: true,
            organizationId: "",
            searchString: ''
        }
    }

    componentDidMount() {
        if (this.state.selected === false) {
            this.loadAllOrganizations();
        }
    }

    onCategoryChanged = (e) => {
        this.setState({
            selected: true,
            selectedCategoryId: e.target.value
        }, () => {
            this.loadOrganizationsByCategory(this.state.selectedCategoryId);
        });
    };

    loadOrganizationsByCategory = (categoryId) => {
        getOrganizationsByCategoryId(categoryId)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    organizations: data
                }, () => {
                    this.showOrganizationsByCategory(this.state.organizations.content);
                })
            });
    };

    showOrganizationsByCategory(organizationsContent) {
        var orgsByCateg1 = organizationsContent.map((org) => {
            return (
                <tr key={org.id}>
                    <td>{org.name}</td>
                    <td>{org.phone}</td>
                    <td>
                        <button className="btn btn-info" onClick={this.onVidiPotrebiClick.bind(this, org.id)}>Види
                            потреби
                        </button>
                    </td>
                </tr>
            );
        });
        this.setState({orgsByCateg: orgsByCateg1});
    }

    loadAllOrganizations = () => {
        getAllOrganizations()
            .then(res => res.data)
            .then((data) => {
                this.setState({
                    allOrganizations: data,
                    showAll: true
                });
            })
    };

    handleChange = (e) => {
        getOrganizationsBySearchQuery(e.target.value)
            .then(res => res.data)
            .then(data => {
                this.setState({
                    showAll: false,
                    organizations: data.content
                });
            });
    };

    onVidiPotrebiClick = (organizationId) => {
        var org = organizationId;
        this.setState({showContent: false, organizationId: organizationId});
    };

    render() {

        const categories = this.props.categories
            .map((category) => {
                return (
                    <li key={category.id}>
                        <input onChange={this.onCategoryChanged} type="radio" id={category.id}
                               name="userType" value={category.id}/>
                        <label htmlFor={category.name}>{category.name}</label>
                        <div className="check"></div>
                    </li>
                )
            });

        console.log("bomba");

        var all = this.state.organizations.map((org) => {
            return (
                <tr key={org.id}>
                    <td>{org.name}</td>
                    <td>{org.phone}</td>
                    <td>
                        <button className="btn btn-info" onClick={this.onVidiPotrebiClick.bind(this, org.id)}>Види
                            потреби
                        </button>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <div className="container-fluid">
                    {this.state.showContent === true ?
                        (<div>
                                <div className="row">
                                    <div className="col-md-3 bg-info rounded" id="categories">
                                        <h1 className="mt-5 mb-4 text-center text-white">
                                            Категории
                                        </h1>
                                        <div className="left-panel">
                                            <div className="container radios">
                                                <ul>{categories}</ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <form className="form-inline mt-5 mb-4 justify-content-center">
                                            <input value={this.state.searchString}
                                                   onChange={this.handleChange}
                                                   className="form-control mr-sm-2"
                                                   type="search"
                                                   placeholder="Внесете име на организација"
                                                   aria-label="Search"/>
                                            <button className="btn btn-success m-1" type="submit">Пребарај</button>
                                        </form>
                                        <div className="dark-overlay landing-inner text-dark w-100">
                                            <table className="table table-bordered">
                                                <thead className="thead-light">
                                                <tr>
                                                    <th>Име на институција</th>
                                                    <th>Контакт</th>
                                                    <th>Потреби</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.selected === false ? all : this.state.orgsByCateg}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        <DemandsByOrganization organizationId={this.state.organizationId}/>
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(OrganizationCategories);
