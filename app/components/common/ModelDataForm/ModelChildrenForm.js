import {FormField} from 'react-form';
import {connect} from 'react-redux';

import {ModelDataItem} from '../ModelDataItem'
import {ModelDataForm} from '../ModelDataForm';
import {loadData, addData} from '../../../actions/data';


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
        const {fieldApi} = this.props;
        const {getValue, setValue} = fieldApi;
        let selection = getValue() || [];
        setValue([...selection, modelDataItem]);
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
                <ul>
                    {
                        selection.map((obj, index) => {
                            return (
                                <ModelDataItem modelMeta={modelMeta}
                                               modelDataItem={obj}
                                               parentModelType={parentModelType}
                                               modelMetaTypeList={modelMetaTypeList}
                                               index={index}/>
                            )
                        })
                    }
                </ul>
                <ModelDataForm
                    isChildForm={true}
                    parentModelType={props.parentModelType}
                    disableForm={this.props.modelMeta.disableAddData}
                    modelType={props.modelMeta.type}
                    onSubmit={this.addModelData}/>
            </div>
        );
    }
}

export const ModelChildrenForm = FormField(_ModelChildrenForm);