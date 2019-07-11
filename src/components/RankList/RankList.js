import React, {Component} from 'react';
import {getAllDonors} from "../../repository/Donor";
import {getJwt} from "../../helpers/jwt";

class RankList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            donors: [],

        }
    }

    componentDidMount() {
        this.loadAllDonors();
    }

    loadAllDonors = () => {
        getAllDonors(getJwt())
            .then(response => response.json())
            .then(data => {
                this.setState({
                    donors: data
                });
            })
    };

    showDonors = () => {
        return this.state.donors.map((donor) => {
            return (
                <tr key={donor.id}>
                    <td>
                        <img id="donor-list-image" src={donor.pictureUrl} alt=""/>
                    </td>
                    <td>
                        <span className="label label-default">{donor.firstName} {donor.lastName}</span>
                    </td>
                    <td>
                        <i className="fa fa-star p-2"></i>{donor.points}
                    </td>
                    <td>
                        {donor.points / 10}
                    </td>
                </tr>
            )
        });
    };

    render() {

        var donors = this.showDonors();

        return (
            <div className="container-fluid wrapper">
                <div className="container mb-5">
                    <h3 className="text-center mb-4">Ранг листа</h3>
                    <div className="table-users">
                        <div className="header">Корисници кои највеќе донирале</div>

                        <table cellSpacing="0">
                            <thead>
                            <tr>
                                <th>&nbsp;</th>
                                <th>Корисник</th>
                                <th>Поени</th>
                                <th>Вкупно донации</th>
                            </tr>
                            </thead>
                            <tbody>
                            {donors}
                            </tbody>
                        </table>
                    </div>
                    <hr/>
                </div>
            </div>
        )
    }

}

export default RankList;
