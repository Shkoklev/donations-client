import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Landing from "./components/Layout/Landing";
import Register from "./components/Register/Register";
import AboutUs from "./components/AboutUs/AboutUs";
import Footer from "./components/Layout/Footer";
import Contact from "./components/Contact/Contact";
import UserProfile from "./components/Profile/UserProfile";
import OrganizationsPage from "./components/Organization/OrganizationsPage";
import DemandsByOrganization from "./components/Demands/DemandsByOrganization";
import Error from "./components/Error/Error";
import LoginDonor from "./components/Login/LoginDonor";
import LoginOrganization from "./components/Login/LoginOrganization";


class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar/>
                    <Switch>
                        <Redirect from="/" to="/home" exact/>
                        <Route exact path="/home" component={Landing}/>
                        <Route exact path="/login/donor" component={LoginDonor}/>
                        <Route exact path="/login/organization" component={LoginOrganization}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/about-us" component={AboutUs}/>
                        <Route exact path="/organizations" component={OrganizationsPage}/>
                        <Route exact path="/contact" component={Contact}/>
                        <Route exact path="/donor-profile" component={UserProfile}/>
                        <Route exact path="/organizations/demands-by-organization" component={DemandsByOrganization}/>
                        <Route render={(props) => <Error {...props} pathDoesNotExist="Страницата не е пронајдена."/>}/>
                    </Switch>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
