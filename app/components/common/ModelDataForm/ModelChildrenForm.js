import {FormField} from 'react-form';
import {connect} from 'react-redux';

import {ModelDataItem} from '../ModelDataItem'
import {ModelDataForm} from '../ModelDataForm';
import {loadData, addData} from '../../../actions/data';
import {getMetaFromType} from "../../../utils/meta";

@connect((store, props) => {
    let modelType = props.modelType;
    let modelMetaTypeList = Object.keys(store.meta.types);

    return {
        modelMeta: store.meta.types[modelType],
        modelMetaTypeList
    }
})
class _ModelChildrenForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.addModelData = this.addModelData.bind(this);
        this.getColumns = this.getColumns.bind(this);
    }

    componentDidMount() {
        // let modelMeta = this.props.modelMeta;
        // if (modelMeta) {
        //     let modelType = modelMeta.type;
        //     let modelName = modelMeta.name;
        //     this.props.dispatch(loadData({modelType, modelName}));
        // }
    }

    addModelData(modelDataItem) {
        const {fieldApi} = this.props;
        const {getValue, setValue} = fieldApi;
        let selection = getValue() || [];
        setValue([...selection, modelDataItem]);
    }

    getGridHeaders() {
        let columns = [];
        this.props.modelMeta.attributes.map((col) => {
            if (col.isGeneratedValue){
            } else if (col.type == this.props.parentModelMeta.type){
            } else{
                columns.push(col);
            }
        });

        return columns;
    }

    addRow(rowData) {
        return (
            <tr></tr>
        );
    }

    getColumns() {
        let columns = [];
        this.props.modelMeta.attributes.forEach((attr) => {
            if (this.props.parentModelType === attr.type) {
                return;
            }
            columns.push(attr);
        });
        return columns;
    }

    render() {

        let props = this.props;

        const {fieldApi} = props;
        const {getValue} = fieldApi;

        let selection = getValue() || [];
        let modelMeta = props.modelMeta;
        let parentModelType = props.parentModelType;
        let modelMetaTypeList = props.modelMetaTypeList;
        let columns = this.getColumns();

        return (
            <div>
                <label>{props.modelMeta.label} <button className="btn btn-secondary btn-success">Add</button></label>
                <table className="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                    <tr>
                        {
                            columns.map((attr, index) => {
                                return <td key={index}>{attr.label}</td>
                            })
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        selection.map((obj, index) => {
                            return (
                                <ModelDataItem key={index}
                                               modelMeta={modelMeta} columns={columns}
                                               modelDataItem={obj}
                                               parentModelType={parentModelType}
                                               modelMetaTypeList={modelMetaTypeList}
                                               index={index}/>
                            )
                        })
                    }
                    </tbody>
                </table>
                <div className="modal show">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" aria-label="Close">
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <ModelDataForm
                                    isChildForm={true}
                                    parentModelType={props.parentModelType}
                                    disableForm={this.props.modelMeta.disableAddData}
                                    modelType={props.modelMeta.type}
                                    onSubmit={this.addModelData}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export const ModelChildrenForm = FormField(_ModelChildrenForm);