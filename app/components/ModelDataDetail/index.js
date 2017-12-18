import {connect} from 'react-redux';

import {loadDataItem} from '../../actions/data';
import {editData} from '../../actions/data';

import {ModelDataForm} from '../common/ModelDataForm';
import {ModelNav} from '../common/ModelNav';

@connect((store, props) => {
    let modelMetaNameTypeMap = store.meta.nameTypeMap;
    let modelName = props.match.params.modelName;
    let modelType = modelMetaNameTypeMap[modelName];
    let modelDataId = props.match.params.modelDataId;

    let modelMeta = store.meta.types[modelType];
    let modelData = store.data[modelType];
    let modelDataItem = modelData ? modelData.byId[modelDataId] : null;

    let modelMetaTypeList = Object.keys(store.meta.types);

    let getModelMeta = store.meta.getModelMeta();

    return {
        modelMeta,
        modelMetaNameTypeMap,
        modelDataItem,
        modelMetaTypeList,
        getModelMeta
    }
})
export class ModelDataDetail extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.editModelData = this.editModelData.bind(this);
    }

    componentDidMount() {
        let modelName = this.props.match.params.modelName;
        let modelType = this.props.modelMetaNameTypeMap[modelName];
        let modelDataId = this.props.match.params.modelDataId;
        if (modelType) {
            this.props.dispatch(loadDataItem({modelType, modelName, modelDataId}));
        }
    }

    componentWillReceiveProps(nextProps) {
        let modelName = this.props.match.params.modelName;
        let modelType = this.props.modelMetaNameTypeMap[modelName];
        let modelDataId = this.props.match.params.modelDataId;

        // TODO: Need to find a better way to do this
        if ((modelName !== nextProps.match.params.modelName) ||
            (modelType !== nextProps.modelMetaNameTypeMap[modelName])) {

            modelName = nextProps.match.params.modelName;
            modelType = nextProps.modelMetaNameTypeMap[modelName];
            this.props.dispatch(loadDataItem({modelType, modelName, modelDataId}));
        }
    }

    editModelData(modelDataItem) {
        let modelName = this.props.match.params.modelName;
        let modelType = this.props.modelMetaNameTypeMap[modelName];
        this.props.dispatch(editData({modelName, modelType, modelDataItem}, ()=> {
            this.props.history.push(`/${this.props.modelMeta.name}`);
        }));
    }

    render() {

        let props = this.props;
        let modelDataItem = props.modelDataItem;

        if (!modelDataItem) {
            return <div>Loading data..</div>
        }
        return (
            <div>
                <ModelNav
                    title={`Edit ${this.props.modelMeta.label}`}
                    modelMeta={this.props.modelMeta}/>

                <ModelDataForm
                    selection={props.modelDataItem}
                    disableForm={this.props.modelMeta.disableAddData}
                    modelType={this.props.modelMeta.type}
                    onSubmit={this.editModelData}/>
            </div>
        )
    }
}