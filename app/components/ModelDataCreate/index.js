import {connect} from 'react-redux';

import {ModelDataForm} from '../common/ModelDataForm';
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
                <ModelNav modelMeta={this.props.modelMeta} />

                <h3>Create {this.props.modelMeta.label}</h3>
                <ModelDataForm
                    disableForm={this.props.modelMeta.disableAddData}
                    modelType={this.props.modelMeta.type}
                    onSubmit={this.addModelData}/>
            </div>
        )
    }
}