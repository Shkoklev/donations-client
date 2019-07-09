import React, {Component} from 'react';
import {getJwt} from "../../helpers/jwt";
import {getLoggedDonor} from "../../repository/Donor";

class DonorDonations extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedDonor: {}
        }
    }

    componentDidMount() {
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/login/donor');
        }

        getLoggedDonor(jwt)
            .then(res => res.data)
            .then(body => {
                this.setState({
                    loggedDonor: body
                })
            })
            .catch(err => {
                this.props.history.push('/login/donor');
            });
    }

    render() {


        return (
            <div className="container-fluid wrapper">
                <div className="container">
                    asdfsadf
                </div>
            </div>
        )
    }
}

export default DonorDonations;
