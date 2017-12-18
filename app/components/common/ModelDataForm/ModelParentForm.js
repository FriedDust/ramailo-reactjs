import {FormField} from 'react-form';

import {connect} from 'react-redux';

import {loadData, addData} from '../../../actions/data';
import {ModelDataForm} from './index';
import {Dropdown} from '../Dropdown';

@connect((store, props) => {
    let modelType = props.modelType;
    let modelData = store.data[modelType];
    return {
        modelMeta: store.meta.types[modelType],
        modelData: modelData,
    }
})
class _ModelParentForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.addModelData = this.addModelData.bind(this);
    }

    componentDidMount() {
        let modelMeta = this.props.modelMeta;

        if (modelMeta) {
            let modelType = modelMeta.type;
            let modelName = modelMeta.name;
            this.props.dispatch(loadData({modelType, modelName}));
        }
    }

    addModelData(modelDataItem) {
        let modelName = this.props.modelMeta.name;
        let modelType = this.props.modelMeta.type;
        this.props.dispatch(addData({modelName, modelType, modelDataItem}));
    }

    render() {

        let props = this.props;

        const {fieldApi} = props;
        const {getValue, setValue} = fieldApi;

        let modelData = props.modelData;

        if(!props.modelMeta || !modelData) {
            return null;
        }

        let modelDataList = modelData ? modelData.getAll() : [];

        let currentValue = getValue() || {};
        let modelMetaSelector = props.modelMeta.stringify;

        return (
            <div>
                <span>
                    {props.modelMeta.label} : {currentValue[modelMetaSelector] || "Not Assigned"}
                </span>
                <Dropdown
                    selector={modelMetaSelector}
                    modelDataList={modelDataList || []}
                    onSelect={(md) => {
                        setValue(md);
                    }}/>
                <ModelDataForm
                    disableForm={props.modelMeta.disableAddData}
                    modelType={props.modelMeta.type}
                    onSubmit={this.addModelData}/>
            </div>
        );
    }
}

export const ModelParentForm = FormField(_ModelParentForm);