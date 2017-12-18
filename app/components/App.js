import React from 'react';
import {connect} from 'react-redux';

import {loadMeta} from '../actions/meta'
import SideNavigation from './common/SideNavigation';
import routes from '../routes';


@connect((store) => {
    return {
        modelMetaLoaded: store.meta.modelMetaLoaded,
        modelMetaList: store.meta.getAll()
    }
})
class App extends React.Component {

    constructor(props,context){
        super(props, context);
    }

    componentDidMount() {
        this.props.dispatch(loadMeta());
    }

    render() {
        if(!this.props.modelMetaLoaded) {
            return (
                <div>Loading ...</div>
            )
        }

        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark fixed-top">
                        <a className="navbar-brand" href="#">Ramailo</a>

                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                            </ul>
                        </div>
                    </nav>
                </header>
                <SideNavigation modelMetaList={this.props.modelMetaList}/>
                <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
                    {routes}
                </main>
            </div>
        )
    }
}

export default App;