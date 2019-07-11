import React, {Component} from 'react';
import {Link} from "react-router-dom";
import pic from "../../charity1.jpg";

class Landing extends Component {
    render() {
        return (
            <div className="w-100 dark-overlay landing-inner text-dark">
                <div className="w-100" style={{position: "relative"}}>
                    <div id="tag" className="mt-5" style={{position: "absolute"}}>
                        <div className="row w-100 mt-5">
                            <div className="col-6">
                            </div>
                            <div className="col-6 text-white mt-5 w-75">
                                <h1>Добредојдовте на нашата страница!</h1>
                                <p>Оваа страница е направена од двајца студенти на ФИНКИ, со цел да им овозможи на сите оние кои сакаат
                                    да бидат
                                    хумани, да донираат на оние кои што им е потребно.
                                    Станува збор за организации, државни институции, болници, кои што имаат потреба од
                                    најразлични
                                    работи...
                                    Што треба да исполнувате за да бидете дел од doniraj.mk ?
                                </p>
                                <div className="text-center m-3">
                                    <Link className="btn btn-success mr-2" to="/login/donor">Најавете се</Link>
                                    <Link className="btn btn-success" to="/register">Регистрирајте се</Link>
                                </div>
                            </div>
                        </div>

                    </div>
                    <img src={pic} alt="" className="w-100" style={{maxHeight: "600px"}}/>

                </div>
            </div>


        );
    }
}

export default Landing;


