import {Link} from "react-router-dom";
import {toString} from "../../utils/meta";
import {connect} from 'react-redux';


@connect((store, props) => {
    let modelMetas = store.meta.types;
    return {
        modelMetas
    }
})
export class ModelDataTable extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.deleteHandler = this.deleteHandler.bind(this);
    }

    getGridHeaders() {
        let columns = [];
        if (this.props.modelMeta.gridHeaders && this.props.modelMeta.gridHeaders.length > 0) {
            this.props.modelMeta.attributes.forEach((attr) => {
                if (this.props.modelMeta.gridHeaders.indexOf(attr.name) > -1) {
                    columns.push(attr);
                }
            })
        } else {
            this.props.modelMeta.attributes.forEach((attr) => {
                if (attr.name == this.props.modelMeta.stringify) {
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
        let gridHeaders = this.getGridHeaders();
        return (
            <div>
                <table className="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                    <tr>
                        {gridHeaders.map((col, index) => {
                                return (<th key={index}>{col.label}</th>)
                            }
                        )}
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.modelDataList.map((row) => {
                            return (
                                <tr key={row.id}>
                                    {
                                        this.getGridHeaders().map((col, index) => {
                                            let modelMeta = col;
                                            let modelMetas = this.props.modelMetas;
                                            return (<td key={index}>{toString({modelMeta, row, modelMetas})}</td>)
                                        })
                                    }
                                    <td>
                                        <Link to={`/${this.props.modelMeta.name}/${row.id}`}>Edit</Link>
                                        <a href="#" onClick={this.deleteHandler}>Delete</a>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {
                        this.props.modelDataList.length === 0 ?
                            <tr>
                                <td colSpan={gridHeaders.length+1}>No records found</td>
                            </tr> : null
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
