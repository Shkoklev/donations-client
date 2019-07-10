import React, {Component} from 'react';
import {
    getAllOrganizations,
    getOrganizationsByCategoryId,
    getOrganizationsBySearchQuery
} from "../../repository/Organization";
import {Link} from "react-router-dom";

class Organizations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            organizations: [],
            currentPage: 1,
            itemsPerPage: 8,
            totalOrganizations: 0
        }
    }

    componentDidMount() {
        this.loadAllOrganizations();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.selectedCategoryId !== this.props.selectedCategoryId) {
            this.setState({
                currentPage: 1
            }, () => {
                if (this.props.selectedCategoryId == -1) {
                    this.loadAllOrganizations();
                } else {
                    this.loadOrganizationsByCategory(this.props.selectedCategoryId);
                }
            });
        }
    }

    loadAllOrganizations = () => {
        getAllOrganizations(this.state.currentPage - 1)
            .then(res => res.data)
            .then((data) => {
                this.setState({
                    organizations: data.content,
                    totalOrganizations: data.totalElements
                });
            })
    };

    loadOrganizationsByCategory = (categoryId) => {
        getOrganizationsByCategoryId(categoryId, this.state.currentPage - 1)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    organizations: data.content,
                    totalOrganizations: data.totalElements
                })
            });
    };

    handleChange = (e) => {
        if (e.target.value === "") {
            this.loadAllOrganizations();
        }
        getOrganizationsBySearchQuery(e.target.value)
            .then(res => res.data)
            .then(data => {
                this.setState({
                    organizations: data,
                    totalOrganizations: 0
                });
            });
    };

    showOrganizations = () => {
        var organizations = this.state.organizations.map((org) => {
            return (
                <tr className="table-rows" key={org.id}>
                    <td>{org.name}</td>
                    <td>{org.phone}</td>
                    <td>
                        <Link className="btn btn-info" to={`/organizations/${org.id}/demands`}>Види
                            потреби
                        </Link>
                    </td>
                </tr>
            );
        });
        return organizations;
    };

    handleClick = (event) => {
        if (event.target.id !== this.state.currentPage) {
            if (this.props.selectedCategoryId == -1) {
                this.setState({
                        currentPage: Number(event.target.id)
                    }, () => {
                        this.loadAllOrganizations();
                    }
                );
            } else {
                this.setState({
                        currentPage: Number(event.target.id)
                    }, () => {
                        this.loadOrganizationsByCategory(this.props.selectedCategoryId);
                    }
                );
            }
        }
    };

    render() {

        var organizations = this.showOrganizations();

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.totalOrganizations / this.state.itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li className="page-item active"
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </li>
            );
        });

        return (
            <div>
                <form className="form-inline mt-5 mb-4 justify-content-center">
                    <input value={this.state.searchString}
                           onChange={this.handleChange}
                           className="form-control mr-sm-2"
                           type="search"
                           placeholder="Внесете име на организација"
                           aria-label="Search"/>
                    <button className="btn btn-success m-1" type="submit">Пребарај</button>
                </form>
                <div className="mb-5">
                    <table className="table table-bordered" id="tabla">
                        <thead className="thead-light">
                        <tr>
                            <th>Име на институција</th>
                            <th>Контакт</th>
                            <th>Потреби</th>
                        </tr>
                        </thead>
                        <tbody>
                        {organizations}
                        </tbody>
                    </table>
                    <ul id="page-numbers" className="pagination justify-content-center">
                        {renderPageNumbers}
                    </ul>
                </div>
            </div>
        )
    }

}

export default Organizations;
