import {Link} from 'react-router-dom';

export class ModelNav extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <nav className="navbar navbar-default" role="navigation">
                <ul className="nav navbar-nav navbar-right">

                    <li>
                        <Link to={`${this.props.modelMeta.name}/create`}>
                            Create
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}