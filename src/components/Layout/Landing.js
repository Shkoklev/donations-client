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
                                <h1>Добредојдовте на донирај.мк!</h1>
                                <p>doniraj.mk е направена од двајца студенти на ФИНКИ, со цел сите оние кои што сакаат
                                    да бидат
                                    хумани и да донираат на оние кои што им е потребно.
                                    Станува збор за организации, државни институции... кои што имаат потреба од
                                    најразлични
                                    работи...
                                    бла бла...

                                    Што треба да исполнувате за да бидете дел од doniraj.mk ?
                                    -нешто
                                    -нешто друго</p>
                                <div className="text-center m-3">
                                    <Link className="btn btn-success mr-2" to="/login">Логирај се</Link>
                                    <Link className="btn btn-success" to="/register">Регистрирај се</Link>
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


