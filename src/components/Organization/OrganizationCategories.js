import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import './Organizations.css';
import Organizations from "./Organizations";

class OrganizationCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategoryId: -1
        }
    }

    onCategoryChanged = (e) => {
        this.setState({
            selectedCategoryId: e.target.value
        });
    };

    render() {

        const categories = this.props.categories
            .map((category) => {
                return (
                    <li key={category.id} className="navli">
                        <input onChange={this.onCategoryChanged} type="radio" id={category.id}
                               name="userType" value={category.id}/>
                        <label className="categories p-1" htmlFor={category.name}>{category.name}</label>
                        <div></div>
                    </li>
                )
            });

        return (
            <div>
                <div className="container-fluid">
                    <div>
                        <div className="row">
                            <div className="col-md-3 bg-info rounded" id="categories">
                                <h1 className="mt-5 mb-4 text-center text-white">
                                    Категории
                                </h1>
                                <div className="left-panel">
                                    <div>
                                        <ul>
                                            <li key={999} className="navli">
                                                <input onChange={this.onCategoryChanged} type="radio" id={-1}
                                                       name="userType" value={-1}/>
                                                <label className="categories p-1" htmlFor="сите">Сите</label>
                                                <div></div>
                                            </li>
                                            {categories}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <Organizations selectedCategoryId={this.state.selectedCategoryId}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(OrganizationCategories);
