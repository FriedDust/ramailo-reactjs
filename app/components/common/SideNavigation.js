import React from 'react';
import { Link } from 'react-router-dom';

class SideNavigation extends React.Component {

    constructor(props,context){
        super(props, context);
    }

    componentDidMount() {
    }

    render() {

        return (
            <nav className="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
                <ul className="nav flex-column">
                    {
                        this.props.modelMetaList.map((modelMeta, index)=> {
                            return (
                                <li key={index}>
                                    <Link to={`/${modelMeta.name}`}>
                                        {modelMeta.label}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <hr/>
            </nav>
        )
    }
}

export default SideNavigation;