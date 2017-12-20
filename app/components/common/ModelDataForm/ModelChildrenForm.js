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
        this.submitChildModelData = this.submitChildModelData.bind(this);
        this.getColumns = this.getColumns.bind(this);
        this.toggleChildModelForm = this.toggleChildModelForm.bind(this);
        this.toggleEditForm = this.toggleEditForm.bind(this);

        this.state = {
            childModelFormActive: false,
            childModelFormObj: null,
            childModelArrayIndex: null
        };
    }

    componentDidMount() {
        // let modelMeta = this.props.modelMeta;
        // if (modelMeta) {
        //     let modelType = modelMeta.type;
        //     let modelName = modelMeta.name;
        //     this.props.dispatch(loadData({modelType, modelName}));
        // }
    }

    submitChildModelData(modelDataItem, isEdit) {
        const {fieldApi} = this.props;
        const {getValue, setValue} = fieldApi;
        let selection = getValue() || [];
        if(!isEdit) {
            selection = [...selection, modelDataItem];
        } else {
            selection[this.state.childModelArrayIndex] = modelDataItem;
        }
        setValue(selection);
        this.toggleChildModelForm(false)();
    }

    getGridHeaders() {
        let columns = [];
        this.props.modelMeta.attributes.map((col) => {
            if (col.isGeneratedValue) {
            } else if (col.type == this.props.parentModelMeta.type) {
            } else {
                columns.push(col);
            }
        });

        return columns;
    }

    toggleChildModelForm(status) {
        return () => {
            this.setState({
                childModelFormActive: status,
                childModelFormObj: null,
                childModelArrayIndex: null
            });
        }
    }

    toggleEditForm(status, {obj, index}) {
        return () => {
            this.setState({
                childModelFormActive: status,
                childModelFormObj: obj,
                childModelArrayIndex: index
            });
        }
    }

    getColumns() {
        let columns = [];
        this.props.modelMeta.attributes.forEach((attr) => {
            if (this.props.parentModelType === attr.type ||
                attr.isPrimaryKey) {
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
                <label>{props.modelMeta.label}</label>
                <button
                    onClick={this.toggleChildModelForm(true)}
                    className="btn btn-secondary btn-success btn-sm">Add
                </button>
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
                                <ModelDataItem key={index} onClick={this.toggleEditForm(true, {obj, index})}
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

                {
                    (this.state.childModelFormActive) ?
                        <div className="modal show"
                             style={{display: 'block'}}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">{props.modelMeta.label}</h5>
                                        <button type="button"
                                                onClick={this.toggleChildModelForm(false)}
                                                className="close" aria-label="Close">
                                            <span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <ModelDataForm
                                            isChildForm={true}
                                            isEdit={!!this.state.childModelFormObj}
                                            selection={this.state.childModelFormObj}
                                            parentModelType={props.parentModelType}
                                            disableForm={this.props.modelMeta.disableAddData}
                                            modelType={props.modelMeta.type}
                                            onSubmit={this.submitChildModelData}/>
                                    </div>
                                </div>
                            </div>
                        </div> : null
                }


            </div>
        );
    }
}

export const ModelChildrenForm = FormField(_ModelChildrenForm);