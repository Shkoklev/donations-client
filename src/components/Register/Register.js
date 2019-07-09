import React, {Component} from 'react';

import RegUser from './RegUser/RegUser';
import RegOrgPr from './RegOrganization/RegOrganization';
import './Register.css';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userType: "",
        };
    }

    onTypeChanged = (e) => {
        this.setState({
            userType: e.currentTarget.value
        });
    };

    render() {


        var show = <div></div>;

        if (this.state.userType === "fiz") {
            show = <RegUser/>;
        } else if (this.state.userType === "org") {
            show = <RegOrgPr/>
        }

        return (
            <div className="wrapper mb-5">
                <div className="container radios">
                    <div className="row">
                        <div className="col-md-5">
                            <h4>Одберете дали сакате да се регистрирате како физичко лице или како дел од некоја организација</h4>
                            <ul className="register-ul">
                                <li className="register-li">
                                    <input onChange={this.onTypeChanged.bind(this)} type="radio" id="fiz" name="userType" value="fiz"/>
                                    <label htmlFor="fiz">Физичко лице</label>
                                    <div className="check"></div>
                                </li>
                                <li className="register-li">
                                    <input onChange={this.onTypeChanged.bind(this)} type="radio" id="org" name="userType" value="org"/>
                                    <label htmlFor="org">Организација</label>
                                    <div className="check">
                                        <div className="inside"></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-7">
                            {show}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Register;
