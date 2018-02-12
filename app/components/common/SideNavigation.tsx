import * as React from 'react';
import {Link} from 'react-router-dom';

import * as MetaInterfaces from '../../interfaces/meta';

export default (props: {
    metaList: Array<MetaInterfaces.MetaResourceProps>
}) => {
    return (
        <nav className="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
            <ul className="nav nav-pills flex-column">
                {
                    props.metaList.map((meta: MetaInterfaces.MetaResourceProps, index: number) => {
                        return (
                            <li className="nav-item" key={index}>
                                <Link to={`/${meta.name}`}>
                                    {meta.label}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
            <hr/>
        </nav>
    );
};