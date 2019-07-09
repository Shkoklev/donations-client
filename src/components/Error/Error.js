import React, {Component} from 'react';
import './Error.css'

class Error extends Component {

    render() {

        const message = this.getMessage();

        return (
            <div className="wrapper pos">
                <div className="centar">
                    <h1 className="text-center display-3 text-dark">404</h1>
                    <h1 className="text-center">{message}</h1>
                </div>
            </div>
        );
    }

    getMessage() {
        if (this.props.pathDoesNotExist) {
            return this.props.pathDoesNotExist;
        }
        if (this.props.studentNotFound) {
            return this.props.studentNotFound;
        }
        if (this.props.studyProgramNotFound) {
            return this.props.studyProgramNotFound;
        }
    }
};

export default Error;
