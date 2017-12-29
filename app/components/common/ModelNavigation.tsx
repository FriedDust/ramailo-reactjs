import * as React from 'react';
import {Link} from 'react-router-dom';

import * as MetaInterfaces from '../../interfaces/Meta';

export default (props: {
    title: string,
    meta: MetaInterfaces.MetaResourceProps
}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" role="navigation">

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <h3>{props.title}</h3>
                    </li>
                </ul>
                <div className="my-2 my-lg-0">
                    {/*<ActionsMenu modelMeta={this.props.modelMeta}*/}
                                 {/*modelDataItem={this.props.modelDataItem}/>*/}
                    <Link to={`/${props.meta.name}/create`} className="btn btn-secondary">
                        Create
                    </Link>
                </div>
            </div>

        </nav>
    );
};