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
            <div>
                <ul>
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
            </div>
        )
    }
}

export default SideNavigation;