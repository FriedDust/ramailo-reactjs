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
        //this.addModelData = this.addModelData.bind(this);
    }

    componentDidMount() {
        // let modelMeta = this.props.modelMeta;
        // if (modelMeta) {
        //     let modelType = modelMeta.type;
        //     let modelName = modelMeta.name;
        //     this.props.dispatch(loadData({modelType, modelName}));
        // }
    }

    // addModelData(modelDataItem) {
    //     const {fieldApi} = this.props;
    //     const {getValue, setValue} = fieldApi;
    //     let selection = getValue() || [];
    //     setValue([...selection, modelDataItem]);
    // }

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

    render() {

        let props = this.props;

        const {fieldApi} = props;
        const {getValue} = fieldApi;

        let selection = getValue() || [];
        let modelMeta = props.modelMeta;
        let parentModelType = props.parentModelType;
        let modelMetaTypeList = props.modelMetaTypeList;

        return (
            <div>
                <h2>{props.modelMeta.label}</h2>
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
                    </tbody>
                </table>
            </div>
        );
    }
}

export const ModelChildrenForm = FormField(_ModelChildrenForm);