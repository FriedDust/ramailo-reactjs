import {FormField} from 'react-form';
import {connect} from 'react-redux';

import {Dropdown} from '../Dropdown'
import {ModelDataForm} from '../ModelDataForm';
import {loadData, addData} from '../../../actions/data';


@connect((store, props) => {
    let modelType = props.modelType;
    let modelData = store.data[modelType];
    let modelDataList = modelData ? modelData.getAll() : [];
    let modelDataById = modelData ? modelData.byId : {};
    return {
        modelMeta: store.meta.types[modelType],
        modelDataById,
        modelDataList
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
        let modelName = this.props.modelMeta.name;
        let modelType = this.props.modelMeta.type;
        this.props.dispatch(addData({modelName, modelType, modelDataItem}));
    }

    render() {

        let props = this.props;

        const {fieldApi} = props;
        const {getValue, setValue} = fieldApi;

        let selection = getValue() || [];

        return (
            <div>
                <h2>{props.label}</h2>
                <ul>
                    {
                        selection.map((optionId) => {
                            let option = this.props.modelDataById[optionId] || {};
                            return (
                                <li key={optionId}>{option.name}</li>
                            )
                        })
                    }
                </ul>
                <Dropdown
                    modelDataList={this.props.modelDataList || []}
                    onSelect={(md) => {
                        let temp = Object.assign([], selection);
                        if(temp.indexOf(md.id) === -1) {
                            temp.push(md.id); //TODO: Make this dynamic
                        }
                        setValue(temp);
                    }}/>
                <ModelDataForm
                    disableForm={this.props.modelMeta.disableAddData}
                    modelType={props.modelMeta.type}
                    onSubmit={this.addModelData}/>
            </div>
        );
    }
}

export const ModelChildrenForm = FormField(_ModelChildrenForm);