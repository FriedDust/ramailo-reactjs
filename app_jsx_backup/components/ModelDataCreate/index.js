import {connect} from 'react-redux';

import {DataForm} from '../common/DataForm';
import {addData} from '../../actions/data';
import {ModelNav} from '../common/ModelNav';


@connect((store, props) => {
    let modelMetaNameTypeMap = store.meta.nameTypeMap;
    let modelName = props.match.params.modelName;
    let modelType = modelMetaNameTypeMap[modelName];

    let modelMeta = store.meta.types[modelType];

    return {
        modelMeta,
        modelMetaNameTypeMap
    }
})
export class ModelDataCreate extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.addModelData = this.addModelData.bind(this);
    }

    addModelData(modelDataItem) {
        let modelName = this.props.match.params.modelName;
        let modelType = this.props.modelMetaNameTypeMap[modelName];
        this.props.dispatch(addData({modelName, modelType, modelDataItem}, ()=> {
            this.props.history.push(`/${this.props.modelMeta.name}`);
        }));
    }

    render() {
        return (
            <div>
                <ModelNav
                    title={`Create ${this.props.modelMeta.label}`}
                    modelMeta={this.props.modelMeta} />
                <DataForm
                    disableForm={this.props.modelMeta.disableAddData}
                    formMeta={this.props.modelMeta}
                    onSubmit={this.addModelData}/>
            </div>
        )
    }
}