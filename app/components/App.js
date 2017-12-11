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
                <SideNavigation modelMetaList={this.props.modelMetaList}/>
                {routes}
            </div>
        )
    }
}

export default App;