import {Link} from "react-router-dom";
import {toString} from "../../utils/meta";

export class ModelDataTable extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.deleteHandler = this.deleteHandler.bind(this);
    }

    getGridHeaders() {
        let columns = [];
        if (this.props.modelMeta.gridHeaders) {
            this.props.modelMeta.attributes.forEach((attr)=> {
                if(this.props.modelMeta.gridHeaders.indexOf(attr.name) > -1) {
                    columns.push(attr);
                }
            })
        } else {
            this.props.modelMeta.attributes.forEach((attr)=> {
                if(attr.name == this.props.modelMeta.stringify) {
                    columns.push(attr);
                }
            })
        }
        return columns;
    }

    deleteHandler(e) {
        if (confirm('Are you sure?')) {
            console.log("TODO");
        }
        return false;
    }

    render() {
        if (!this.props.modelDataList) {
            return (
                <div>Loading</div>
            )
        }
        return (
            <div>
                <h3>{this.props.modelMeta.label}</h3>
                <table className="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                        <tr>
                            {this.getGridHeaders().map((col, index) => {
                                return (<th key={index}>{col.label}</th>)
                            }
                            )}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.modelDataList.map((row) => {
                        return (<tr key={row.id}>
                            {this.getGridHeaders().map((col, index) => {

                                return (<td key={index}>{toString(col, row[col.name])}</td>)
                            })}
                            <td>
                                <Link to={`/${this.props.modelMeta.name}/${row.id}`}>Edit</Link>
                                |
                                <a href="#" onClick={this.deleteHandler}>Delete</a>
                            </td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}
