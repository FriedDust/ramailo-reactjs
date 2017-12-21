import {Link} from 'react-router-dom';
import {ActionsMenu} from './ActionsMenu';

export class ModelNav extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light" role="navigation">

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <h3>{this.props.title}</h3>
                        </li>
                    </ul>
                    <div className="my-2 my-lg-0">
                        <ActionsMenu modelMeta={this.props.modelMeta}
                                     modelDataItem={this.props.modelDataItem}/>
                        <Link to={`/${this.props.modelMeta.name}/create`} className="btn btn-secondary">
                            Create
                        </Link>
                    </div>
                </div>

            </nav>
        );
    }
}