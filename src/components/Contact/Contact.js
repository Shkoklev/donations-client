import React, {Component} from 'react';

class contact extends Component {

    render() {

        return (
            <div className="container-fluid wrapper">
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-md-5 m-auto">
                            <h1 className="display-5 text-center mb-4">Контакт</h1>
                            <form className="mb-5" onSubmit={this.onFormSubmit}>
                                <div className="form-group">
                                    <input type="text"
                                           className="form-control form-control-lg" placeholder="Вашето име"
                                           name="name"
                                           id="name" required/>
                                </div>
                                <div className="form-group">
                                    <input type="email"
                                           className="form-control form-control-lg" placeholder="Вашиот email"
                                           name="email"
                                           id="password" required/>
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                           className="form-control form-control-lg" placeholder="Предмет"
                                           name="predmet"
                                           id="predmet"/>
                                </div>
                                <div className="form-group">
                                <textarea
                                    className="form-control form-control-lg" placeholder="Вашата порака"
                                    name="poraka"
                                    id="poraka"
                                    rows="6"
                                    required/>
                                </div>
                                <input value="Испрати" type="submit" className="btn btn-primary btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default contact;

